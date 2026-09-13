-- Portfolio contact inquiries (run in Supabase SQL editor)
create table if not exists public.inquiries (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  company text,
  message text not null,
  source text default 'portfolio',
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

create policy "Allow public inserts"
  on public.inquiries
  for insert
  to anon
  with check (true);
