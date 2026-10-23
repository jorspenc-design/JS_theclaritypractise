# TCP_ClarityPractice — Claude Code context

Site for **theclaritypractice.com** — Joshua Spence's professional consulting arm.
Converts visitors (senior/executive pastors, nonprofit EDs) into free Clarity Calls,
then into paid engagements.

## Stack

- **Astro 4** (App Router) — static site with zero client JS by default
- **Tailwind CSS** via `@astrojs/tailwind`
- **Fonts**: Fraunces (serif headlines) + Inter (sans body) — Google Fonts
- **Calendar**: Calendly inline embed on `/book` page
- **Deploy target**: Netlify or Vercel

## Running locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
npm run preview    # serve the built dist/
```

## Brand

The site follows the Joshua Spence Visual Identity Guide (v2, October 2026).

- **Logo:** the keystone arch. Use `src/components/Logo.astro` (arch + "Joshua Spence" wordmark)
  or `ArchMark.astro` (mark alone). Never redraw the arch, recolor the keystone (always brass),
  or put the arch in the same lockup as "The Clarity Practice" sub-mark.
- **Type:** Fraunces Semibold for headlines, Fraunces Italic for accent phrases (`.accent`),
  Inter for body. Body text is 17px minimum.
- **Copy:** follow the joshua-standards voice rules. No reflexive em dashes, no
  "this isn't X, it's Y", no tidy triplets.

## Design tokens

Defined in `tailwind.config.mjs` and mirrored as CSS variables in `src/styles/global.css`.

| Token        | Value     | Purpose                                         |
|--------------|-----------|-------------------------------------------------|
| `slate`      | #2B4C6F   | Deep Slate: headlines, primary buttons, the arch |
| `charcoal`/`ink` | #2B2B2B | Body text                                     |
| `ivory`      | #F7F3ED   | Default background (never pure white)           |
| `paper`      | #FBF9F5   | Lifted surfaces and cards                       |
| `stone`      | #D9D2C5   | Borders, dividers, quiet surfaces               |
| `brass`      | #B08D57   | Keystone, rules, accents                        |
| `brass-ink`  | #8A6A3B   | Brass for small text on light backgrounds       |
| `clay`       | #B5654A   | Italic accent phrases, used sparingly           |
| `warm-grey`  | #6B6660   | Captions and metadata                           |
| `olive`      | #3A3D2E   | Footer                                          |

## Components

- `PageHeader.astro`: eyebrow, headline with optional italic accent, lede, faint arch watermark
- `CtaBand.astro`: Deep Slate closing call to action with arch watermark
- `ArchLine.astro`: outline arch for decoration (`draw` animates it on scroll)
- Add `data-reveal` to any element to fade it in on scroll. Content stays visible without JavaScript.

## Security

`public/_headers` sets the Content-Security-Policy and other security headers on Netlify.
Adding any new outside service (analytics, forms, video) means adding its domain there.

## Before going live

1. Confirm the Calendly link in `src/pages/book.astro` is the right event.
2. Update the essay link in `src/pages/index.astro` (Roman Road section) to the real
   `joshuaspence.com` URL once that essay is published.
3. Fill in past venues on the Speaking page once engagements accumulate.
4. Share image lives at `public/og-image.png`; regenerate it if the brand changes.

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
