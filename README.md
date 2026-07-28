# Margadeshaka — company website

The marketing site for **Margadeshaka AI Private Limited** (margadeshaka.com), a
DPIIT-recognised Indian AI startup building **Sakha**, an AI companion for emotional
clarity, and **Dronacharya**, an AI tutoring platform.

Static Next.js site: a cosmic dark theme, a scroll-driven home page, a blog, and public
compliance pages carrying the company's registration and DPIIT credentials.

> **History:** this repo began as "ChakraVision", a 3D Sudarshan Chakra experiment. That
> subsystem (`Chakra2DAnimation`, `ScrollManager`, `DialogBox`, `chakraPoints.json`) is
> still in the tree but no longer rendered by any route. Ignore it unless you are
> deliberately reviving it.

## 📐 Project Architecture

### ⚙ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 15 (App Router) with `output: 'export'`
- **Styling**: Tailwind CSS + a layered `app/globals.css` design system
- **Type**: Newsreader (display), Geist (body/UI), Noto Serif Devanagari, Geist Mono — self-hosted via `next/font`
- **Animation**: CSS-driven, with `GSAP` available for the legacy chakra subsystem
- **3D** (legacy, unrendered): [Three.js](https://threejs.org/) via `@react-three/fiber`
- **Deployment**: Firebase Hosting (static export, Fastly-backed CDN) — see [Deployment](#-deployment)

## 🌀 Core Features

- 🪔 **Sakha showcase** — editorial intro, an animated phone mock replaying a conversation, and the in-app reflection cards
- 🧵 **Team constellation** — the team laid out on a Catmull-Rom thread
- 📨 **Contact orb** — a glowing mailto focal point
- 📝 **Blog** — "Notes from the path", an editorial feed with client-side search
- 🏛️ **Compliance pages** — CIN, PAN, TAN, DPIIT recognition, registered office, with the certificates as PDFs
- 🎨 **Cosmic UI** — dark theme, seeded starfield, saffron/gold accent

## 📁 Folder Structure

```
margadeshaka/
├── app/
│   ├── layout.tsx            # shell: fonts, metadata, navbar, footer, modal
│   ├── page.tsx              # home: Hero → Products → Team → Contact
│   ├── globals.css           # layered design system (see Deployment → Caching)
│   ├── blog/                 # listing + [slug] articles
│   ├── compliance/ privacy/ terms/
│   ├── components/
│   ├── data/blogPosts.ts     # blog content
│   └── lib/company.ts        # single source of truth for company facts
├── public/
│   ├── assets/               # design-handoff artwork
│   └── certificates/         # DPIIT + incorporation PDFs
├── firebase.json  .firebaserc
└── README.md
```

## 🛠 Setup Instructions

### 1. Clone & Install

```bash
git clone git@github.com:margadeshaka/margadeshaka.git
cd margadeshaka
npm install
```

### 2. Develop Locally

```bash
npm run dev
```

### 3. Build & Export

```bash
npm run build
```

`next.config.js` sets `output: 'export'`, so this writes a fully static site to `out/`.

## 🚀 Deployment

Hosted on **Firebase Hosting**, which serves from a Fastly-backed CDN and purges the
entire edge cache automatically on every deploy — no manual invalidation step.

### One-time setup

```bash
npm i -g firebase-tools
firebase login
firebase use --add        # select the Firebase project, alias it "default"
```

### Deploy

```bash
npm run deploy            # next build && firebase deploy --only hosting
```

Preview a change on a temporary URL without touching production:

```bash
npm run deploy:preview    # expires after 7 days
```

Roll back from the Firebase console (Hosting → release history) — every deploy is
atomic and previous releases stay available.

### Caching

`firebase.json` sets `Cache-Control` per asset class, because Firebase's own default is
`max-age=3600` for everything — which would keep a deploy out of returning visitors'
browsers for up to an hour.

| Path | Policy |
| --- | --- |
| `**` (default — HTML pages land here) | `max-age=0, must-revalidate` so deploys are visible immediately |
| `/_next/static/**` | 1 year, `immutable` (content-hashed) |
| fonts, audio, `.glb`/textures | 30 days |
| images, PDFs | 1 day + `stale-while-revalidate` (names aren't hashed) |
| `sitemap.xml`, `robots.txt`, manifests | 1 hour |

**Two ordering rules matter when editing these — both verified against the Hosting emulator:**

1. **The last matching `headers` entry wins** for a given header key. So the broad `**`
   default must come *first* and the specific asset rules *after* it. Putting a catch-all
   `**` last silently clobbers the `immutable` policy on hashed assets.
2. **`source` globs match the request path, not the resolved file.** A rule on
   `**/*.html` never fires for `/` or `/blog/`, because those paths carry no `.html`
   suffix even though they resolve to `out/blog/index.html`. Page caching therefore has
   to come from the `**` default rather than an `*.html` pattern.

Verify any change locally without credentials:

```bash
firebase emulators:start --only hosting --project demo-margadeshaka
curl -sSI http://127.0.0.1:5000/blog/ | grep -i cache-control
```

`trailingSlash: true` in `firebase.json` mirrors the same setting in `next.config.js`,
so `/blog` redirects to `/blog/` and resolves to `out/blog/index.html`.

## 💡 Inspiration

Margadeshaka — मार्गदेशक — means "the one who shows the path". The products aim to help
people think more clearly rather than think for them, drawing on Indian wisdom traditions
for structure rather than aesthetics.

## ✨ Credits

- Visual design from the claude.ai/design handoff
- Powered by Next.js, Tailwind CSS, and Firebase Hosting

## 🌐 License

MIT License