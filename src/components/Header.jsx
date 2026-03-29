import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="lumina-header">
      <div className="lumina-brand">
        <img src="/src/assets/logo.png" alt="Lumina logo" className="lumina-logo-image" />
      </div>
      <nav className="lumina-nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Search
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'active' : '')}>
          Favorites
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
