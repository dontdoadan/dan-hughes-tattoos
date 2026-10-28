# Daniel Hughes Tattoos

Source for [danhughestattoos.co.uk](https://danhughestattoos.co.uk), hosted on Vercel and deployed from the `main` branch.

## Site structure

- `index.html` — editorial homepage, approach, work categories, private studio, enquiry CTAs.
- `enquire.html` — three-stage tattoo enquiry form and its existing Supabase submission logic.
- `privacy.html` — privacy notice.
- `site.css` — shared visual design system, header, navigation, typography, responsive layouts.
- `site-nav.js` — small keyboard-friendly mobile navigation behaviour.
- `backend/` — existing private tattoo enquiry intake implementation and documentation.

The HTML pages are static; no frontend build step is required.

## Design and content notes

The shared system uses ink, parchment and muted brass tones, a system sans-serif font for UI/copy, and a classical serif stack for editorial headings. Avoid introducing third-party font dependencies without considering performance and privacy.

The three homepage work panels describe *types of commissions*, not finished tattoo photographs. They are intentionally typographic rather than presenting fake or placeholder portfolio imagery. Replace them with genuine, consent-cleared tattoo photography when a curated portfolio is available.

Keep navigation anchors consistent across the pages: `#work`, `#approach`, `#studio`, and the `/enquire.html` CTA. On secondary pages, link to homepage anchors using `/#section`.

The homepage still contains a `noindex, nofollow` robots directive carried over from the initial site. Confirm launch/indexing readiness before changing it.

## Release acceptance checks

1. Verify the header navigation and enquiry CTA on desktop and mobile.
2. Verify mobile menu opens, closes after selecting a section, and closes with Escape.
3. Check readable typography, overflow, and keyboard focus at 320px, 390px, 768px and desktop widths.
4. Confirm all homepage and footer anchors work, including links from the enquiry and privacy pages.
5. Complete all three enquiry form steps with test data in a safe environment; confirm validation, success and failure behaviour without creating a real customer booking.
6. Check the privacy notice and direct email fallback are accessible.
7. Verify Vercel preview deployment is READY before merging into `main`.

Do not change form endpoint, submission payload, age/privacy validation, or deposit copy as part of visual redesign work.
