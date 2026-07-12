import UnicornScene from '../UnicornScene/UnicornScene.jsx'
import styles from './FeaturedFilm.module.css'

/**
 * FEATURED GAME
 *
 * Editorial-style feature header for a game Ryan scored. Structure: a dark
 * headline block (title + italic category/date line) sitting above a
 * textured panel that holds the key art. The panel reuses the "emberFlow"
 * shader from the homepage concept (ConceptEmberField) via the shared
 * UnicornScene component, with a hue-rotate filter to push the brand red
 * smoke toward the warm amber/yellow seen in the reference layout, instead
 * of duplicating the shader with new colors.
 *
 * Placeholder content until Ryan supplies a real credit.
 */
const placeholder = {
  category: 'Original Score',
  date: 'August 6, 2028',
  headline: "Scoring the Static: Original Music for “Coastal Drift”",
  credit: 'Original Score & Music by Ryan O\'Rourke',
  posterWordTop: 'Coastal',
  posterWordBottom: 'Drift',
  tagLeft: 'INDIE TITLE',
  tagRight: 'OST',
  href: '#',
}

export default function FeaturedFilm({
  category = placeholder.category,
  date = placeholder.date,
  headline = placeholder.headline,
  credit = placeholder.credit,
  posterWordTop = placeholder.posterWordTop,
  posterWordBottom = placeholder.posterWordBottom,
  tagLeft = placeholder.tagLeft,
  tagRight = placeholder.tagRight,
  href = placeholder.href,
}) {
  return (
    <section className={styles.wrap} aria-label="Featured game">
      <div className={styles.headerBlock}>
        <h2 className={styles.headline}>{headline}</h2>
        <p className={styles.meta}>
          {category} <span className={styles.metaDot}>·</span> {date}
        </p>
      </div>

      <a href={href} className={styles.panel}>
        <UnicornScene variant="emberFlow" className={styles.shader} />
        <div className={styles.grain} aria-hidden="true" />

        <div className={styles.poster}>
          <span className={styles.posterWordTop}>{posterWordTop}</span>
          <span className={styles.posterWordBottom}>{posterWordBottom}</span>
          <span className={styles.tagLeft}>{tagLeft}</span>
          <span className={styles.tagRight}>{tagRight}</span>
        </div>
      </a>

      <p className={styles.credit}>{credit}</p>
    </section>
  )
}
