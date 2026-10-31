# Daniel Hughes Tattoos

Source for [danhughestattoos.co.uk](https://danhughestattoos.co.uk), deployed with Vercel from the `main` branch.

## Website

A small, static website for a private tattoo studio in South London.

- `index.html` — responsive homepage with hero, types of work, three-step approach, studio information and project enquiry links.
- `enquire.html` — existing three-stage tattoo enquiry, including consent and secure submission to the existing backend.
- `privacy.html` — existing privacy notice.
- `site.css` — shared structural layout, typography, responsive navigation, rounded surfaces and form-page styles.
- `dark-theme.css` — final dark navy, white, mint and blue colour layer, loaded after the shared styles on every page.
- `site-nav.js` — closes the mobile menu when a link is chosen or Escape is pressed.
- `backend/` — existing private enquiry intake implementation.

No framework, build step, remote font, or stock imagery is needed.

## Design system

- Base background: midnight navy `#09121c`
- Cards and surfaces: deep blue-navy `#142332`, `#173042`
- Main text: near-white `#f5f9ff`
- Primary accent and enquiry buttons: mint `#a4f6d6`
- Secondary accent: soft blue `#91bcff`
- Body font: the existing rounded system-font stack; no third-party fonts
- Rounded panels, pill buttons, clear visual hierarchy and minimal effects
- Work / Approach / Studio section links and one prominent `Start a project` action

The dark palette applies consistently to the homepage, existing three-stage enquiry form, and privacy notice. The theme layer deliberately changes appearance only: the form JavaScript, Supabase endpoint and legal copy remain intact.

Homepage categories describe supported tattoo projects. They are not a substitute for a real portfolio; add only genuine, approved tattoo photographs when available.

## Release checklist

1. Check homepage, enquiry and privacy pages at 320px, 390px, 768px and desktop widths.
2. Test header/footer anchors, mobile menu, keyboard access and enquiry CTAs.
3. Test all three enquiry form stages in a safe environment; do not send dummy customer enquiries to production.
4. Verify Vercel preview build and production domain mapping.
5. Confirm real portfolio imagery before public launch.
6. The homepage retains `noindex, nofollow` from its previous blank state. Review that directive when the website is ready for search.

The enquiry submission script, Supabase endpoint, existing consent text and privacy notice body should remain unchanged by visual-only edits.
