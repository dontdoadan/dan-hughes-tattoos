# 2027 Portfolio Projects — Campaign Pack

**Owner:** Daniel Hughes Tattoos  
**Campaign:** 10 custom tattoo commissions for 2027  
**Landing page:** https://danhughestattoos.co.uk/2027-portfolio-projects/  
**Status:** Preview implementation / pre-launch approval required

## Campaign proposition

Ten selected custom tattoo projects designed to produce exceptional portfolio work. The offer is not a discount sale: it is a limited commission series with a documented scope and a fixed selected-project price.

## Commercial model

| Size | Minimum estimate | Selected fixed price | Standard estimate (£400/day) | Non-selected estimate (£350/day) |
|---|---:|---:|---:|---:|
| Quarter sleeve | 1.5 days | £450 | £600 | £525 |
| Half sleeve | 3 days | £900 | £1,200 | £1,050 |
| Full sleeve | 6 days | £1,800 | £2,400 | £2,100 |

Proposed portfolio mix: 3 quarter sleeves, 4 half sleeves and 3 full sleeves.

- Contracted revenue if all ten are booked: **£10,350**.
- Minimum estimated tattooing time: **34.5 days**.
- Deposits at 50% if all ten are booked: **£5,175**.
- Remaining contracted balances: **£5,175**.

These are scenario totals, not forecasts or guaranteed sales. Actual time may exceed the minimum estimates because the selected price covers completion of the original agreed scope.

## Important offer boundary

The fixed price includes additional tattooing time reasonably required to complete the original agreed design, placement and coverage. It does not include new coverage, a different body area, a replacement concept, or substantial client-requested changes outside the agreed scope. Any variation must be agreed and priced in writing before the extra work begins.

Do not advertise this as unlimited changes or unlimited tattoos. The promise is completion of the agreed commission, not an unlimited scope.

## Project files

- `project-catalogue.csv` — the ten proposed project directions.
- `campaign-content.md` — launch copy, carousel, Reel, Stories, FAQs and paid copy.
- `selection-scorecard.md` — scoring rubric and balancing rules.
- `booking-agreement-draft.md` — client agreement draft for solicitor review.
- `image-permission-form.md` — separate photography/video consent record.
- `assets/` — editable SVG social graphic source files.
- `content-production-plan.md` — photography, video and publishing workflow.
- `tracker-guide.md` — operational database, KPIs and review process.
- `launch-checklist.md` — final release gates.

## Current implementation

The landing page and application form have been added to the campaign branch. The form writes to a dedicated campaign application table and stores uploaded reference images in a private Supabase Storage bucket. It does not take payments or create bookings.

The campaign database includes projects, applications, assessments, bookings, payments, sessions and content records. Internal data is restricted to service-role access. The operational dashboard views are available to authorised database administrators.

## Launch blockers / owner decisions

1. Add and approve authentic portfolio photographs. The ten descriptions are concepts, not finished tattoo work.
2. Confirm the final project mix and whether each project scope/placement is commercially feasible.
3. Review the booking agreement, deposit and cancellation wording with a UK solicitor before taking deposits.
4. Confirm the privacy retention period and who is authorised to access application data.
5. Configure owner notifications for new applications. The form stores submissions, but automated email alerts are not configured.
6. Complete a genuine end-to-end browser test with a clearly marked internal test application, then remove the test record and test uploads.
7. Review the live privacy notice and remove the campaign page's temporary noindex directive only when the production launch is approved.

No public deployment, client outreach or payment collection is authorised by this pack.
