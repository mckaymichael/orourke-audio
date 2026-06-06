# O'Rourke Audio

Professional website for Ryan O'Rourke, a Vancouver-based sound designer and composer. Built as a React + headless WordPress application targeting indie film clients.

**Live site:** [orourkeaudio.ca](https://www.orourkeaudio.ca)

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Routing | React Router v6 |
| Styling | CSS Modules |
| CMS | WordPress (headless) via REST API |
| Custom data | Advanced Custom Fields (ACF) |
| Forms | Contact Form 7 |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- [Local by Flywheel](https://localwp.com/) with the `orourke-audio` site running at `http://orourke-audio.local`

### Install

```bash
npm install
```

### Environment

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_WP_API_URL` | WordPress REST API base URL |
| `VITE_USE_MOCK_DATA` | Set to `true` to bypass WordPress during development |
| `VITE_CF7_FORM_ID` | Contact Form 7 form ID (default: 16) |

> Never commit `.env`.

### Run

```bash
npm run dev      # development server (proxies /wp-json to Local WP)
npm run build    # production build
npm run preview  # preview production build locally
```

---

## Project Structure

```
src/
  api/          — all WordPress API calls (wp.js is the only entry point)
  components/   — shared UI (Nav, Footer, etc.)
  hooks/        — custom React hooks (usePortfolio, useServices)
  pages/        — one folder per route (Home, Portfolio, Services, Contact)
  styles/       — global.css with CSS design tokens
```

### Pages

| Route | Description |
|---|---|
| `/` | Home — hero with demo reel, featured work, services teaser |
| `/portfolio` | Portfolio grid with category filter tabs |
| `/services` | Services listing and about section |
| `/contact` | Project inquiry form |

---

## WordPress Setup

Local WP site: `http://orourke-audio.local`

Custom post types (registered via CPT UI):
- `portfolio`
- `service`

Custom taxonomy:
- `portfolio_category` — attached to portfolio posts

ACF field groups:
- `Portfolio Fields`
- `Service Fields`

Contact Form 7 form ID: `16`

Full WordPress configuration instructions are in [WORDPRESS_SETUP.md](./WORDPRESS_SETUP.md).

---

## Coding Rules

- **CSS Modules only** — no inline styles, no Tailwind, no styled-components
- **All WordPress API calls go through `src/api/wp.js`** — never fetch directly in a component or hook
- **CSS variables for all colours, spacing, and typography** — never hardcode values
- CSS variables are defined in `src/styles/global.css` — do not redefine them in module files
- Each component and page has its own `.module.css` in the same folder

---

## Brand

| Token | Value |
|---|---|
| White | `#F7F0F1` |
| Black | `#121010` |
| Primary | `#CC1D23` |
| Secondary | `#DB6165` |
| Heading font | Orbitron |
| Body font | Inter |

Full brand guidelines and design brief are in the `branding/` folder.
