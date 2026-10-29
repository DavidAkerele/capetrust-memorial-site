-- Supabase's optional automatic RLS trigger needs no direct API access.
-- Some projects do not enable that feature, so keep this migration portable.
do $$
begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    revoke all on function public.rls_auto_enable() from public, anon, authenticated;
  end if;
end;
$$;
