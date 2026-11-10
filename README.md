# Daniel Hughes Tattoos

Source for [danhughestattoos.co.uk](https://danhughestattoos.co.uk), deployed with Vercel.

## Current rebuild

The `rebuild/editorial-monochrome-homepage` branch contains the approved editorial monochrome redesign with a rounded interface refinement.

## Site map

- `/` — welcome landing page with book/enquire, enter website and email-update routes.
- `/home.html` — full modular homepage and portfolio.
- `/contact.html` — contact routes and appointment-only information.
- `/booking.html` — enquiry, planning, deposit and confirmation process.
- `/offers.html` — project releases and promotion information.
- `/aftercare.html` — general aftercare guidance and when to seek medical advice.
- `/enquire.html` — existing three-stage enquiry form.
- `/privacy.html` — privacy notice.

- `index.html` — dedicated welcome/entry page, modular homepage, portfolio image slots, process, artist introduction and enquiry CTA.
- `site.css` — reusable modular layout and responsive design system.
- `dark-theme.css` — cross-page monochrome treatment for the enquiry and privacy pages.
- `enquire.html` — existing three-stage enquiry flow and backend submission; visual styling only.
- `privacy.html` — existing privacy notice.
- `backend/` — existing private enquiry intake implementation.
- `site-nav.js` — accessible mobile navigation behaviour.

## Design system

- Display: Archivo Black.
- Supporting typography: Poppins.
- Palette: near-black `#111111`, warm off-white `#f4f3ef`, white and neutral greys.
- Editorial hierarchy, rounded pill CTAs, rounded cards and image containers, generous spacing and image-led sections.
- Modular hero, portfolio, process, artist, enquiry and footer sections.
- Responsive desktop and mobile layouts.

## Photography

The portfolio currently uses clearly labelled temporary image slots. Replace these with Daniel's own approved tattoo photographs before the production release. Do not use generated or stock tattoo imagery as a substitute for the real portfolio.

## Integrations and data

The existing enquiry form and its private intake backend are preserved. The redesign does not create a second database, change database policies, connect tattoo enquiries to the INKSIGHTS CRM, or introduce payment processing. Supabase, HubSpot and Stripe should only be extended if a separately scoped requirement needs them.

## Release checklist

1. Verify the Vercel preview on desktop and mobile.
2. Check homepage, enquiry and privacy pages; test navigation, keyboard access and CTA links.
3. Test the enquiry flow safely without sending dummy production enquiries.
4. Confirm the existing backend still receives a real, consented test enquiry in an approved test environment.
5. Replace all temporary image slots with genuine, approved portfolio photography.
6. Review metadata, structured data, analytics and cookie/privacy requirements before launch.
7. Promote to the production domain only after approval.
