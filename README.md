# Welcome Itz Fizz – Scroll-Driven Hero

Stack: HTML, CSS, JavaScript, Next.js (React), Tailwind CSS, GSAP + ScrollTrigger.

## Run
```bash
npm install
npm run dev          # http://localhost:3000
```

## Build (static export to /out)
```bash
npm run build
npm run preview      # optional: serve the built site
```

## Deploy (GitHub Pages)
1. Push to a GitHub repo on branch `main`.
2. Settings -> Pages -> Source: **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes it.

## How it works
- **Load animation** (GSAP timeline): headline letters reveal with a stagger, the car slides in, stat cards rise in one by one while their numbers count up.
- **Scroll animation** (ScrollTrigger, `pin: true`, `scrub: 1.2`): the car drives across the road, the headline lights up as the car passes, road markings stream by, stat cards light up in turn, background blobs drift. Everything is tied to scroll progress and smoothed by `scrub`.
- **Performance:** car, road, cards and blobs animate with `transform`/`opacity`; no custom scroll listeners; `will-change: transform` on the car.
- **Accessibility:** scroll animation is skipped under `prefers-reduced-motion`.
