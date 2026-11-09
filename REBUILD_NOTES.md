# Daniel Hughes Tattoos — editorial rebuild preview

This branch is a redesign candidate. It must not be merged or promoted to the production domain until it has been visually reviewed, its imagery verified for publication, and the enquiry function safely tested.

## What changed
- Editorial near-black / ivory art direction, designed specifically around a tattoo portfolio rather than SaaS-like cards
- New responsive homepage, dedicated selected-work page and 2027 project landing page
- Four images sourced from the account's Google Drive tattoo_photos folder (filenames 00000–00003). **Confirm these are Daniel's tattoo work and authorised for public website use before release**
- Existing three-step tattoo enquiry logic and Supabase endpoint are preserved
- Enquiry and privacy page colours aligned to the new editorial direction
- Homepage search indexing correction, sitemap, robots.txt and favicon

## Release blockers / next improvements
- Confirm rights, ownership and desired ordering of four portfolio images
- Compress the PNG images to responsive WebP or AVIF variants (currently original PNG assets)
- Run Lighthouse and keyboard/assistive technology checks against the preview
- Run an authorised end-to-end enquiry test in a controlled manner and verify database record / notification
- Verify campaign-project guarantee wording and booking terms before making offers publicly
- Confirm mobile real-device experience and check Google indexing after launch
- Add genuine reviews, healed images and richer project case studies only when verified assets are available
- Keep this branch isolated from the live custom domain; do not auto-merge
