-- Daniel Hughes Tattoos enquiry backend.
-- Applied to existing Supabase project as migration create_private_daniel_hughes_tattoo_enquiries.
-- Isolated tattoo-only data, no CRM automation or INKSIGHTS joins.
create table if not exists public.tattoo_enquiries (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null unique,
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 254),
  phone text,
  instagram_handle text,
  preferred_contact text not null check (preferred_contact in ('email','phone','instagram')),
  project_type text not null check (project_type in ('full-sleeve','half-sleeve','leg-sleeve','back-piece','chest-piece','other-large-scale','smaller-piece','unsure')),
  placement text not null check (char_length(placement) between 2 and 120),
  sessions text not null check (sessions in ('single','multiple','unsure')),
  description text not null check (char_length(description) between 15 and 3000),
  reference_links text,
  budget_range text,
  timeframe text,
  marketing_consent boolean not null default false,
  age_confirmed boolean not null default true check(age_confirmed = true),
  privacy_accepted boolean not null default true check(privacy_accepted = true),
  source_page text not null default '/enquire.html',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  status text not null default 'new' check(status in ('new','contacted','qualified','quoted','deposit_requested','booked','closed','spam')),
  is_test boolean not null default false
);
create index if not exists tattoo_enquiries_created_at_idx on public.tattoo_enquiries(created_at desc);
create index if not exists tattoo_enquiries_status_idx on public.tattoo_enquiries(status,created_at desc);
alter table public.tattoo_enquiries enable row level security;
revoke all on public.tattoo_enquiries from public, anon, authenticated;
grant select, insert, update, delete on public.tattoo_enquiries to service_role;
comment on table public.tattoo_enquiries is 'Daniel Hughes Tattoos private prospect enquiries. Access restricted to service-role backend; never synchronise with INKSIGHTS CRM.';

create table if not exists public.tattoo_enquiry_attempts (
 id bigint generated always as identity primary key,
 created_at timestamptz not null default now(),
 fingerprint text not null,
 route text not null default 'tattoo-enquiry-intake'
);
create index if not exists tattoo_enquiry_attempts_window_idx on public.tattoo_enquiry_attempts(fingerprint, created_at desc);
alter table public.tattoo_enquiry_attempts enable row level security;
revoke all on public.tattoo_enquiry_attempts from public, anon, authenticated;
grant select, insert, delete on public.tattoo_enquiry_attempts to service_role;
grant usage, select on sequence public.tattoo_enquiry_attempts_id_seq to service_role;
comment on table public.tattoo_enquiry_attempts is 'Pseudonymous short-window anti-spam audit. Retain no raw visitor IP in this table.';
