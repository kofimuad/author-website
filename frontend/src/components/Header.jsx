import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isTokenValid } from '../utils/auth'
import './Header.css'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const isAdmin = isTokenValid()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          ✨ Author's Corner
        </Link>

        <nav className={`nav ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/stories">Stories</Link>
          <Link to="/behind-the-scenes">BTS</Link>
          <Link to="/interviews-publications">Interviews</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {isAdmin && <Link to="/admin/dashboard">Dashboard</Link>}
        </nav>

        <div className="header-actions">
          <input type="text" placeholder="Search..." className="search-input" />
          {isAdmin ? (
            <Link to="/admin/dashboard" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
              Dashboard
            </Link>
          ) : (
            <Link to="/admin/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
              Admin
            </Link>
          )}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            ☰
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header