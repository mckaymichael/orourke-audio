import styles from './FeaturedAlbum.module.css'

/**
 * FEATURED ALBUM
 *
 * Standalone spotlight block for the Portfolio page. Currently populated
 * with placeholder copy until Ryan supplies a real featured release.
 * Swap the values below (or wire it to an ACF "featured" flag on the
 * portfolio post type) when real data is available.
 */
const placeholder = {
  eyebrow: 'Featured Score',
  title: 'False Signal',
  subtitle: 'Original Score by Ryan O\'Rourke',
  labelLeft: 'ARTIFACT',
  labelRight: 'GA-03',
  href: '#',
}

export default function FeaturedAlbum({
  eyebrow = placeholder.eyebrow,
  title = placeholder.title,
  subtitle = placeholder.subtitle,
  labelLeft = placeholder.labelLeft,
  labelRight = placeholder.labelRight,
  href = placeholder.href,
}) {
  return (
    <section className={styles.wrap} aria-label="Featured album">
      <p className={`font-mono ${styles.eyebrow}`}>{eyebrow}</p>
      <h2 className={styles.heading}>Featured Album</h2>

      <div className={styles.artCard}>
        <span className={styles.wordLeft}>{title.split(' ')[0] ?? 'FALSE'}</span>
        <span className={styles.wordRight}>{title.split(' ')[1] ?? 'SIGNAL'}</span>

        <div className={styles.burst} aria-hidden="true" />

        <span className={styles.tagLeft}>{labelLeft}</span>
        <span className={styles.tagRight}>{labelRight}</span>
      </div>

      <div className={styles.caption}>
        <p className={styles.title}>
          {title} <span className={styles.subtitle}>by {subtitle.replace('Original Score by ', '')}</span>
        </p>
        <a className={styles.listen} href={href}>
          <span className={styles.playIcon} aria-hidden="true" />
          Listen now
        </a>
      </div>
    </section>
  )
}
