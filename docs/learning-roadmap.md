# Learning Roadmap — Mastering the Margadeshaka Frontend

A step-by-step path from "I know HTML/CSS" to "I can change anything in this repo
with confidence."

Every step below points at **real files in this repo**. This is not a generic
tutorial — it is a tour of your own code, in the order that makes it make sense.

**Rule: one step per session. Do the exercise before moving on.**

---

## Learner profile

| | |
|---|---|
| **Background** | BCA graduate — variable / loop / function / array are known words from C & Java, but little real building experience |
| **JavaScript** | Lesson 2 (`map`, `filter`, destructuring, spread) was mostly new |
| **React** | Never used |
| **Goal** | Become the main developer of this site |
| **Session length** | ~1 hour |
| **Language** | Mostly plain English; Hinglish only as a one-line gloss on hard concepts |

**Lesson format (all four learning styles selected):**

```
1. ANALOGY   →  real-world comparison first
2. DIAGRAM   →  boxes and arrows
3. CODE      →  a small runnable example, then the real file in this repo
4. EXERCISE  →  something to type and break yourself
```

---

## Legend

- `[x]` done
- `[ ]` not yet
- 🔨 = there is a hands-on exercise
- ⚠️ = a place people commonly get confused

---

## STAGE 0 — Foundations (mostly done)

| # | Topic | Status |
|---|-------|--------|
| 0.1 | HTML — tags, nesting, attributes, the DOM tree | `[x]` already known |
| 0.2 | CSS — selectors, box model, colour, layout | `[x]` already known |
| 0.3 | JavaScript essentials — `const`, arrow functions, objects, arrays, `map`, `filter`, destructuring, spread, `import`/`export` | `[x]` Lesson 2 |

**Checkpoint:** you can read `products.map(p => `<li>${p.name}</li>`)` and say out
loud what it produces.

---

## STAGE 1 — React (the biggest stage)

This is where the repo starts to make sense. Do not rush it.

| # | Topic | Learn it in this repo |
|---|-------|----------------------|
| 1.1 | **JSX** — HTML written inside JavaScript. `className` not `class`. `{ }` = escape into JS. | `app/components/Hero.tsx` |
| 1.2 | **Components** — a function that returns JSX. Your whole UI is a tree of these. | `app/page.tsx` (4 components assembled) |
| 1.3 | **Props** — passing data into a component, like HTML attributes. | `app/components/SectionLink.tsx`, `GlassCard.tsx` |
| 1.4 | **Lists + `key`** — rendering an array with `.map()`. ⚠️ why `key` is required. | `app/components/TeamSection.tsx` |
| 1.5 | **Conditional rendering** — `{cond && <div/>}` and ternaries. | `app/layout.tsx:165` (`{gaId && <GoogleAnalytics/>}`) |
| 1.6 | **`useState`** — memory that survives re-renders. ⚠️ why you never assign directly. | `app/components/Navbar.tsx` (mobile menu open/closed) |
| 1.7 | **The re-render model** — state changes → function runs again → new JSX → React updates the DOM. | conceptual — the single most important idea in React |
| 1.8 | **`useEffect`** — running code *outside* React (scroll listeners, timers). ⚠️ dependency array, ⚠️ cleanup. | `app/components/ScrollToTop.tsx` |
| 1.9 | **`useRef`** — a handle on a real DOM element, or a value that doesn't cause re-render. | `app/components/ReflectDeck.tsx` |
| 1.10 | **`useMemo` / `useCallback`** — caching, to avoid needless work. | `app/components/blog/BlogListing.tsx` (search filtering) |
| 1.11 | **Context** — sharing state without passing props down every level. | `app/context/*` (⚠️ all dead code here, but the pattern matters) |

🔨 **Stage 1 exercise:** add a new team member to `TeamSection.tsx` and a new
nav link to `Navbar.tsx`. If both appear, Stage 1 is done.

**Numbers in this repo:** `useEffect` ×46, `useState` ×42, `useCallback` ×15,
`useRef` ×14, `useMemo` ×11, `useContext` ×8.

---

## STAGE 2 — Next.js

React alone cannot make a website. Next.js turns components into pages.

| # | Topic | Learn it in this repo |
|---|-------|----------------------|
| 2.1 | **App Router** — a folder is a URL, `page.tsx` is the page. | `app/privacy/page.tsx` → `/privacy` |
| 2.2 | **`layout.tsx`** — the shell wrapped around every page. | `app/layout.tsx` |
| 2.3 | **Server vs Client Components** ⚠️⚠️ the #1 confusion in modern Next.js. `'use client'` at the top of a file. | 32 files have `'use client'`; `Hero.tsx`, `SiteFooter.tsx`, `CosmicLayer.tsx` do **not** |
| 2.4 | **Metadata / SEO** — the `export const metadata` object. | `app/layout.tsx:46-124` |
| 2.5 | **Dynamic routes** — `[slug]` folders. | `app/blog/[slug]/page.tsx` |
| 2.6 | **`generateStaticParams`** — telling the build which pages to create. | `app/blog/[slug]/page.tsx` |
| 2.7 | **`next/font`** — self-hosted fonts, no network request. | `app/layout.tsx:19-42` |
| 2.8 | **Static export** ⚠️ `output: 'export'` — why this site has no server, no API routes, no database. | `next.config.js:5` |
| 2.9 | **`app/sitemap.ts`, `not-found.tsx`** — special files Next.js recognises. | `app/sitemap.ts` |

🔨 **Stage 2 exercise:** create `app/about/page.tsx` with a heading. Visit
`/about`. Then add it to the footer links.

---

## STAGE 3 — Styling as it is actually done here

| # | Topic | Learn it in this repo |
|---|-------|----------------------|
| 3.1 | **Tailwind basics** — utility classes instead of CSS files. | any component's `className` |
| 3.2 | **The theme** — where `bg-navy-950` and `text-brand-gold` are defined. | `tailwind.config.js` |
| 3.3 | **`globals.css`** (3,338 lines!) — the layer system, design tokens, custom classes. This repo does **not** use Tailwind alone. | `app/globals.css` |
| 3.4 | **CSS variables + fonts** — `--font-display` etc., how `layout.tsx` and `tailwind.config.js` connect. | `layout.tsx` ↔ `tailwind.config.js:49-54` |
| 3.5 | **CSS Modules** — the one file using them. | `app/components/ScrollIndicator.module.css` |
| 3.6 | **Animation** — done with pure CSS here, not a library. | `globals.css`, `tailwind.config.js:74-79` |

🔨 **Stage 3 exercise:** change the brand gold in `tailwind.config.js` and watch
the whole site shift. Then change it back.

---

## STAGE 4 — This repo, file by file

Now read the actual code. Order matters — each builds on the last.

| # | File | What it teaches |
|---|------|-----------------|
| 4.1 | `app/layout.tsx` | the shell, fonts, metadata, what's on every page |
| 4.2 | `app/page.tsx` | how a page is assembled from sections |
| 4.3 | `app/components/Hero.tsx` | a simple Server Component |
| 4.4 | `app/components/Navbar.tsx` | state, mobile menu, client component |
| 4.5 | `app/components/ProductsSection.tsx` + `ReflectDeck.tsx` | the fanned cards, refs, interaction |
| 4.6 | `app/components/TeamSection.tsx` | data → `.map()` → UI |
| 4.7 | `app/components/SakhaStoreModal.tsx` | a modal shared across all pages |
| 4.8 | `app/data/blogPosts.ts` + `app/data/blog.ts` | content as data |
| 4.9 | `app/blog/page.tsx` + `blog/BlogListing.tsx` | listing, search, filtering |
| 4.10 | `app/blog/[slug]/page.tsx` + `blog/BlogArticle.tsx` | dynamic pages from data |
| 4.11 | `app/components/SEOStructuredData.tsx` | JSON-LD for Google |
| 4.12 | `app/components/CosmicLayer.tsx` / `CosmicEffects.tsx` | the background visuals |
| 4.13 | `app/lib/company.ts`, `sakha.ts`, `scroll.ts` | plain helper modules |

