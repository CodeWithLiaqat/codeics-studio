-- Codeics — leads table. Run in the Supabase SQL editor or via supabase db push.
create extension if not exists pgcrypto;

create table if not exists public.leads (
  id               uuid primary key default gen_random_uuid(),
  name             text not null check (char_length(name) between 2 and 120),
  email            text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  service_category text not null check (service_category in (
                     '3d-interactive-web','ai-web-apps','enterprise-wordpress',
                     'ui-ux-design-systems','web-performance-audits','other')),
  budget_range     text not null check (budget_range in ('1k-3k','3k-5k','5k-10k','10k-plus')),
  timeline         text not null check (timeline in ('asap','1-2-months','3-plus-months','exploring')),
  message          text not null check (char_length(message) between 10 and 4000),
  source           text default 'website',
  status           text not null default 'new' check (status in ('new','contacted','qualified','won','lost')),
  created_at       timestamptz not null default now()
);

comment on table public.leads is 'Inbound project enquiries from codeics.me (LeadForm + AIAgent).';

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_service_category_idx on public.leads (service_category);
create index if not exists leads_email_lower_idx on public.leads (lower(email));

alter table public.leads enable row level security;

-- Anonymous visitors may only insert. No select/update/delete for anon.
drop policy if exists "anon can submit leads" on public.leads;
create policy "anon can submit leads"
  on public.leads for insert
  to anon
  with check (status = 'new');

-- Signed-in studio staff (authenticated role) can manage leads.
drop policy if exists "authenticated can read leads" on public.leads;
create policy "authenticated can read leads"
  on public.leads for select
  to authenticated
  using (true);

drop policy if exists "authenticated can update leads" on public.leads;
create policy "authenticated can update leads"
  on public.leads for update
  to authenticated
  using (true)
  with check (true);

-- Lock down column privileges so anon cannot escalate via PostgREST.
revoke all on public.leads from anon;
grant insert (name, email, service_category, budget_range, timeline, message, source) on public.leads to anon;
grant select, update on public.leads to authenticated;

-- Basic abuse throttle: max 5 submissions per email per hour.
create or replace function public.leads_rate_limit()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.leads
      where lower(email) = lower(new.email)
        and created_at > now() - interval '1 hour') >= 5 then
    raise exception 'Too many submissions. Please try again later.' using errcode = 'P0001';
  end if;
  return new;
end $$;

drop trigger if exists leads_rate_limit_trg on public.leads;
create trigger leads_rate_limit_trg
  before insert on public.leads
  for each row execute function public.leads_rate_limit();
