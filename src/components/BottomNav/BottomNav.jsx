import { NavLink } from 'react-router-dom'
import styles from './BottomNav.module.css'

const links = [
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/services',  label: 'Services'  },
  { to: '/contact',   label: 'Contact'   },
]

export default function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="Mobile navigation">
      <ul className={styles.list}>
        {links.map(({ to, label }) => (
          <li key={to} className={styles.item}>
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
  )
}
