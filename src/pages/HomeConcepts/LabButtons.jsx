import { Link } from 'react-router-dom'
import styles from './LabButtons.module.css'

/**
 * LAB BUTTONS, shared across concept studies.
 *
 * PrimaryBtn: the direction chosen from Concept D's giant CTA. The button
 * is solid brand red at rest. On hover or focus, a black layer wipes up
 * from the bottom, and a red layer follows after a short stagger, so the
 * button pulses dark before settling back to red. The stagger is exposed
 * as --wipe-delay on the module for tuning.
 *
 * SecondaryBtn: the direction chosen from Concept E. Square brackets
 * slide in from both sides on hover and focus.
 */

export function PrimaryBtn({ to, children }) {
  return (
    <Link to={to} className={styles.primary}>
      <span className={`${styles.wipe} ${styles.wipeBlack}`} aria-hidden="true" />
      <span className={`${styles.wipe} ${styles.wipeRed}`} aria-hidden="true" />
      <span className={styles.primaryLabel}>{children}</span>
    </Link>
  )
}

export function SecondaryBtn({ to, children }) {
  return (
    <Link to={to} className={styles.secondary}>
      <span className={styles.bracket} aria-hidden="true">[</span>
      <span className={styles.secondaryLabel}>{children}</span>
      <span className={`${styles.bracket} ${styles.bracketR}`} aria-hidden="true">]</span>
    </Link>
  )
}
