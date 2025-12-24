import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribeMessage, setSubscribeMessage] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    
    if (!email) {
      setSubscribeMessage('Please enter your email')
      return
    }

    // Simulate subscription
    console.log('Subscribed:', email)
    setSubscribeMessage('✅ Thank you for subscribing!')
    setEmail('')
    
    // Clear message after 3 seconds
    setTimeout(() => setSubscribeMessage(''), 3000)
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/books">Books</Link>
            <Link to="/other-publications">Publications</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-section">
            <h4>Follow Me</h4>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Newsletter</h4>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Your email" 
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
            {subscribeMessage && (
              <p className={`subscribe-message ${subscribeMessage.includes('✅') ? 'success' : 'error'}`}>
                {subscribeMessage}
              </p>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Kataru Yahya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer