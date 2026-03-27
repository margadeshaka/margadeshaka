# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev                 # Start development server (http://localhost:3000)
npm run build              # Build for production (static export to /out)
npm run start              # Start production server
npm run preview            # Build + start in one command

# Code quality
npm run lint               # Run ESLint with auto-fix
npm run lint:check         # Run ESLint without auto-fix (CI-safe)
npm run typecheck          # TypeScript type checking without emit

# Maintenance
npm run clean              # Remove .next, out, and node_modules/.cache
npm run build:analyze      # Build with bundle analyzer (ANALYZE=true)

# Testing (Playwright E2E)
npm test                   # Run all tests (builds first, serves /out on :3000)
npm run test:ui            # Open Playwright interactive UI
npm run test:headed        # Run tests in visible browser
npm run test:debug         # Run tests with debugger
npm run test:report        # Open last HTML test report
npm run test:accessibility # Run accessibility test suite only
npm run test:performance   # Run performance test suite only
npm run test:visual        # Run visual regression tests only
npm run test:ci            # Run tests with GitHub Actions reporter

# Note: npm run export is deprecated - use build (output: 'export' is set in next.config.js)
```

## Project Architecture

This repo is the **Margadeshaka corporate website** (`margadeshaka.ai`) — a marketing/landing page promoting the Sakha and Dronacharya AI products. The UI experience is built around a "ChakraVision" scroll-driven 2D chakra animation with spiritual aesthetics.

### Core Technology Stack
- **Next.js 15** with App Router, TypeScript, and `output: 'export'` (static HTML export)
- **React 19**
- **Three.js** via `@react-three/fiber` and `@react-three/drei` for 3D rendering (available but primary animation is 2D)
- **GSAP** for scroll-triggered animations
- **Tailwind CSS** with custom cosmic theme
- **Vercel Analytics** (`@vercel/analytics`) — primary analytics
- **Microsoft Application Insights** — secondary analytics (instrumentation key from env var)
- **Playwright** for E2E testing (cross-browser: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari)
- **Node.js ≥ 20** required

### Key Architectural Patterns

**Context-Based State Management**: The app uses multiple React contexts for different concerns:
- `ChakraContext` - Manages chakra-specific state and interactions
- `AuthContext` - Handles authentication state 
- `LanguageContext` - Multi-language support
- `LoggingContext` - Application logging

**Scroll-Driven Experience**: The core interaction is scroll-based camera movement through 3D space using GSAP ScrollTrigger, revealing different chakra points with associated content.

**Data Structure**: Chakra points are defined in `app/data/chakraPoints.json` with camera positions, content, and unlock states.

## Component Architecture

All components live in `app/components/`. All heavy/interactive components are lazy-loaded with `next/dynamic` and `ssr: false` to avoid hydration issues with browser-only APIs (WebGL, AudioContext, GSAP).

**Core Experience**:
- `Chakra2DAnimation.tsx` - Central 2D chakra visualization (hero element)
- `ScrollManager.tsx` - Scroll-based interactions and section reveals
- `DialogBox.tsx` - Displays spiritual content at each chakra point
- `CosmicBackground.tsx` - Animated cosmic background effects
- `AudioPlayer.tsx` - Om mantra audio integration
- `WelcomeOverlay.tsx` - Entry/splash experience
- `ScrollIndicator.tsx` + `ScrollIndicator.module.css` - Scroll progress UI

**Infrastructure / Utility**:
- `ErrorBoundary.tsx` - Top-level React error boundary wrapping the whole page
- `LoadingSpinner.tsx` - Generic loading state
- `Skeleton.tsx` - Exports `ChakraSkeleton` and `DialogSkeleton` for lazy-load placeholders
- `LazyWrapper.tsx` - Wrapper for deferred rendering
- `PerformanceMonitor.tsx` - Dev-only FPS/frame-time monitor using `PerformanceObserver` (auto-disabled in prod)
- `Analytics.tsx` - Application Insights initialization
- `SEOStructuredData.tsx` - JSON-LD structured data injection
- `LanguageSelector.tsx` - Language switching UI

**Auth / Waitlist**:
- `LoginButton.tsx` - Auth trigger (uses `AuthContext`)
- `WaitlistButton.tsx` - Product waitlist CTA

## Styling System

Uses Tailwind with custom cosmic theme:
```css
colors: {
  cosmic: {
    dark: '#0a0a1a',
    blue: '#1e1e3f',
    purple: '#483d8b',
    gold: '#ffd700'
  }
}
```

Custom animations: `spin-slow` (20s) and `pulse-slow` (4s) for spiritual ambiance.

## Brand Consistency (Margadeshaka Family)

ChakraVision is part of the **Margadeshaka** brand family alongside **Sakha**. Both share the "Saffron Thread" — gold/saffron as the unifying accent color.

| Element | ChakraVision | Sakha | Parent Standard |
|---------|-------------|-------|-----------------|
| **Primary Gold** | `#ffd700` (pure gold) | `#FFC864` (brand gold) | Gold/saffron accent required |
| **Background** | `#0a0a1a` (cosmic dark) | `#0a0a1a` (dark navy) | Dark-first |
| **Typography** | System font stack | Poppins + Inter | Poppins + Inter default |
| **Design Language** | 3D mystical, immersive | Glassmorphism, cosmic, warm | Indian heritage + modern AI |

