# Campaign Tracker — Data Model and Operating Guide

## Database implementation

The 2027 campaign uses dedicated tattoo-only tables in the existing Supabase project. The tables are separate from INKSIGHTS CRM and are not joined to INKSIGHTS leads, contacts, reports or deals.

### Core tables

| Table | Purpose |
|---|---|
| `tattoo_portfolio_2027_projects` | The ten project definitions, sizes, minimum days and prices |
| `tattoo_portfolio_2027_applications` | Private applicant details, brief, consent and uploaded reference paths |
| `tattoo_portfolio_2027_assessments` | Seven weighted selection scores and decision |
| `tattoo_portfolio_2027_bookings` | Accepted project, agreed fixed price, deposit and booking status |
| `tattoo_portfolio_2027_payments` | Deposit, instalments, final payments and refunds |
| `tattoo_portfolio_2027_sessions` | Session dates, start/end time, breaks and actual tattooing minutes |
| `tattoo_portfolio_2027_content` | Content asset register, permissions and publishing status |
| `tattoo_portfolio_2027_attempts` | Pseudonymous anti-spam rate-limit records |

### Views

- `tattoo_portfolio_2027_campaign_dashboard` — campaign-level KPIs.
- `tattoo_portfolio_2027_project_summary` — applications and bookings by project.
- `tattoo_portfolio_2027_application_scores` — applicant details with weighted score.
- `tattoo_portfolio_2027_booking_financials` — revenue collected, outstanding balance, tattooing hours and collected revenue per tattooing hour.

## Access and privacy

- Application and operational tables have Row Level Security enabled.
- Anonymous and authenticated client roles have no direct table access.
- The public form writes through a server-side Edge Function.
- Reference images are stored in a private Storage bucket.
- The Edge Function uses server-side credentials; no service key is exposed in the page.
- No HubSpot or INKSIGHTS CRM sync is configured.
- The application form does not take payments or create bookings.

## Workflow

1. New application is saved with status `new`.
2. Review brief and reference images; update status to `under_review`.
3. Score all seven criteria and record the decision.
4. Mark strong candidates `qualified`, `shortlisted`, `selected` or `reserve`.
5. Once a client accepts the written scope, create a booking record with the project key and fixed price.
6. Record the deposit and every subsequent payment as separate payment rows.
7. Record each tattoo session with start/end timestamps and break minutes.
8. Record content assets and their permission status before publication.
9. Mark a booking completed only when the agreed scope is complete and payment is reconciled.

## KPI definitions

- **Enquiries/applications:** count of application rows.
- **Qualified applications:** statuses qualified, shortlisted, selected or reserve.
- **Selected:** status selected.
- **Confirmed bookings:** booking status deposit_paid, booked, in_progress or completed.
- **Contracted revenue:** sum of agreed fixed prices for non-cancelled bookings.
- **Revenue collected:** payments marked paid, net of recorded refunds.
- **Balance outstanding:** agreed price less net paid amount.
- **Actual tattooing hours:** sum of session minutes less breaks, divided by 60.
- **Collected £ per tattooing hour:** net collected revenue divided by actual tattooing hours.

Do not confuse contracted revenue with cash collected. Deposits are part-payments, not additional revenue.

## Admin access

Use the Supabase dashboard for the project and the Table Editor / SQL Editor. The tables are service-role restricted, so public website users cannot browse applications. Keep admin access limited to the business owner and any specifically authorised operator.

## Operational SQL

Campaign-level snapshot:

```sql
select * from public.tattoo_portfolio_2027_campaign_dashboard;
```

Project-level application/booking summary:

```sql
select * from public.tattoo_portfolio_2027_project_summary
order by sort_order;
```

Applicant review queue:

```sql
select * from public.tattoo_portfolio_2027_application_scores
where status in ('new','under_review','qualified','shortlisted','reserve')
order by total_score desc nulls last, created_at asc;
```

Booking economics:

```sql
select * from public.tattoo_portfolio_2027_booking_financials;
```

## Important missing automation

The form stores submissions, but no owner email alert or authenticated admin dashboard is currently configured. Until that is added, check the Supabase application table regularly. Do not spend on paid acquisition until the owner notification and follow-up process has been tested.
