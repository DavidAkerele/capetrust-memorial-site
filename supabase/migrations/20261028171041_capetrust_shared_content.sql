create schema if not exists private;

create table public.site_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.site_admins enable row level security;
create policy "Admins can identify their own membership" on public.site_admins
  for select to authenticated using (user_id = (select auth.uid()));
revoke all on public.site_admins from anon, authenticated;
grant select on public.site_admins to authenticated;

create table public.site_content (
  id text primary key check (id = 'main'),
  content jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
create policy "Anyone can read published site content" on public.site_content
  for select to anon, authenticated using (true);
create policy "Admins can create site content" on public.site_content
  for insert to authenticated
  with check (exists (select 1 from public.site_admins where user_id = (select auth.uid())));
create policy "Admins can update site content" on public.site_content
  for update to authenticated
  using (exists (select 1 from public.site_admins where user_id = (select auth.uid())))
  with check (exists (select 1 from public.site_admins where user_id = (select auth.uid())));
revoke all on public.site_content from anon, authenticated;
grant select on public.site_content to anon, authenticated;
grant insert, update on public.site_content to authenticated;

create table public.memorials (
  slug text primary key,
  content jsonb not null,
  candles_count integer not null default 0 check (candles_count >= 0),
  created_at timestamptz not null default now()
);
alter table public.memorials enable row level security;
create policy "Anyone can read memorials" on public.memorials
  for select to anon, authenticated using (true);
create policy "Admins can publish memorials" on public.memorials
  for insert to authenticated
  with check (exists (select 1 from public.site_admins where user_id = (select auth.uid())));
create policy "Admins can update memorials" on public.memorials
  for update to authenticated
  using (exists (select 1 from public.site_admins where user_id = (select auth.uid())))
  with check (exists (select 1 from public.site_admins where user_id = (select auth.uid())));
create policy "Admins can remove memorials" on public.memorials
  for delete to authenticated
  using (exists (select 1 from public.site_admins where user_id = (select auth.uid())));
revoke all on public.memorials from anon, authenticated;
grant select on public.memorials to anon, authenticated;
grant insert (slug, content), update, delete on public.memorials to authenticated;

create table public.condolences (
  id uuid primary key default gen_random_uuid(),
  slug text not null references public.memorials(slug) on delete cascade,
  name text not null check (length(trim(name)) between 2 and 120),
  relationship text not null default 'Family Friend' check (length(relationship) <= 120),
  message text not null check (length(trim(message)) between 2 and 3000),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);
create index condolences_slug_approved_created_idx on public.condolences (slug, approved, created_at desc);
alter table public.condolences enable row level security;
create policy "Anyone can read approved condolences" on public.condolences
  for select to anon, authenticated using (approved);
create policy "Admins can review pending condolences" on public.condolences
  for select to authenticated
  using (exists (select 1 from public.site_admins where user_id = (select auth.uid())));
create policy "Visitors can submit pending condolences" on public.condolences
  for insert to anon, authenticated with check (approved = false);
create policy "Admins can moderate condolences" on public.condolences
  for update to authenticated
  using (exists (select 1 from public.site_admins where user_id = (select auth.uid())))
  with check (exists (select 1 from public.site_admins where user_id = (select auth.uid())));
create policy "Admins can remove condolences" on public.condolences
  for delete to authenticated
  using (exists (select 1 from public.site_admins where user_id = (select auth.uid())));
revoke all on public.condolences from anon, authenticated;
grant select on public.condolences to anon, authenticated;
grant insert (slug, name, relationship, message) on public.condolences to anon, authenticated;
grant update (approved), delete on public.condolences to authenticated;

create table private.candle_lights (
  slug text not null references public.memorials(slug) on delete cascade,
  visitor_id uuid not null,
  created_at timestamptz not null default now(),
  primary key (slug, visitor_id)
);
alter table private.candle_lights enable row level security;

create function private.light_memorial_candle(memorial_slug text, visitor_id uuid)
returns integer language plpgsql security definer set search_path = pg_catalog
as $$
declare
  inserted integer;
  total integer;
begin
  insert into private.candle_lights (slug, visitor_id)
  values (memorial_slug, visitor_id)
  on conflict do nothing;
  get diagnostics inserted = row_count;
  if inserted = 1 then
    update public.memorials set candles_count = candles_count + 1
    where slug = memorial_slug;
  end if;
  select candles_count into total from public.memorials where slug = memorial_slug;
  if total is null then
    raise exception 'Memorial not found';
  end if;
  return total;
end;
$$;

create function public.light_memorial_candle(memorial_slug text, visitor_id uuid)
returns integer language sql security invoker set search_path = pg_catalog
as $$
  select private.light_memorial_candle(memorial_slug, visitor_id);
$$;
revoke all on function private.light_memorial_candle(text, uuid) from public;
revoke all on function public.light_memorial_candle(text, uuid) from public;
grant usage on schema private to anon, authenticated;
grant execute on function private.light_memorial_candle(text, uuid) to anon, authenticated;
grant execute on function public.light_memorial_candle(text, uuid) to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media', 'site-media', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do nothing;

create policy "CapeTrust admins can upload site media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'site-media' and exists (select 1 from public.site_admins where user_id = (select auth.uid())));
create policy "CapeTrust admins can update site media" on storage.objects
  for update to authenticated
  using (bucket_id = 'site-media' and exists (select 1 from public.site_admins where user_id = (select auth.uid())))
  with check (bucket_id = 'site-media' and exists (select 1 from public.site_admins where user_id = (select auth.uid())));
create policy "CapeTrust admins can delete site media" on storage.objects
  for delete to authenticated
  using (bucket_id = 'site-media' and exists (select 1 from public.site_admins where user_id = (select auth.uid())));
