# Migrating WordPress off Local by Flywheel → Hostinger

This replaces the local-only `http://orourke-audio.local` backend with a public
one on Hostinger, using **All-in-One WP Migration** so nothing gets recreated
by hand. Do these in order.

## 1. Sign up for Hostinger

Pick any WordPress hosting plan (their entry plan is around $3/month on a
long-term term). During setup:

- Choose the WordPress one-click install
- You can use a Hostinger-provided temporary domain/subdomain for now, or
  point a subdomain of your own (e.g. `cms.orourkeaudio.ca`) at it later.
  The WordPress backend does **not** need to live on the same domain as the
  React frontend on Vercel — it just needs to be a public HTTPS URL.
- Hostinger includes free SSL. Confirm the new site loads over `https://`
  before moving on — mixed content (http API on an https page) is what broke
  things last time.

## 2. Export the current site

On the Local by Flywheel site (`http://orourke-audio.local/wp-admin`):

1. Install the free **All-in-One WP Migration** plugin
2. Go to **All-in-One WP Migration → Export**
3. Export to **File**
4. This downloads a `.wpress` file containing the database, all plugins
   (ACF, CPT UI, Contact Form 7), the `portfolio` and `service` post types,
   every ACF field value, and the media library

If the export is larger than 512MB (likely, given the video files), the free
importer can't bring it in as one piece. In that case either:
- compress/trim the video files in the Media Library before exporting, or
- do the export/import for everything except `wp-content/uploads`, then copy
  the uploads folder separately over SFTP (Hostinger gives you SFTP access
  in hPanel)

## 3. Import into Hostinger

On the new Hostinger WordPress site's wp-admin:

1. Install the same **All-in-One WP Migration** plugin
2. Go to **Import**, select the `.wpress` file (or **Import from URL** if you
   uploaded it to the server via SFTP first, since large files can time out
   through the browser upload)
3. The plugin automatically rewrites every reference to
   `http://orourke-audio.local` to the new site's URL — this is what fixes
   both the portfolio items and the hero video link
4. Log in with your old admin credentials (the import brings those over too)
   and spot-check a couple of portfolio items in wp-admin

## 4. Re-check CORS

`WORDPRESS_SETUP.md` section 3 has a CORS snippet allowing
`http://localhost:3000` and `https://orourkeaudio.com`. Update the allowed
list to match your real production domain (`https://www.orourkeaudio.ca`) and
add the Vercel preview domain if you use preview deployments.

## 5. Update the frontend's environment variables

Two separate settings, don't mix them up:

- **Local dev** (`website/.env`, not committed): keep pointing at
  `http://orourke-audio.local` — Local by Flywheel stays your dev environment
- **Production** (Vercel → Project → Settings → Environment Variables): set

```
VITE_WP_API_URL=https://<your-new-wp-domain>/wp-json
VITE_HERO_VIDEO_URL=https://<your-new-wp-domain>/wp-content/uploads/.../reel.mp4
```

Get the exact hero video URL from the Media Library on the new site (it will
differ from the old local path).

## 6. Redeploy and verify

1. Trigger a new Vercel deployment (env var changes don't apply
   retroactively to old builds)
2. Visit `https://<your-new-wp-domain>/wp-json/wp/v2/portfolio` directly in a
   browser — confirm it returns your items over `https`
3. Visit the live site and confirm the Work page populates and the hero video
   plays
