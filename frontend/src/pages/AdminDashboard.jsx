import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeToken } from '../utils/auth'
import { booksAPI, storiesAPI, btsAPI, interviewsAPI } from '../utils/api'
import CreateBookForm from '../components/CreateBookForm'
import CreateStoryForm from '../components/CreateStoryForm'
import './AdminDashboard.css'

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('books')
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate('/admin/login')
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>📊 Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab ${activeTab === 'books' ? 'active' : ''}`}
          onClick={() => setActiveTab('books')}
        >
          Books
        </button>
        <button
          className={`tab ${activeTab === 'stories' ? 'active' : ''}`}
          onClick={() => setActiveTab('stories')}
        >
          Stories
        </button>
        <button
          className={`tab ${activeTab === 'bts' ? 'active' : ''}`}
          onClick={() => setActiveTab('bts')}
        >
          Behind the Scenes
        </button>
        <button
          className={`tab ${activeTab === 'interviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('interviews')}
        >
          Interviews
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'books' && <CreateBookForm />}
        {activeTab === 'stories' && <CreateStoryForm />}
        {activeTab === 'bts' && <div><p>Behind the Scenes form coming soon</p></div>}
        {activeTab === 'interviews' && <div><p>Interviews form coming soon</p></div>}
      </div>
    </div>
  )
}

export default AdminDashboard