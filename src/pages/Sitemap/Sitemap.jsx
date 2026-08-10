import { Link } from 'react-router-dom'
import styles from './Sitemap.module.css'

/**
 * SITE MAP
 *
 * Plain-language index of every page, linked from the footer (between the
 * copyright line and the location).
 */
const MAIN_PAGES = [
  { to: '/',          label: 'Home',    description: 'Featured reel, why work with Ryan, and a way to get in touch.' },
  { to: '/portfolio', label: 'Work',    description: "Ryan's portfolio of game composition and sound design." },
  { to: '/about',     label: 'About',   description: "Ryan's background, focus, and what he brings to a team." },
  { to: '/contact',   label: 'Contact', description: 'Project inquiry form and direct contact details.' },
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
      </div>
    </div>
  )
}
