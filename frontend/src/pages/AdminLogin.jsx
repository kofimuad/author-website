import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../utils/api'
import { setToken } from '../utils/auth'
import './AdminLogin.css'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let response
      if (isRegister) {
        // Check if account already exists
        if (!email || !password || !name) {
          setError('All fields are required')
          setLoading(false)
          return
        }
        response = await authAPI.register(email, password, name)
      } else {
        response = await authAPI.login(email, password)
      }

      if (response.token) {
        setToken(response.token)
        navigate('/admin/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>{isRegister ? '✨ Create Author Account' : '✨ Author Login'}</h1>
            <p className="login-subtitle">Secure access to your dashboard</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          {isRegister && (
            <div className="security-notice">
              <p>⚠️ <strong>Note:</strong> Only create an account once. This will be your permanent author account.</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="form-group">
                <label>Author Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Processing...' : isRegister ? 'Create Author Account' : 'Login to Dashboard'}
            </button>
          </form>

          <div className="login-toggle">
            <p>
              {isRegister ? 'Already have an account?' : "Don't have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister)
                  setError('')
                }}
                className="toggle-button"
              >
                {isRegister ? 'Login' : 'Register as Author'}
              </button>
            </p>
          </div>
        </div>

        <div className="login-info">
          <h3>👋 Welcome Author</h3>
          <p>This is your exclusive dashboard where you can:</p>
          <ul>
            <li>📚 Manage your books and publications</li>
            <li>✍️ Create and edit short stories</li>
            <li>📸 Share behind-the-scenes content</li>
            <li>🎤 Add interviews and media features</li>
            <li>📊 Track your content</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin