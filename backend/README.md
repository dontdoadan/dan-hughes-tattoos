# Daniel Hughes Tattoos — Private Enquiry Intake

## Architecture

- `enquire.html`: responsive, three-stage public tattoo commission form.
- `privacy.html`: enquiry-specific privacy notice.
- `backend/tattoo-enquiry-intake/index.ts`: dedicated public Supabase Edge Function.
- `backend/schema.sql`: migration applied on 28 October 2026.
- Database: existing Supabase UK project, dedicated `public.tattoo_enquiries` and `public.tattoo_enquiry_attempts` tables. This reuses infrastructure but **does not** share INKSIGHTS contacts, CRM, reports, automations, or deal records. A dedicated project can be provisioned later for stronger tenancy isolation.

## Enquiry flow

Website CTA → `/enquire.html` → validate (client/server) → rate-limit + honeypot → private server-side insert → confirmation **only on success**.

The database rejects anonymous access. The Edge Function uses server-only Supabase credentials. The frontend contains no database secret. Visitor submissions cannot query the table.

## Recorded fields

Request ID, date, name, email, optional phone and Instagram, preferred contact, tattoo category, placement, project size, creative brief, reference links, budget range, desired start window, age and privacy acknowledgement, optional marketing consent, source path, UTM source/medium/campaign, internal status. No actual deposit or booking is created.

## Viewing submissions

Supabase dashboard → Table Editor → `public.tattoo_enquiries`; filter `status = new` and sort `created_at` descending. Service-role-only access means a new protected admin view requires a separate authenticated server implementation.

## Operational tasks before paid campaigns

1. Complete a **genuine browser submission** on the deployed site and confirm the row in `tattoo_enquiries`. Delete any clearly labelled internal test row after confirmation.
2. Add an owner notification or secure inbox dashboard; form acceptance does not currently email the artist.
3. Configure CAPTCHA (Cloudflare Turnstile recommended), retention cleanup, and monitoring if sustained traffic or abuse appears.
4. Add authentic portfolio photography to the landing page. Its existing image placeholders remain, and the homepage currently contains a noindex directive.
5. Review the privacy notice against your actual business retention practices and legal requirements.

## Pricing copy

Day session £400. 50% deposit to confirm, at least 7 days before the session. These are **not payment fields**; no deposit is taken through the enquiry form.

## Smoke-test scenarios

- Required project type, placement, description, project-size and contact fields cannot be skipped.
- Preferred contact phone/Instagram requires a matching contact handle.
- Age and privacy acknowledgement must be confirmed; marketing opt-in is optional.
- Submit returns a confirmation only when `ok: true` is received.
- Invalid email, JSON, origin, missing consent and overlong payloads fail server-side.
- Reuse a request ID to test idempotency.
- Direct client reads/inserts into enquiry tables must remain denied; check grants and RLS after future migrations.
