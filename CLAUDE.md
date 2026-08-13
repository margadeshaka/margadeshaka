# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev                # Dev server (http://localhost:3000)
npm run build              # Production build (static export to /out)
npm run preview            # Build + serve /out on :3000 (npx serve)

# Deploy (Firebase Hosting — normally CI does this on push)
npm run deploy             # Build + deploy to production target
npm run deploy:staging     # Build + deploy to staging target
npm run verify:hosting     # Check firebase.json targets haven't drifted apart

# Code quality
npm run lint               # ESLint with auto-fix
npm run lint:check         # ESLint without auto-fix (CI-safe)
npm run typecheck          # TypeScript type checking without emit

# Testing (Playwright E2E — webServer builds the export and serves /out on :3000)
npm test                   # All tests across all five browser projects
npx playwright test tests/smoke.spec.ts              # Single spec file
npx playwright test --project=chromium               # One browser only
npx playwright test tests/smoke.spec.ts --project=chromium -g "should load homepage"  # By title
npm run test:ui            # Playwright interactive UI
npm run test:accessibility # axe-core suite only
npm run test:ci            # GitHub Actions reporter
npm run test:report        # Open last HTML report

npm run clean              # Remove .next, out, node_modules/.cache
```

- **Node.js ≥ 20** required.
- `npm run start`, `npm run export`, and `npm run preview`'s cousin `next start` do NOT work here: `output: 'export'` makes `next start` hard-error. `preview` is already wired to `npx serve out`.
- `npm run build:analyze` is non-functional: it sets `ANALYZE=true` but nothing reads it and no analyzer package is installed — it's a plain build.
- `npm run test:visual` has **no committed snapshot baselines** — its first run fails everywhere and writes new baselines; review them before trusting.
- Playwright's `reuseExistingServer: !CI` means **any** server already on :3000 is reused — if `npm run dev` is running, tests silently audit the dev server instead of the production export. Kill anything on :3000 first. (`npx serve@latest` also needs npm-registry access.)

## What This Repo Is

The **Margadeshaka corporate website** (`margadeshaka.com`) — a statically exported Next.js marketing site for Margadeshaka AI Private Limited, promoting **Sakha** (AI companion for emotional clarity — repositioned from astrology to wellness) and **Dronacharya** (AI tutoring).

The current site was rebuilt from a claude.ai/design handoff (`Margadeshaka.html` bundle) — code comments cite it as "the handoff" with references like `home.jsx:6`. The repo began as "ChakraVision," a scroll-driven 3D chakra experience; that subsystem survives in the tree but is dormant (see "Legacy / Dormant Code"). `README.md` is **current and accurate** — it documents the same history. Stale docs to ignore: `docs/deployment.md` (Vercel/Azure era), `README-phase5.md`, `standard.md`, `TASKS.md`, `docs/tasks.md`.

## Core Technology Stack

- **Next.js 15** App Router + **React 19**, TypeScript strict, path alias `@/*`
- **`output: 'export'`** — pure static HTML to `/out`. No SSR, no API routes. Dynamic routes need `generateStaticParams`; `app/sitemap.ts` is `force-static`; images `unoptimized`.
- **`trailingSlash: true` + `skipTrailingSlashRedirect: true`** — pages serve canonically at `/blog/` etc. with no reconciling redirect. Links, tests, and submitted URL lists must carry the slash (known gap: `app/sitemap.ts` and `scripts/ping-indexnow.sh` currently emit non-slash URLs).
- **Styling**: Tailwind + a large layered design system in `app/globals.css` (see Styling)
- **Type stack**: Newsreader (display), Geist (body/UI), Geist Mono (registration numbers), Noto Serif Devanagari (Sanskrit) — self-hosted via `next/font`
- **Animation**: CSS-driven (scroll reveals via `IntersectionObserver`, `prefers-reduced-motion` respected in live components). **GSAP, Three.js, and react-swipeable are installed but used ONLY by dormant chakra components** — do not add them to live code without discussion.
- **Analytics**: Google Analytics via `@next/third-parties`, mounted only when `NEXT_PUBLIC_GA_ID` is set (unset on staging). Nothing else — Vercel Analytics and Application Insights are gone.
- **Playwright** E2E across Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari

## Architecture

### App shell lives in the root layout

`app/layout.tsx` renders the shared shell for every route: fonts, SEO metadata (wellness-positioned, en-IN), `CosmicLayer` + `CosmicEffects` (background), `ScrollReveal` (site-wide scroll animations), `Navbar` (with mobile menu + `ThemeToggle`), `SiteFooter`, `SakhaStoreModal` (download dialog), `ScrollToTop`, `PerformanceMonitor` (dev-only), and gated `GoogleAnalytics`. Pages render only their content.

### Routes

| Route | Source | Notes |
|-------|--------|-------|
| `/` | `app/page.tsx` | `Hero → ProductsSection → TeamSection → ContactSection` (+ `HomeSectionScroll`). An `AboutSection` is intentionally absent — the handoff defines but never renders it. |
| `/blog` | `app/blog/page.tsx` | Listing via `BlogListing` |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | `generateStaticParams` from `app/data/blogPosts.ts`; per-post metadata + BlogPosting JSON-LD |
| `/privacy`, `/terms` | `app/{privacy,terms}/page.tsx` | Built on `LegalLayout`; body copy **hardcodes** domain/contact email (terms imports `company.ts` for some fields but not contacts) |
| `/compliance` | `app/compliance/page.tsx` | Standalone; `CredentialRow` + `company.ts` credentials |
| 404 | `app/not-found.tsx` | Custom not-found page |

### Theme system (dark default, light optional)

`ThemeToggle` sets `data-theme="light"` on `<html>` (dark = attribute absent), persisted in `localStorage`. Light-mode overrides live in `globals.css` under `:root[data-theme='light']`. There is also a `data-sky` tint system (dawn/day/dusk/night). **Any new UI must be checked in both themes** — dark-only styling is the common regression.

### Single sources of truth (edit these, never hardcode)

- **`app/lib/company.ts`** — legal/company identifiers (legal name, CIN, PAN, TAN, DPIIT, dates, certificate URLs, store/social links). Ten importers including `/compliance`, `/terms`, `TeamSection`, `SakhaStoreModal`, `SiteFooter`, `SEOStructuredData`, blog JSON-LD. **Gotcha:** `/privacy` (entirely) and the contact links in `/terms` still hardcode `margadeshaka.com` / `contact@margadeshaka.com` — editing `company.ts` alone leaves those pages stale.
- **`app/data/blogPosts.ts`** — typed blog content (block-based body: `p`/`h2`/`quote`, inline links supported). **Array order matters**: it drives the listing grid and prev/next links. Adding a post automatically updates `/blog`, static params, and the sitemap. (`app/data/blog.ts` is a dormant duplicate types file — don't import it.)
- **`app/lib/sakha.ts`** — Sakha try/download routing (platform detection, store deep links). **`app/lib/scroll.ts`** — cross-route section scrolling (`goToSection` works from non-home routes).

## Styling System

**The brand is forest green now, but the token names still say "gold."** The palette was repainted (saffron → green) while keeping Tailwind token names for compatibility: `brand.gold` = `#67B274`, `saffron.500` = `#328240`, `aurora.*` = greens. Don't "fix" a green value because the token is named gold, and don't reintroduce actual gold — the repaint was deliberate (`3e38612`).

- `navy.*` scale unchanged; background base `navy.950` `#06050F`
- `app/globals.css` (~2400 lines) is a **layered design system**: LAYER 1 = pre-redesign CSS, LAYER 2 = handoff design tokens (`:root` custom properties + `data-theme`/`data-sky` overrides), later layers for type/logo. New components should consume its custom properties rather than raw hexes.
- Tailwind `fontFamily` reads `--font-body`/`--font-display`/`--font-devanagari`/`--font-mono` **from globals.css tokens**, which map from the `next/font` `*-src` variables in `layout.tsx`. Never point Tailwind directly at next/font variables — that exact mismatch previously broke every heading silently.
- The `cosmic.*` Tailwind color scale is **unused by any file** (kept aliased to current values). Don't confuse it with the **live** global CSS classes `.cosmic-bg`/`.cosmic-text` in `globals.css`, used by `Hero`, `LegalLayout`, `BlogListing`, both blog routes, `/compliance`, and `not-found` — removing those flattens backgrounds site-wide.

## Legacy / Dormant Code

The ChakraVision-era cluster is self-contained (these import only each other) and **no route imports any of it**. Don't wire it back in, extend it, or treat its absence as a bug; confirm intent before touching:

- Components: `Chakra2DAnimation`, `ScrollManager`, `DialogBox`, `AudioPlayer`, `WelcomeOverlay`, `CosmicBackground`, `ScrollIndicator` (+`.module.css`), `LoginButton`, `WaitlistButton`, `LanguageSelector`, `ErrorBoundary`, `LazyWrapper`, `LoadingSpinner`, `Skeleton`, `GlassCard`, `SectionHeading`
- Contexts: all of `app/context/` (`ChakraContext`, `AuthContext`, `LanguageContext`, `LoggingContext`)
- Data: `app/data/chakraPoints.json`, `app/data/blog.ts`
- Scripts: `scripts/check-model.js`, `scripts/fix-model.js` (3D model utilities)

(`ChakraOrb`, `HeroBanner`, `AboutSection`, `FounderSection`, and `Analytics.tsx` were deleted outright during the redesign — they exist only in git history.)

## Testing

Playwright config: `playwright.config.ts`; tests in `tests/`, helpers in `tests/utils/test-helpers.ts`.

| File | Coverage |
|------|----------|
| `smoke.spec.ts` | Page loads, basic rendering |
| `basic-functionality.spec.ts` | Core interactions |
| `accessibility.spec.ts` | axe-core accessibility audit |
| `performance.spec.ts` | Load time and perf metrics |
| `visual-regression.spec.ts` | Screenshot comparisons (no baselines committed) |
| `chakra-navigation.spec.ts`, `audio-interaction.spec.ts` | **Entirely legacy** — written for the chakra experience |

**Stale-test warning:** the whole suite predates the redesign, not just the two chakra files. `tests/utils/test-helpers.ts` (`waitForPageReady`) waits for `img[alt="Sudarshan Chakra"]` or a `canvas` — neither exists on the live site; `smoke.spec.ts` asserts `#section-N` ids (live ids are `#products`/`#team`/`#contact`). Treat such failures as pre-existing drift, not regressions from your change, and don't "fix" live markup to satisfy a stale assertion.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_BASE_URL` | Yes | Canonical URL. Drives metadata, sitemap, JSON-LD — must differ per environment: `https://margadeshaka.com` (production), `https://margadeshaka-staging.web.app` (staging). |
| `NEXT_PUBLIC_GA_ID` | No | GA measurement ID. Unset (as on staging) means `GoogleAnalytics` never mounts. |

Both are baked in at **build** time (static export — nothing is read at runtime). CI sets them per branch in `.github/workflows/deploy.yml`; `NEXT_PUBLIC_GA_ID` comes from a repo secret or production analytics silently no-ops. `.env.example` documents the contract.

## Infrastructure

**Firebase Hosting only.** Vercel and Azure were removed entirely — no `vercel.json`, no Terraform, no Application Insights.

Two Hosting sites in one Firebase project (`margadeshaka-af4de`):

| Branch | Target | Site | URL |
|--------|--------|------|-----|
| `main` | `production` | `margadeshaka-af4de` | margadeshaka-af4de.web.app (→ margadeshaka.com once DNS moves) |
| `develop` | `staging` | `margadeshaka-staging` | margadeshaka-staging.web.app (`X-Robots-Tag: noindex`) |

- **CI/CD**: `.github/workflows/deploy.yml` deploys on push to either branch (manual dispatch with environment choice also available). Authenticates via the `FIREBASE_SERVICE_ACCOUNT` repo secret (dedicated service account, `roles/firebasehosting.admin` + `roles/firebase.viewer` only). Concurrency-guarded so a slow old commit can't land over a newer one.
- **`firebase.json` carries the config twice** (once per target) because Firebase can't share a hosting block across sites. `npm run verify:hosting` fails CI if the targets drift, staging loses `noindex`, or `trailingSlash` stops mirroring `next.config.js`. Keep it that way.
- **Post-deploy**: `scripts/ping-indexnow.sh` submits URLs to IndexNow — but its URL list is **hardcoded and missing `/blog` and all posts** (and uses non-slash URLs); extend it when adding routes.

## Claude Code Extras

- `.claude/launch.json` — preconfigured `dev` and `preview` launch targets for preview servers.
- `.claude/agent-model-routing.md` — model-routing guide for delegating to subagents/workflows (Haiku for mechanical work, Sonnet for edits, Opus/Fable for complex reasoning). Follow it when spawning agents.
- `.claude/agents/a11y-reviewer.md` — accessibility review agent; run it on UI diffs before the axe-core suite.
