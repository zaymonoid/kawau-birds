# The Birds of Kawau Island

A field guide to the birds of Kawau Island (Te Kawau Tūmaro o Toi) in the Hauraki Gulf, built with Next.js (App Router).

## Commands

```sh
pnpm install
pnpm dev      # development server on http://localhost:3000
pnpm build    # static generation of every page
pnpm start    # serve the production build (needed for image optimisation)
```

Every page is prerendered at build time. Photos are resized and converted on request by the
Next.js image optimiser, so the site needs `next start` (or a host such as Vercel) rather than a
plain static export.

## Content

- `data/birds.json`: the six habitat groups and 53 species.
- `data/credits.json`, `data/credits-2.json`: photo credits, alt text and crop focal points.
- `public/images/birds/`: the photos. All are public domain or CC0; the author and licence of each are in the credits files and on the site.
- `lib/birds.ts`: reads the data at build time.
