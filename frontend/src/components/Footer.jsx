import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/books">Books</Link>
            <Link to="/stories">Stories</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-section">
            <h4>Follow Me</h4>
            <div className="social-links">
              <a href="#instagram">Instagram</a>
              <a href="#twitter">Twitter</a>
              <a href="#tiktok">TikTok</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Newsletter</h4>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Author's Corner. All rights reserved.</p>
          <p>Built with React & Vite ✨</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer