create table if not exists public.memorial_submissions (
  id uuid primary key default gen_random_uuid(),
  submitter_name text not null check (length(trim(submitter_name)) between 2 and 160),
  submitter_relationship text not null check (length(trim(submitter_relationship)) between 2 and 120),
  submitter_email text not null check (length(trim(submitter_email)) between 3 and 254),
  submitter_phone text not null check (length(trim(submitter_phone)) between 5 and 40),
  full_name text not null check (length(trim(full_name)) between 2 and 160),
  title text not null default '' check (length(title) <= 160),
  date_of_birth text not null default '' check (length(date_of_birth) <= 80),
  date_of_death text not null check (length(trim(date_of_death)) between 2 and 80),
  age integer check (age between 0 and 130),
  summary_quote text not null default '' check (length(summary_quote) <= 300),
  life_story text not null check (length(trim(life_story)) between 2 and 10000),
  family_note text not null default '' check (length(family_note) <= 3000),
  services jsonb not null default '[]'::jsonb check (jsonb_typeof(services) = 'array'),
  status text not null default 'pending' check (status in ('pending', 'published', 'declined')),
  published_slug text references public.memorials(slug) on delete set null,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create index if not exists memorial_submissions_status_created_idx
  on public.memorial_submissions (status, created_at desc);

alter table public.memorial_submissions enable row level security;

drop policy if exists "Visitors can submit memorials for review" on public.memorial_submissions;
create policy "Visitors can submit memorials for review"
  on public.memorial_submissions for insert to anon, authenticated
  with check (status = 'pending' and published_slug is null and reviewed_at is null);

drop policy if exists "Admins can review memorial submissions" on public.memorial_submissions;
create policy "Admins can review memorial submissions"
  on public.memorial_submissions for select to authenticated
  using (exists (select 1 from public.site_admins where user_id = (select auth.uid())));

drop policy if exists "Admins can update memorial submissions" on public.memorial_submissions;
create policy "Admins can update memorial submissions"
  on public.memorial_submissions for update to authenticated
  using (exists (select 1 from public.site_admins where user_id = (select auth.uid())))
  with check (exists (select 1 from public.site_admins where user_id = (select auth.uid())));

revoke all on public.memorial_submissions from anon, authenticated;
grant insert (
  submitter_name, submitter_relationship, submitter_email, submitter_phone,
  full_name, title, date_of_birth, date_of_death, age, summary_quote,
  life_story, family_note, services
) on public.memorial_submissions to anon, authenticated;
grant select, update (status, published_slug, reviewed_at)
  on public.memorial_submissions to authenticated;
