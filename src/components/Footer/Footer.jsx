import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.name}>Ryan O&#39;Rourke</span>
            <span className={styles.tagline}>Composer for games. Based in Vancouver.</span>
          </div>

          <nav className={styles.nav} aria-label="Footer navigation">
            <span className={styles.navLabel}>Navigation</span>
            <Link to="/portfolio">Work</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>

        <div className={styles.bottom}>
          <span className={styles.location}>Vancouver, BC</span>
          <span>&#169; {new Date().getFullYear()} Ryan O&#39;Rourke Audio</span>
        </div>
      </div>
    </footer>
  )
}
