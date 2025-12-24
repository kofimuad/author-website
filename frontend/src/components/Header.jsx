import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isTokenValid } from '../utils/auth'
import './Header.css'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const navigate = useNavigate()
  const isAdmin = isTokenValid()

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode !== null) {
      const isDark = JSON.parse(savedMode)
      setIsDarkMode(isDark)
      applyTheme(isDark)
    }
  }, [])

  const applyTheme = (isDark) => {
    const html = document.documentElement
    if (isDark) {
      html.setAttribute('data-theme', 'dark')
    } else {
      html.removeAttribute('data-theme')
    }
  }

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('darkMode', JSON.stringify(newMode))
    applyTheme(newMode)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          ✨ KATARU YAHYA
        </Link>

        <nav className={`nav ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
          <Link to="/books" onClick={closeMobileMenu}>Books</Link>
          <Link to="/other-publications" onClick={closeMobileMenu}>Publications</Link>
          <Link to="/behind-the-scenes" onClick={closeMobileMenu}>BTS</Link>
          <Link to="/interviews-publications" onClick={closeMobileMenu}>Interviews</Link>
          <Link to="/about" onClick={closeMobileMenu}>About</Link>
          <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
          {isAdmin && <Link to="/admin/dashboard" onClick={closeMobileMenu}>Dashboard</Link>}
        </nav>

        <div className="header-actions">
          {/* Theme Toggle Button */}
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            aria-label="Toggle dark/light mode"
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* Admin Button */}
          {isAdmin ? (
            <Link to="/admin/dashboard" className="btn btn-primary">
              📊 Dashboard
            </Link>
          ) : (
            <Link to="/admin/login" className="btn btn-primary">
              🔐 Admin
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header