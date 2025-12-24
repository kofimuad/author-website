import { useState, useEffect } from 'react'
import { interviewsAPI } from '../utils/api'
import './AdminForms.css'

function CreatePublicationForm() {
  const [formData, setFormData] = useState({
    title: '',
    magazine: '',
    publicationType: 'Interview',
    category: 'Literary Magazine',
    description: '',
    poemExcerpt: '',
    publishedDate: '',
    readUrl: '',
    publicationLogo: '',
    featured: false,
  })
  const [logoPreview, setLogoPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [publications, setPublications] = useState([])
  const [showList, setShowList] = useState(false)

  useEffect(() => {
    fetchPublications()
  }, [])

  const fetchPublications = async () => {
    try {
      const data = await interviewsAPI.getAll()
      setPublications(data)
    } catch (error) {
      console.error('Error fetching publications:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result)
        setFormData({
          ...formData,
          publicationLogo: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      await interviewsAPI.create(formData)
      setMessage('✅ Publication added successfully!')
      setFormData({
        title: '',
        magazine: '',
        publicationType: 'Interview',
        category: 'Literary Magazine',
        description: '',
        poemExcerpt: '',
        publishedDate: '',
        readUrl: '',
        publicationLogo: '',
        featured: false,
      })
      setLogoPreview('')
      fetchPublications()
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this publication?')) {
      try {
        await interviewsAPI.delete(id)
        setMessage('✅ Publication deleted!')
        fetchPublications()
      } catch (error) {
        setMessage(`❌ Error: ${error.message}`)
      }
    }
  }

  return (
    <div className="form-section">
      <div className="form-container">
        <h2>📚 Add Published Work</h2>
        <p className="form-description">Add a publication from an external magazine or platform</p>
        
        {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label>Publication Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., The Silence Between Words"
                required
              />
            </div>

            <div className="form-group">
              <label>Magazine/Platform Name *</label>
              <input
                type="text"
                name="magazine"
                value={formData.magazine}
                onChange={handleChange}
                placeholder="e.g., The New Yorker"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Publication Type</label>
              <select name="publicationType" value={formData.publicationType} onChange={handleChange}>
                <option>Interview</option>
                <option>Article</option>
                <option>Feature</option>
                <option>Podcast</option>
                <option>Appearance</option>
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Literary Magazine"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Publication Logo (Optional)</label>
            <div className="image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                id="logo-upload"
              />
              <label htmlFor="logo-upload" className="upload-btn">
                📤 Choose Logo
              </label>
            </div>
            {logoPreview && (
              <div className="image-preview">
                <img src={logoPreview} alt="Logo Preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Poem/Work Excerpt</label>
            <textarea
              name="poemExcerpt"
              value={formData.poemExcerpt}
              onChange={handleChange}
              rows="4"
              placeholder="Add a snippet from your published work..."
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Brief description of the publication"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Publication Date</label>
              <input
                type="date"
                name="publishedDate"
                value={formData.publishedDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Read URL</label>
              <input
                type="url"
                name="readUrl"
                value={formData.readUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            <label htmlFor="featured">Mark as Featured ⭐</label>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding...' : '✨ Add Publication'}
          </button>
        </form>
      </div>

      {/* Publications List */}
      <div className="list-container">
        <button 
          className="toggle-btn"
          onClick={() => setShowList(!showList)}
        >
          {showList ? '▼' : '▶'} My Publications ({publications.length})
        </button>

        {showList && (
          <div className="items-grid">
            {publications.length === 0 ? (
              <p className="empty-message">No publications yet</p>
            ) : (
              publications.map((pub) => (
                <div key={pub._id} className="item-card">
                  {pub.publicationLogo && (
                    <img src={pub.publicationLogo} alt={pub.magazine} className="logo-img" />
                  )}
                  <h4>{pub.title}</h4>
                  <p className="pub-mag">{pub.magazine}</p>
                  <p className="pub-date">{new Date(pub.publishedDate).toLocaleDateString()}</p>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(pub._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CreatePublicationForm