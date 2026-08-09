# WordPress Setup Guide — O'Rourke Audio

This guide covers everything needed to configure the headless WordPress backend
that powers the React frontend.

---

## 1. Local by Flywheel Setup

1. Download and install [Local by Flywheel](https://localwp.com/)
2. Click **+ Create a new site**
3. Site name: `orourke-audio`
   - Local will create the URL: `http://orourke-audio.local`
4. Choose **Preferred** environment (PHP 8.x, MySQL 8, Nginx)
5. Set admin username/password (save these)
6. Click **Start site** → then **Open site** to confirm it loads

> The Vite proxy in `vite.config.js` is already pointed at `http://orourke-audio.local`.
> If you choose a different site name, update the `target` in `vite.config.js`.

---

## 2. Required Plugins

Install these from the WordPress admin (`Plugins → Add New`):

| Plugin | Purpose |
|--------|---------|
| **Advanced Custom Fields (ACF)** | Add structured data fields to custom post types |
| **Custom Post Type UI (CPT UI)** | Register custom post types without code |
| **Contact Form 7** | REST API-based contact form submission |
| **WP CORS** (or add headers manually) | Allow the Vite dev server to call the WP REST API |

---

## 3. Enable CORS for Local Development

The React app runs on `http://localhost:3000` and the WP API is on
`http://orourke-audio.local`. You need to allow cross-origin requests.

Add this to your theme's `functions.php` (or a custom plugin):

```php
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        $allowed = ['http://localhost:3000', 'https://orourkeaudio.com'];
        $origin  = $_SERVER['HTTP_ORIGIN'] ?? '';
        if (in_array($origin, $allowed, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
        }
        return $value;
    });
});
```

---

## 4. Custom Post Type: `portfolio`

In CPT UI, create a new post type with these settings:

| Setting | Value |
|---------|-------|
| Post Type Slug | `portfolio` |
| Plural Label | `Portfolio Items` |
| Singular Label | `Portfolio Item` |
| Show in REST API | ✅ Yes |
| REST API base slug | `portfolio` |
| Supports | Title, Excerpt, Thumbnail |

### Custom Taxonomy: `portfolio_category`

| Setting | Value |
|---------|-------|
| Taxonomy Slug | `portfolio_category` |
| Attached to | `portfolio` |
| Show in REST API | ✅ Yes |
| REST base | `portfolio_category` |

**Suggested categories to create:**
- Sound Design
- Foley & SFX
- Original Score
- Audio Editing & Mix

### ACF Fields for `portfolio`

Create a field group called **Portfolio Fields**, attach to Post Type = `portfolio`:

| Field Label | Field Name | Type | Notes |
|-------------|------------|------|-------|
| Media Type | `media_type` | Select | Choices: `audio`, `video`. Default `audio`. Controls which player renders on the frontend. |
| Audio URL | `audio_url` | File | Self-hosted MP3, uploaded to the Media Library. Used when Media Type = `audio`. Return format: File URL. |
| Video URL | `video_url` | File | Self-hosted MP4, uploaded to the Media Library. Used when Media Type = `video`. Return format: File URL. |
| Thumbnail | `thumbnail` | Image | Still image shown on the Work page monitor. **Required for audio-only pieces**, which have no video frame of their own. Return format: Image URL (an Image Array also works). Landscape images around 16:9 crop best. |
| Description | `description` | Textarea | Short project description |
| Year | `year` | Number | 4-digit year |
| Category | `category` | Text | Display category label |
| Featured | `featured` | True/False | Show on homepage if true |

### Setting a Featured Image on a portfolio item

The Work page monitor shows a still image for any piece that has no video of
its own. The quickest way to supply one is the built in Featured Image,
which needs no ACF configuration.

1. Go to `http://orourke-audio.local/wp-admin`
2. In the sidebar, click **Portfolio Items**, then click the item to edit
3. In the right hand sidebar, open the **Post** tab and find the
   **Featured image** panel. In the classic editor it sits in the lower right
   column instead.
4. Click **Set featured image**
5. Either drag a file into the **Upload files** tab or pick one from the
   **Media Library** tab
6. Fill in the **Alt Text** box, since the frontend passes it through for
   screen readers
7. Click **Set featured image**, then click **Update** on the post

Repeat for each item. Landscape images work best: the monitor crops to 16:9,
so aim for 1920x1080 or at minimum 1280x720, saved as JPG or WebP.

**If the Featured image panel is missing**, the post type is not declaring
support for it:

1. Go to **CPT UI → Add/Edit Post Types**
2. Select `portfolio` from the dropdown
3. Scroll to **Supports** and tick **Featured Image**
4. Click **Save Post Type**

**To confirm it worked**, open this URL in a browser:

```
http://orourke-audio.local/wp-json/wp/v2/portfolio?_fields=id,title,featured_media
```

Every item should now report a `featured_media` value other than `0`. The
frontend reads the image through `_embed`, which `getPortfolioItems()` already
requests, so no code change is needed.

### Thumbnail set in wp-admin but the monitor still shows a red gradient

This is the one failure that looks like a frontend bug and is not. WordPress
refuses to serve an attachment through the **public** REST API when that
attachment's parent post is trashed or unpublished, and an attachment's parent
is simply whichever post it was first uploaded from. Upload an image while
drafting one piece, trash that draft, then reuse the same image as the featured
image on a different piece, and the API returns `rest_forbidden` to logged-out
visitors while still looking perfectly correct in wp-admin.

**Confirm it in one step.** Open a private/incognito window (so you are logged
out) and visit:

```
http://orourke-audio.local/wp-json/wp/v2/portfolio?_embed
```

Find the item and look at `_embedded → wp:featuredmedia → [0]`. A healthy item
has a `source_url`. A broken one has `"code": "rest_forbidden"`. The frontend
also logs a `[portfolio]` console warning naming the item whenever it hits this.

**Fix it.** Detach the image so it no longer depends on a dead parent:

1. **Media → Library**, switch to list view
2. Click the image, and look at the **Uploaded to** column
3. If it points at a trashed or draft post, click **Detach**

Detached images are served publicly regardless of what happens to any post.

### Optional: make featured images immune to this permanently

The detach step above cures one image. To stop the problem happening at all,
have WordPress hand the frontend a plain URL that skips the attachment
permission check entirely. Add this to a small site plugin (preferred) or to
`wp-content/mu-plugins/orourke-rest-fields.php`, creating the folder if needed:

```php
<?php
/**
 * Plugin Name: O'Rourke Audio REST fields
 * Description: Exposes the featured image URL directly on portfolio items.
 */
add_action('rest_api_init', function () {
    register_rest_field('portfolio', 'featured_image_url', [
        'get_callback' => function ($post) {
            return get_the_post_thumbnail_url($post['id'], 'large') ?: null;
        },
        'schema' => ['type' => ['string', 'null']],
    ]);
});
```

`get_the_post_thumbnail_url()` reads the URL server side, where no attachment
read permission applies, so the thumbnail is returned no matter what state its
parent post is in. `posterFor()` in `usePortfolio.js` already prefers
`featured_image_url` when it is present and falls back to `_embed` when it is
not, so this is safe to add or remove at any time with no frontend change.

> **Media note:** the playable file comes from the ACF fields alone
> (`media_type` plus `audio_url` / `video_url`). There is no longer a fallback
> to whatever MP3 or MP4 happens to be attached to the post: WordPress reparents
> attachments on its own often enough that the guess silently played the wrong
> file. Leave the fields empty and the item simply shows with no playable media.
>
> The still image is separate and does still fall back, in this order: the ACF
> `thumbnail` field if set, then the featured image, then any image uploaded
> into the post, then a brand-coloured gradient.

> **Self-hosted video note:** WordPress's default upload limit (often 2–64MB depending on host) can block larger MP4s. Check **Media → Add New** for the "Maximum upload file size" shown there. If a file is too large, compress it (H.264, reasonable bitrate) before uploading, or raise the limit via the hosting environment's PHP settings (`upload_max_filesize`, `post_max_size`).

---

## 5. Custom Post Type: `service`

| Setting | Value |
|---------|-------|
| Post Type Slug | `service` |
| Plural Label | `Services` |
| Singular Label | `Service` |
| Show in REST API | ✅ Yes |
| REST API base slug | `service` |
| Supports | Title, Page Attributes (for menu order) |

### ACF Fields for `service`

Create a field group called **Service Fields**, attach to Post Type = `service`:

| Field Label | Field Name | Type | Notes |
|-------------|------------|------|-------|
| Tagline | `tagline` | Text | One-liner under the service title |
| Starting Price | `starting_price` | Text | e.g. "$800" |
| Features | `features` | Repeater | Sub-field: `feature` (Text) |
| CTA Label | `cta_label` | Text | Button text, defaults to "Inquire" |

Set **Menu Order** on each service post to control display order.

---

## 6. Contact Form 7

1. Go to **Contact → Add New**
2. Use this form body:

```
[text* your-name placeholder "Name"]
[email* your-email placeholder "Email"]
[select project-type "Short Film" "Feature Film" "Commercial / Branded Video" "Trailer" "Game Audio" "Podcast" "Other"]
[select budget "Under $500" "$500 – $1,500" "$1,500 – $5,000" "$5,000+" "Not sure yet"]
[textarea* your-message placeholder "Tell me about your project…"]
[submit "Send Inquiry"]
```

3. Note the **Form ID** from the URL (e.g., `?post=5&action=edit` → ID is `5`)
4. Add to your `.env` file:
   ```
   VITE_CF7_FORM_ID=5
   ```

---

## 7. REST API Endpoints Used by React

| Endpoint | Data |
|----------|------|
| `GET /wp/v2/portfolio?per_page=100&_embed` | All portfolio items |
| `GET /wp/v2/portfolio_category?per_page=100` | Portfolio categories |
| `GET /wp/v2/service?per_page=100&orderby=menu_order&order=asc` | Services |
| `GET /wp/v2/pages?slug=about` | About page content |
| `POST /contact-form-7/v1/contact-forms/{id}/feedback` | Form submission |

Test the API is working by visiting:
```
http://orourke-audio.local/wp-json/wp/v2/portfolio
```

---

## 8. Running the React App

```bash
cd website
npm install
cp .env.example .env
# Edit .env if your Local site URL differs from http://orourke-audio.local
npm run dev
```

Open `http://localhost:3000` — the React app will proxy API calls to WordPress automatically.
