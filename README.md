# Daniel Hughes Tattoos

Source repository for [danhughestattoos.co.uk](https://danhughestattoos.co.uk).

## Current state: blank canvas

The homepage (`index.html`) has been reset to a minimal, responsive, light-mode HTML template:

- Plain white background with a small Daniel Hughes Tattoos wordmark.
- Empty `<main>` region for future sections.
- Simple copyright footer.
- No navigation menu, hero, portfolio, calls to action, motion or external CSS/JS.
- No external image or font dependencies.

The page is intentionally blank, not a coming-soon landing page. Start a new design from the `<main>` element. The default entrypoint does not import or depend on any previous design system.

## Preservation

The original `enquire.html` and `privacy.html` routes, existing enquiry intake backend, and their shared legacy assets remain in the repository. They are **not linked from the blank homepage** and are not changed by this reset. The previous homepage design remains recoverable from Git history and the design branches.

The homepage retains the existing `noindex, nofollow` setting so that it is not intentionally submitted for indexing while it is unfinished.

## Deployment

Vercel deploys the production website from the `main` branch. Review a preview branch before releasing future visual changes.

## Rebuild checklist

1. Define brand identity, typography and visual direction.
2. Define navigation and page hierarchy.
3. Use approved original tattoo photography once available.
4. Connect and visually test the existing enquiry flow.
5. Review accessibility, responsive behaviour, SEO and the indexing directive before launch.