**Brand source of truth:** `~/Projects/docs/PRDs/BRAND_STRATEGY.md`
**Design tokens:** `~/Projects/docs/brand/tokens/margadeshaka-tokens.css`

## Static Assets

- `/public/audio/` - Om mantra audio file
- `/public/images/` - Chakra PNG assets 
- `/public/textures/` - 3D material textures (if needed)

## Testing

Playwright is configured in `playwright.config.ts`. Tests live in `tests/` and shared helpers in `tests/utils/test-helpers.ts`.

Test suites:
| File | Coverage |
|------|----------|
| `smoke.spec.ts` | Page loads, basic rendering |
| `basic-functionality.spec.ts` | Core interactions |
| `chakra-navigation.spec.ts` | Scroll/chakra point navigation |
| `audio-interaction.spec.ts` | AudioPlayer controls |
| `accessibility.spec.ts` | axe-core accessibility audit |
| `performance.spec.ts` | Load time and perf metrics |
| `visual-regression.spec.ts` | Screenshot comparisons |

The webserver config builds the static export and serves `/out` — always run `npm run build` before `npm test` if you've changed code.

## Project Structure

```
app/
├── components/       # All React components (see Component Architecture above)
├── context/          # React contexts (ChakraContext, AuthContext, LanguageContext, LoggingContext)
├── data/             # chakraPoints.json — scroll sections data
├── globals.css       # Global styles + Tailwind base
├── layout.tsx        # Root layout with SEO metadata, structured data, footer
├── page.tsx          # Homepage — lazy-loads all heavy components
└── sitemap.ts        # Auto-generated sitemap for SEO
tests/
├── utils/            # Shared test helpers
└── *.spec.ts         # Playwright test suites
terraform/
└── main.tf           # Azure Static Web App + Application Insights IaC
public/
├── audio/            # Om mantra audio file
├── images/           # Chakra PNG/WebP assets
└── textures/         # 3D material textures
```

## Important Development Notes

- **Static export**: `output: 'export'` in `next.config.js` — no server-side features (no API routes, no SSR). Build produces `/out` directory.
- **SSR disabled on all interactive components**: Every component that uses browser APIs (WebGL, scroll, audio) is wrapped with `next/dynamic` + `ssr: false`
- **3D Models**: Webpack configured to handle `.glb` and `.gltf` files (emits to `static/models/`)
- **Image Optimization**: Disabled (`unoptimized: true`) for static export compatibility
- **TypeScript**: Strict mode enabled with path aliases (`@/*`)
- **Chunk splitting**: GSAP and Three.js get their own webpack chunks to avoid bundling them with app code
- **Performance monitoring**: `PerformanceMonitor` only activates in `NODE_ENV=development`; logs FPS and long tasks (>50ms)

## Content Management

Chakra points are defined in `app/data/chakraPoints.json` with this structure:
```json
{
  "id": "1",
  "title": "Point Title", 
  "description": "Content with \n line breaks",
  "position": "left|right",
  "cameraPosition": [x, y, z],
  "unlocked": false
}
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_BASE_URL` | Yes | Canonical URL, e.g. `https://margadeshaka.ai` |
| `NEXT_PUBLIC_ANALYTICS_ID` | Yes | Application Insights instrumentation key |

Both are set via `vercel.json` for Vercel and via Terraform `app_settings` for Azure Static Web Apps.

## Infrastructure

- **Vercel** (primary): `vercel.json` — uses `@vercel/next` builder, routes `/*` passthrough
- **Azure Static Web Apps** (alternative): Terraform in `terraform/main.tf` provisions `azurerm_static_site` + `azurerm_application_insights` in resource group `chakra-vision-rg`
- No CI/CD GitHub Actions workflow currently in repo (`.github/` directory absent)