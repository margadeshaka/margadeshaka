# 🔱 ChakraVision – 3D Sudarshan Chakra Interactive Web Experience

A beautiful interactive web application built with **Next.js** and **Three.js**, centered around a 3D **Sudarshan Chakra**, inspired by authentic Hindu scriptures. As the user scrolls, the chakra highlights different points and reveals spiritual insights or dialog panels.

## 📐 Project Architecture

### ⚙ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **3D Engine**: [Three.js](https://threejs.org/) via `@react-three/fiber`
- **3D Model Loader**: `@react-three/drei` (`useGLTF`)
- **Scroll-based Animation**: `GSAP` + `ScrollTrigger` or `react-intersection-observer`
- **Styling**: Tailwind CSS
- **Deployment**: Firebase Hosting (static export, Fastly-backed CDN) — see [Deployment](#-deployment)
- **Authentication (optional)**: Azure AD B2C / MSAL.js

## 🌀 Core Features

- 🔱 **Central 3D Sudarshan Chakra** modeled as per Vedic scripture
- 📜 **Scroll-based camera motion** to different points of the chakra
- 🗣️ **Dynamic dialog boxes** that appear on left/right showing titles and Vedic insights
- 🎨 **Cosmic UI** with divine fonts and themes
- 🎵 Optional background music/chant integration
- 🌐 Multi-language support (English/Sanskrit/Hindi)

## 📁 Folder Structure

```
chakra-vision/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── components/
│       ├── ChakraScene.tsx
│       ├── DialogBox.tsx
│       └── ScrollManager.tsx
├── public/
│   └── models/
│       └── sudarshan-chakra.glb
├── styles/
│   └── globals.css
├── package.json
└── README.md
```

## 🛠 Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/chakra-vision.git
cd chakra-vision
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

## 🧠 Chakra Model Reference

Design the Sudarshan Chakra based on:
- **Vishnu Purana**: Describes it as a blazing disc with 108 serrated spokes.
- **Mahabharata**: Mentions it as Lord Vishnu's divine weapon spinning faster than light.
- **Padma Purana**: Speaks of its golden body, center of light, and fire-rimmed circumference.

## 🔄 Scroll Interaction Design

- Use GSAP ScrollTrigger or a custom useScrollPosition hook
- Move camera along 3D path using lerp or ref.current.position.set(...)
- At each scroll milestone, update the dialog on screen

## ✅ Milestones

### Phase 1: Setup
- Setup Next.js project
- Install Three.js + Fiber + Drei
- Add Chakra 3D model

### Phase 2: Interactivity
- Add scroll-triggered camera animation
- Display dialog boxes dynamically

### Phase 3: Visuals
- Add cosmic theme + background
- Animate chakra rotation

### Phase 4: Integration
- Add multilingual support
- Optional: Azure AD auth & deployment

## 💡 Inspiration

This project is rooted in dharmic spiritual themes and aims to make Vedic wisdom accessible through immersive tech.

## ✨ Credits

- Chakra design from Hindu iconography
- Powered by Next.js, Three.js
- 3D Chakra design by [YourArtistName] (use Blender or Sketchfab)

## 🌐 License

MIT License