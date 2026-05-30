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
| Audio URL | `audio_url` | URL | Direct link to hosted MP3 |
| Description | `description` | Textarea | Short project description |
| Year | `year` | Number | 4-digit year |
| Category | `category` | Text | Display category label |
| Featured | `featured` | True/False | Show on homepage if true |

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
