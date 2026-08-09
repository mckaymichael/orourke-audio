import { Link } from 'react-router-dom'
import styles from './Sitemap.module.css'

/**
 * SITE MAP
 *
 * Plain-language index of every page, linked from the footer (between the
 * copyright line and the location). Two groups:
 *  - Main Pages: the real, indexable routes.
 *  - Concept Pages: the hidden /lab/ layout studies. They're not linked
 *    from Nav/Footer/BottomNav and stay noindex,nofollow on the pages
 *    themselves (see HomeConcepts.jsx / PortfolioConcepts.jsx) — listing
 *    them here doesn't change that, it just gives Ryan/Michael a fast way
 *    to reach them without knowing the URLs by heart.
 */
const MAIN_PAGES = [
  { to: '/',          label: 'Home',    description: 'Featured reel, why work with Ryan, and a way to get in touch.' },
  { to: '/portfolio', label: 'Work',    description: "Ryan's portfolio of game composition and sound design." },
  { to: '/about',     label: 'About',   description: "Ryan's background, focus, and what he brings to a team." },
  { to: '/contact',   label: 'Contact', description: 'Project inquiry form and direct contact details.' },
]

const CONCEPT_PAGES = [
  { to: '/lab/home-concepts',      label: 'Homepage Concepts',  description: 'Structurally distinct homepage layout candidates, rendered back to back for review.' },
  { to: '/lab/portfolio-concepts', label: 'Portfolio Concepts', description: 'Ten layouts exploring ways to blend the feature reel and soundtrack list.' },
]

function PageList({ pages }) {
  return (
    <ul className={styles.list}>
      {pages.map(({ to, label, description }) => (
        <li key={to} className={styles.item}>
          <Link to={to} className={styles.link}>
            {label}
          </Link>
          <p className={styles.description}>{description}</p>
        </li>
      ))}
    </ul>
  )
}

export default function Sitemap() {
  return (
    <div className={styles.page}>
      <div className="container">
        <p className="section-label">Site Map</p>
        <h1 className="section-title">Every page, in one place.</h1>

        <PageList pages={MAIN_PAGES} />

        <div className={styles.groupHeader}>
          <p className="section-label">Concept Pages</p>
          <p className={styles.groupNote}>
            Internal layout studies. Not linked from the site's navigation and marked noindex for search engines.
          </p>
        </div>

        <PageList pages={CONCEPT_PAGES} />
      </div>
    </div>
  )
}
