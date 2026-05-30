import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.name}>Ryan O'Rourke</span>
          <span className={styles.tagline}>Your film will sound as intentional as it looks.</span>
        </div>

        <nav className={styles.nav} aria-label="Footer navigation">
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className={styles.meta}>
          <span>Vancouver, BC</span>
          <span className={styles.copy}>© {new Date().getFullYear()} Ryan O'Rourke Audio</span>
        </div>
      </div>
    </footer>
  )
}