🔨 **Stage 4 exercise:** write a new blog post by adding one object to
`app/data/blogPosts.ts`. It should appear on `/blog` and get its own page — with
zero new components written.

---

## STAGE 5 — Build, test, ship

| # | Topic | Where |
|---|-------|-------|
| 5.1 | What `npm run build` actually does → `out/` | `next.config.js`, then inspect `out/` |
| 5.2 | Reading the build output — chunks, sizes | terminal after a build |
| 5.3 | Playwright tests — how they drive a real browser | `tests/*.spec.ts` |
| 5.4 | Firebase Hosting — two sites, caching headers, noindex on staging | `firebase.json`, `.firebaserc` |
| 5.5 | CI/CD — push `Develop` → staging, push `main` → production | `.github/workflows/deploy.yml` |
| 5.6 | Performance — chunk splitting, fonts, images | `next.config.js:27-79` |

🔨 **Stage 5 exercise:** run `npm run build`, open `out/index.html` in a text
editor, and find your Hero heading inside it as plain HTML.

---

## STAGE 6 — Mastery

You have mastered the repo when you can do all of these without help:

- [ ] Add a new page with correct SEO metadata
- [ ] Add a new section to the homepage
- [ ] Write a blog post and have it appear everywhere it should
- [ ] Change a brand colour globally from one place
- [ ] Explain why a component needs `'use client'` — and why `Hero.tsx` doesn't
- [ ] Explain why this site cannot have a login form
- [ ] Fix a failing Playwright test
- [ ] Deploy to staging, verify, then to production
- [ ] Safely delete the dead ChakraVision code (see below)

---

## What you can SKIP

These are in `package.json` but **not used by the live site**:

| Library | Reality |
|---------|---------|
| `three`, `@react-three/fiber`, `@react-three/drei` | imported by **zero** files |
| `gsap` | imported only by `Chakra2DAnimation.tsx`, which nothing renders |
| `react-swipeable`, `react-intersection-observer` | verify before learning |

**Dead code — ignore while learning:**

```
Chakra2DAnimation.tsx   ScrollManager.tsx      DialogBox.tsx
WaitlistButton.tsx      WelcomeOverlay.tsx     AudioPlayer.tsx
ErrorBoundary.tsx       ScrollIndicator.tsx    LoginButton.tsx
LanguageSelector.tsx    LazyWrapper.tsx        LoadingSpinner.tsx
Skeleton.tsx            GlassCard.tsx          SectionHeading.tsx
CosmicBackground.tsx    app/context/ (all 4)   app/data/chakraPoints.json
```

These are leftovers from when this repo was "ChakraVision". Nothing renders them.
⚠️ The project `CLAUDE.md` still describes that old architecture — it is out of
date on this point.

---

## Time estimate

| Stage | Sessions |
|-------|----------|
| Stage 1 — React | 6–8 |
| Stage 2 — Next.js | 4–5 |
| Stage 3 — Styling | 2–3 |
| Stage 4 — The repo | 6–8 |
| Stage 5 — Ship | 2–3 |
| **Total** | **~20–27 sessions** |

---

## Progress

- [x] 0.1 HTML
- [x] 0.2 CSS
- [x] 0.3 JavaScript essentials
- [x] 1.1 JSX — interactive deck on Desktop (`margadeshaka-learning.html`)
- [ ] **1.2–1.7 Components → Props → Lists → Conditionals → State → Re-render model  ← YOU ARE HERE**
      Full interactive deck: `~/Desktop/react-from-zero.html` (30 slides, 14 live editors).
      Work through it slide by slide; repo exercise is on slide 30.
- [ ] 1.8 useEffect — next taught lesson
- [ ] ... (continue down Stage 1)
