# CapeTrust Funeral Services

The public website and content dashboard for CapeTrust Funeral Services and Garden of Peace Memorial Park.

## Run locally

Requires Node.js 22 or later.

```bash
npm ci
npm run dev
```

Open the local address printed by Vite. Run `npm run check` before deploying.

## Shared backend setup

The dashboard uses the dedicated **CapeTrust Funerals** Supabase project (`uqaxleoxqdfsosnwkrgl`) in the CapeTrust Funerals organization, hosted in London. The app intentionally has no default administrator password and will not show fabricated memorial profiles if the backend is absent.

1. Use the existing CapeTrust project. For a fresh project, apply the SQL files in `supabase/migrations` in filename order. Do not reuse another site's database.
2. Create an administrator through Supabase Authentication. Public signups are disabled on the CapeTrust project; keep them disabled unless the organization explicitly needs them.
3. Add that user's ID to the membership table using the Supabase SQL editor:

   ```sql
   insert into public.site_admins (user_id) values ('USER_UUID_FROM_AUTH_USERS');
   ```

4. Copy `.env.example` to `.env.local` and set the project's URL and **publishable** key. Do not put a secret key or service role key in a `VITE_` variable. The local checkout is already configured; `.env.local` is ignored by Git. `.env.production` carries the same public values for production builds.
5. Rebuild the deployment and verify sign-in and one published content change from a second device. Deployment environment variables can override `.env.production` if the project is moved later.

The migration creates public site content and memorial tables, administrator membership, a moderated condolence queue, candle counting, and a 5 MB image storage bucket. Database row policies allow only listed administrators to edit published content. Condolences remain hidden until an administrator approves them.

## Content workflow

- Visit `/admin` and sign in with the administrator's email and password.
- Edit site sections in the dashboard. The status in the header shows whether a change was saved.
- Create or edit memorials under **Obituaries & Tributes**. Review condolence submissions there before approving them.
- Families can submit memorial details from `/obituaries/create`; that page prepares an email draft for staff review. It does not publish directly.
- Use **Backup, Export & Reset** to download site content as JSON. Existing browser-only content from older builds can be exported from the browser's local storage key `capetrust_cms_data_v1` and imported through the dashboard after checking it. Older browser-only memorials should be reviewed and recreated as real records; they are not imported automatically because the previous build included sample profiles.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm audit --audit-level=high
```

After building, run `npm run preview` to check the Cloudflare worker output locally.

The site uses TanStack Start, React 19, TypeScript, Tailwind CSS, and Supabase for shared content, authentication, and media. The public pages render from the shared data source when the backend is configured. Without it, the static CapeTrust site remains available; admin sign-in and memorial interactions are unavailable.

## Deployment note

This repository is connected to Lovable. Avoid force pushing or rewriting published Git history. Commit changes normally so they sync into the Lovable editor.
