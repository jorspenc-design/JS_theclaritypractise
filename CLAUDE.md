# TCP_ClarityPractice — Claude Code context

Site for **theclaritypractice.com** — Joshua Spence's professional consulting arm.
Converts visitors (senior/executive pastors, nonprofit EDs) into free Clarity Calls,
then into paid engagements.

## Stack

- **Astro 4** (App Router) — static site with zero client JS by default
- **Tailwind CSS** via `@astrojs/tailwind`
- **Fonts**: Fraunces (serif headlines) + Inter (sans body) — Google Fonts
- **Calendar**: Cal.com inline embed on `/book` page
- **Deploy target**: Netlify or Vercel

## Running locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
npm run preview    # serve the built dist/
```

## Design tokens

All tokens are defined as both Tailwind extended colors and CSS custom properties in
`src/styles/global.css`. Match these exactly — they're shared with joshuaspence.com.

| Token          | Value     | Purpose               |
|----------------|-----------|-----------------------|
| `ivory`        | #F7F4EE   | Primary background    |
| `charcoal`     | #1C1917   | Headlines             |
| `slate`        | #57534E   | Body text             |
| `brass`        | #A07840   | Accent / CTA          |
| `clay`         | #96543F   | Warm secondary accent |
| `warm-grey`    | #78716C   | UI structure, borders |

## Before going live

1. Replace `YOUR_USERNAME/clarity-call` in `src/pages/book.astro` with the actual
   Cal.com booking slug.
2. Update the essay link in `src/pages/index.astro` (Roman Road section) to the real
   `joshuaspence.com` URL once that essay is published.
3. Fill in past venues on the Speaking page once engagements accumulate.
4. Add `<meta og:image>` tags to Layout.astro when a share image exists.

## Sitemap

| Route           | File                          | Purpose                              |
|-----------------|-------------------------------|--------------------------------------|
| `/`             | `src/pages/index.astro`       | Home / primary conversion page       |
| `/how-we-work`  | `src/pages/how-we-work.astro` | Clarity Conversation framework       |
| `/services`     | `src/pages/services.astro`    | All offers with transparent pricing  |
| `/about`        | `src/pages/about.astro`       | Credentials, credibility             |
| `/speaking`     | `src/pages/speaking.astro`    | 5 keynote topics + booking pathway   |
| `/book`         | `src/pages/book.astro`        | Cal.com embed — single-purpose page  |

## Layout props

`Layout.astro` accepts:
- `title` — page title (appended "— The Clarity Practice", or bare for Home)
- `description` — meta description
- `minimalNav` — `true` on `/book` to suppress nav links (conversion focus)

## Cross-site relationship

This site and joshuaspence.com share design tokens and type scale.
Footer has a "From the desk of Joshua Spence ↗" link to joshuaspence.com.
Never move, rename, or restructure this folder — it's under active development.
