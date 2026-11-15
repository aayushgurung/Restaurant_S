# Shaswat Nepali Kitchen

A responsive restaurant UI built from the supplied eight-page wireframe. The visual direction combines modern ivory and burgundy layouts with restrained Himalayan illustrations, Dhaka-inspired borders and Nepali typography.

## Get started

Requires Node.js 20.9 or newer. Developed with Node 24.

```sh
cd shaswat
npm install
npm run dev
```

Open http://localhost:3000. On Windows PowerShell, use `npm.cmd` if execution policy prevents `npm.ps1` from running.

```sh
npm run typecheck
npm run build
```

The production build exports all routes to `out/`. Serve that folder with any static host. To use a Next.js server later, remove `output: "export"` from `next.config.ts`, then build and run `npm start`.

## Stack and structure

- Next.js 16.4.6 App Router, React 19.3, TypeScript in strict mode
- Tailwind CSS 4 with shared design tokens and responsive component styles
- Framer Motion for restrained reveals and cursor-responsive hero movement
- Lucide icons and locally hosted Cormorant Garamond, Inter and Noto Sans Devanagari

```text
src/
  app/                 Pages, metadata, fonts, global styles, sitemap and robots
  components/
    layout/            Shared header, mobile navigation, sticky actions, footer
    home/              Animated hero
    menu/              Reusable dish cards and filter/search interface
    ordering/          Cart, delivery/pick-up selector and checkout preview
    forms/             Reservation, catering and contact form variants
    gallery/           Filterable gallery and native-dialog lightbox
    providers/         Shared cart state with defensive localStorage persistence
    ui/                Buttons, headings, illustrations, reveals, opening hours
  config/site.ts       Name, location, hours, navigation and site URL
  lib/menu.ts          Sample dishes, category types, dietary tags, prices in cents
public/
  fonts/               Compact, self-hosted WOFF2 fonts
  images/              Locally optimized WebP photography
scripts/
  check-ui.mjs         Browser verification of routes and key user journeys
  optimize-images.mjs  Source image optimization helper
  normalize-export.mjs Windows static-export navigation filename correction
```

## Pages and interactions

Home, Menu, Our Story, Online Ordering, Table Reservation, Gallery, Catering & Events, Contact & Location.

- Category, search and vegetarian filters with an empty state
- Shared cart, quantity controls, exact integer-cent totals and persistent items
- Pick-up/delivery selection, sample delivery fee and validated demo checkout
- Reservation dates and past-time validation in the Australia/Sydney timezone
- Contact and catering forms with local confirmation states
- Gallery categories, load more, keyboard arrows and Escape-to-close lightbox
- Native dialogs with focus trapping, visible keyboard focus, skip navigation, reduced-motion support and fixed mobile Order/Book buttons

## UI-only scope

**No orders, payments, bookings or messages are sent.** Forms validate in the browser and show clearly labelled demo results. Personal form details remain in component memory; only dish IDs and quantities are saved in localStorage. There is no backend, email service, payment integration or ordering-provider integration.

Shaswat is a placeholder identity based on the workspace name. Prices, packages, opening hours, email, location, team copy and food photography are illustrative. No business phone number or exact street address has been invented. The map shows the Sydney area. Replace these details in `src/config/site.ts`, `src/lib/menu.ts` and the relevant pages before launch.

Page titles, descriptions, Open Graph metadata and a sitemap are included. Search indexing is deliberately disabled while the site contains placeholder business information. At launch, update the production URL, enable indexing in `layout.tsx`, and change `robots.ts` to allow crawling.

## Browser verification

```sh
npx playwright install chromium
npm run build
python -m http.server 3000 --bind 127.0.0.1 --directory out
```

In another terminal:

```sh
npm run test:ui
```

The checks cover all eight routes, menu filtering, persistent cart quantities/totals, delivery checkout, three form flows, gallery filtering/keyboard controls, mobile navigation, reduced motion and overflow at 375, 768, 1024 and 1440 pixels. Screenshots are saved to ignored `artifacts/`. Set `TEST_URL` to test another local server.

The `postbuild` step corrects a Windows-specific filename issue in Next.js 16.4's static exporter. It copies generated navigation segment payloads to the flat filenames requested by the browser. Payload contents remain unchanged; Linux builds need no corrections. Browser checks also reject failed local resource and prefetch requests.

## Image and design credits

Photography is downloaded from Unsplash and stored locally as optimized WebP assets. Placeholder image sources:

- [Momo platter source](https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9)
- [Kabita Darlami — steamed momo](https://unsplash.com/photos/90SXZzJpySc)
- [Roshan Dhimal — momo](https://unsplash.com/photos/MngTyIFt0BI)
- Other Unsplash photo IDs: `1546833999-b9f581a1996d`, `1512058564366-18510be2db19`, `1517248135467-4c7edcad34c4`, `1414235077428-338989a2e8c0`, `1464822759023-fed622ff2c3b`, `1544787219-7f47ccb76574`, `1556910103-1c02745aae4d`, `1488477181946-6428a0291777`.

Google Fonts provides the three requested typefaces. The supplied DOCX wireframes define page structure. 8848 Momo House and Falcha were reviewed for general cultural and hospitality inspiration; this project uses its own identity, copy and layouts.

Sites hosting configuration is stored in `.openai/hosting.json`. The app itself uses standard Next.js and can be hosted elsewhere.
