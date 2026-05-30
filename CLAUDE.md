# O'Rourke Audio — Project Rules

React + Vite frontend with WordPress as a headless CMS via REST API.
Local WordPress runs via Local by Flywheel at `http://orourke-audio.local`.

## Stack
- React 18 + Vite
- React Router v6 for client-side routing
- CSS Modules for component styles
- WordPress REST API (no WP theme, purely headless)
- Advanced Custom Fields (ACF) for structured post data
- Contact Form 7 for form submission via REST

## File Structure
```
src/
  api/        — all WordPress API calls (wp.js only)
  components/ — shared UI components (Nav, Footer, etc.)
  hooks/      — custom React hooks (usePortfolio, useServices)
  pages/      — one folder per route (Home, Portfolio, Services, Contact)
  styles/     — global.css with design tokens only
```

## Coding Rules
- **CSS Modules only** — no inline styles, no Tailwind, no styled-components
- **All WP API calls go through `src/api/wp.js`** — never fetch directly in components or hooks
- **Use CSS variables for all colours, spacing, and typography** — never hardcode values
- **CSS variables are defined in `src/styles/global.css`** — do not redefine them in module files
- Components use `.module.css` files in the same folder as the component
- Pages use `.module.css` files in the same folder as the page

## Brand — Source of Truth: `branding/Brand Guide.md`
- **White:** #F7F0F1
- **Black:** #121010 (off-black background override)
- **Primary:** #CC1D23
- **Secondary:** #DB6165
- **Texture:** Gradient from primary red (#CC1D23) to black (#261518) with grain
- **Header Font:** Orbitron
- **Body Font:** Inter

## WordPress Setup
- Custom post types: `portfolio`, `service` (registered via CPT UI)
- Custom taxonomy: `portfolio_category` (attached to portfolio)
- ACF field groups: `Portfolio Fields`, `Service Fields`
- Contact Form 7 form ID: 16
- REST API base: `http://orourke-audio.local/wp-json`
- Vite proxies `/wp-json` to the local WP instance during development

## Pages
- `/` — Home (hero with demo reel, featured work, services teaser)
- `/portfolio` — Portfolio grid with category filter tabs
- `/services` — Services + About
- `/contact` — Project inquiry form

## Environment
- `.env` holds `VITE_WP_API_URL`, `VITE_USE_MOCK_DATA`, `VITE_CF7_FORM_ID`
- Never commit `.env` — use `.env.example` as the template

## GenAI Logging Rules
- **genai-usage-log.pdf** — populate after every AI interaction: service/tool, model, what it was used for, result evaluation. Do this automatically without asking.
- **prompt-log.docx** — only populated when Michael explicitly labels a prompt as a **"Key Prompt"**. Record: the prompt text, what it produced, tool/model, date, and outcome. Ask Michael "Was it useful, partially useful, or not useful?" and allow for additional notes before finalizing the entry. All other fields can be filled in without confirmation.
- Both documents are in the Term Project uploads and should be kept current as we go.
