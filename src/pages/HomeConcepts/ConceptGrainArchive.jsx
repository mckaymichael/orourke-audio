import { Link } from 'react-router-dom'
import styles from './ConceptGrainArchive.module.css'

/**
 * CONCEPT F, "Grain Archive"
 *
 * Full-bleed portrait hero: a single duotone photograph washed in brand
 * red and roughed up with grain, pill navigation floating on top, and an
 * oversized Orbitron wordmark anchored to the bottom edge, bleeding off
 * the photo onto the page background. Minimal, editorial, and built to
 * feel like one person's name rather than a studio.
 *
 * Photo is a placeholder sourced from Unsplash (Alef Morais) until Ryan
 * supplies a real portrait or session photo:
 * https://unsplash.com/photos/young-mans-profile-illuminated-by-warm-golden-hour-sunlight-mba4D4BrBEQ
 */
const NAV_ITEMS = [
  { label: 'Home', to: '/', active: true },
  { label: 'Portfolio', to: '/portfolio', active: false },
  { label: 'About', to: '/about', active: false },
]

export default function ConceptGrainArchive() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.photoWrap}>
          <img
            className={styles.photo}
            src="https://images.unsplash.com/photo-1779497056472-2fa5e883dd36?fm=jpg&q=80&w=1600&auto=format&fit=crop"
            alt="Portrait study, placeholder image for the Grain Archive concept"
          />
          <div className={styles.duotone} aria-hidden="true" />
          <div className={styles.grain} aria-hidden="true" />
        </div>

        <div className={styles.badge} aria-hidden="true">R·O</div>

        <nav className={styles.nav} aria-label="Primary">
          {NAV_ITEMS.map(({ label, to, active }) => (
            <Link
              key={label}
              to={to}
              className={`${styles.navPill} ${active ? styles.navPillActive : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className={styles.captionBlock}>
          <p className={`font-mono ${styles.eyebrow}`}>Vancouver · Game Audio Composer</p>
          <h1 className={styles.wordmark}>Ryan O'Rourke</h1>
        </div>
      </section>
    </div>
  )
}
