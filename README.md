# Atom-lite website

The public site for [Atom-lite](https://github.com/beast-ofcourse/atom-lite): a
product showcase, install path, and documentation surface. Built with Next.js
16 (App Router), React 19, GSAP, and a small WebGL paper shader.

## Run locally

```bash
npm install
npm run dev            # http://localhost:3000
npm run typecheck
npm test               # docs integrity, built output, accessibility wiring
npm run docs:check     # docs structure, source paths, no private ADR links
npm run build
npm start              # production server on :3000
```

## Checks

```bash
npm test                     # 16 tests
npm run docs:check
npm run typecheck
npm run build
```

The dev server allows `127.0.0.1` as a local origin for tooling.

## Deploy

The project is ready for Vercel with zero configuration. `.env.production`
sets the canonical origin to `https://atomlite.dev`, which drives
`metadataBase`, `robots.txt`, and `sitemap.xml`. That domain was unregistered
when selected (RDAP 404); register it and point Vercel at it before launch. If
the domain changes, update `.env.production` and rebuild. Without the variable
those files use `http://localhost:3000` so no domain is invented.

## Content

Product truth lives in `PRODUCT.md` at this folder's root and in the Atom-lite
repository. Documentation pages are authored in `lib/docs.ts` and mirror the
published `Atom-lite/docs/` structure: four groups (Get started, Use,
Customize, Reference) and 14 pages, each linking to its real Markdown source.
Private ADRs are intentionally never linked from published docs. Do not add
testimonials, customer counts, pricing, or other claims the repository cannot
support.

Real product material in `public/assets/`:

- `Atom-lite-demo.webm` — terminal session recording
- `Dark-theme.png`, `Light-theme.png` — browser UI captures
- `demo-poster.png` — poster frame derived from the recording

Each raster carries embedded provenance. Keep it when replacing assets.

## Design

The committed visual world is "The Session Drawer" — a kraft card catalogue.
Its contract is in `.impeccable/surfaces/home.md`. `DESIGN.md` records the
system after the finish review. Motion is one GSAP entrance plus state
feedback; the WebGL layer draws paper fibre and honours
`prefers-reduced-motion`.
