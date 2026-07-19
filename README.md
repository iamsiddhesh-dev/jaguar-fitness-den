# Jaguar Fitness Den — Website

Marketing site for Jaguar Fitness Den, Panchavati, Nashik. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other commands:

```bash
npm test         # unit tests (Vitest)
npm run test:e2e # end-to-end tests (Playwright) — builds and starts the app first
npm run lint      # ESLint
npm run build     # production build
```

## Editing content — no code changes needed

Everything a non-developer would want to change lives in typed data files under `content/`. Editing these and re-deploying is all that's needed — no component code has to change.

### Swap a photo or video

1. Open `content/media.ts`. Every image/video slot on the site (hero, facilities, programs, gallery, trainers, blog) is listed here as an entry pointing at a file path.
2. Drop the new file into `public/images/` (or `public/videos/`), then update the corresponding path in `media.ts` to point at it.
3. `MEDIA-TODO.md` at the repo root lists every slot still using placeholder/dummy media — cross it off once you've swapped in the real photo.
4. Keep aspect ratios close to the original placeholder so nothing shifts on the page (the layout reserves fixed space for each image).

### Update pricing or hours

Open `content/pricing.ts` (membership prices, promo banner) or `content/site-config.ts` (opening hours, phone numbers, address, Instagram/WhatsApp links). Change the values and save — every page that shows pricing or hours (Home, Pricing, Location, Contact, footer) reads from these files, so there's nothing else to update.

The promo banner in `content/pricing.ts` has an on/off flag — set it to show or hide the discounted price without deleting the data.

### Add a blog post

1. Add a new `.mdx` file under `content/blog/`, following the format of an existing post (frontmatter with title, description, date, etc. at the top, then the article body in Markdown).
2. Add a matching entry to `content/blog.ts` so it's registered (this drives the blog index, sitemap, and reading-time calculation).
3. The post is now live at `/blog/<slug>` automatically, with no other code changes needed.

### Add/edit a program, trainer, or facility

Same pattern: `content/programs.ts`, `content/trainers.ts`, `content/facilities.ts`. Add a new entry with a unique `slug` and the fields the existing entries use — the corresponding listing and detail pages pick it up automatically.

## Deployment

The site is deployed on Vercel. Pushing to `main` (or running `vercel deploy --prod` from the project root) builds and publishes automatically. Environment variables (`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, `NEXT_PUBLIC_GA4_MEASUREMENT_ID`) are configured in the Vercel project settings, not in this repo.

## Guardrails baked into the tests

A few rules are enforced automatically by `npm test`, so a bad edit fails fast instead of shipping:

- The old "Reliance Petrol Pump" address must never appear anywhere in `content/` or `app/` — only the real Panchavati/Laxmi Sky Park address is used in schema and metadata.
- No fabricated review ratings — the reviews section stays clearly labeled as a sample until real Google reviews are wired in.
- Every page must have SEO metadata (title + description) and matching structured data.
