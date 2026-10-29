-- Keep anonymous and authenticated reads separate so anonymous visitors never
-- need permission to inspect the administrator membership table.
drop policy if exists "Anyone can read approved condolences" on public.condolences;
drop policy if exists "Admins can review pending condolences" on public.condolences;
drop policy if exists "Visitors read approved and admins review condolences" on public.condolences;

create policy "Visitors read approved condolences"
  on public.condolences for select to anon
  using (approved);

create policy "Signed-in users read approved and admins review condolences"
  on public.condolences for select to authenticated
  using (
    approved or
    (select exists (
      select 1 from public.site_admins
      where user_id = (select auth.uid())
    ))
  );
