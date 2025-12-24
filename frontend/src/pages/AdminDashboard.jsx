import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeToken } from '../utils/auth'
import CreatePublicationForm from '../components/CreatePublicationForm'
import CreateBTSForm from '../components/CreateBTSForm'
import CreateInterviewForm from '../components/CreateInterviewForm'
import CreateBookForm from '../components/CreateBookForm'
import './AdminDashboard.css'

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('publications')
  const navigate = useNavigate()

  const sections = [
    {
      id: 'publications',
      label: 'Publications',
      icon: '📚',
      description: 'Manage published works',
    },
    {
      id: 'bts',
      label: 'Behind the Scenes',
      icon: '🎬',
      description: 'Video & photo content',
    },
    {
      id: 'interviews',
      label: 'Interviews',
      icon: '🎤',
      description: 'Media appearances',
    },
    {
      id: 'books',
      label: 'Books',
      icon: '📖',
      description: 'Published books',
    },
  ]

  const handleLogout = () => {
    removeToken()
    navigate('/admin/login')
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>✨ Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn btn-secondary logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* Section Navigation - Card Style */}
      <div className="container">
        <div className="section-nav">
          <div className="nav-grid">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`nav-card ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="nav-icon">{section.icon}</span>
                <h3 className="nav-label">{section.label}</h3>
                <p className="nav-description">{section.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="dashboard-content">
          {activeSection === 'publications' && <CreatePublicationForm />}
          {activeSection === 'bts' && <CreateBTSForm />}
          {activeSection === 'interviews' && <CreateInterviewForm />}
          {activeSection === 'books' && <CreateBookForm />}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard