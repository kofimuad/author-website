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
          <h1>{isRegister ? 'Create Account' : 'Admin Login'}</h1>
          <p className="login-subtitle">Access your dashboard</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
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
              {loading ? 'Loading...' : isRegister ? 'Create Account' : 'Login'}
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
                {isRegister ? 'Login' : 'Register'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin