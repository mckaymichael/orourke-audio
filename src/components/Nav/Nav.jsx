import { NavLink } from 'react-router-dom'
import styles from './Nav.module.css'

const links = [
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/services',  label: 'Services' },
  { to: '/contact',   label: 'Contact'  },
]

export default function Nav() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.logo} aria-label="O'Rourke Audio — Home">
          <span className={styles.logoName}>O'Rourke</span>
          <span className={styles.logoSub}>Audio</span>
        </NavLink>

        <nav aria-label="Main navigation">
          <ul className={styles.links}>
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <NavLink to="/contact" className={`btn btn-primary ${styles.cta}`}>
          Hire Ryan
        </NavLink>
      </div>
    </header>
  )
}
