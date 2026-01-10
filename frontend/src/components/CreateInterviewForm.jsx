import { useState, useEffect } from 'react'
import { interviewsAPI } from '../utils/api'
import './AdminForms.css'

function CreateInterviewForm() {
  const [formData, setFormData] = useState({
    title: '',
    publicationName: '',
    publicationType: 'Interview',
    description: '',
    content: '',
    featuredImage: '',
    videoUrl: '',
    videoEmbed: '',
    externalLink: '',
    publishedDate: '',
    tags: '',
    featured: false,
  })
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [interviews, setInterviews] = useState([])
  const [showList, setShowList] = useState(false)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchInterviews()
  }, [])

  const fetchInterviews = async () => {
    try {
      const data = await interviewsAPI.getAll()
      setInterviews(data)
    } catch (error) {
      console.error('Error fetching interviews:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleMediaChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        setFormData({
          ...formData,
          featuredImage: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      publicationName: '',
      publicationType: 'Interview',
      description: '',
      content: '',
      featuredImage: '',
      videoUrl: '',
      videoEmbed: '',
      externalLink: '',
      publishedDate: '',
      tags: '',
      featured: false,
    })
    setPreview('')
    setEditingId(null)
  }

  const handleEdit = (interview) => {
    setFormData({
      title: interview.title,
      publicationName: interview.publicationName,
      publicationType: interview.publicationType,
      description: interview.description || '',
      content: interview.content || '',
      featuredImage: interview.featuredImage || '',
      videoUrl: interview.videoUrl || '',
      videoEmbed: interview.videoEmbed || '',
      externalLink: interview.externalLink || '',
      publishedDate: interview.publishedDate?.split('T')[0] || '',
      tags: interview.tags ? interview.tags.join(', ') : '',
      featured: interview.featured || false,
    })
    setPreview(interview.featuredImage || '')
    setEditingId(interview._id)
    
    // Scroll to form with smooth behavior
    setTimeout(() => {
      const formSection = document.querySelector('.form-section')
      if (formSection) {
        const offsetTop = formSection.offsetTop - 100
        window.scrollTo({ top: offsetTop, behavior: 'smooth' })
      }
    }, 0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const submitData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      }
      
      if (editingId) {
        await interviewsAPI.update(editingId, submitData)
        setMessage('✅ Interview updated successfully!')
      } else {
        await interviewsAPI.create(submitData)
        setMessage('✅ Interview created successfully!')
      }
      
      resetForm()
      fetchInterviews()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this interview?')) {
      try {
        await interviewsAPI.delete(id)
        setMessage('✅ Interview deleted!')
        fetchInterviews()
      } catch (error) {
        setMessage(`❌ Error: ${error.message}`)
      }
    }
  }

  return (
    <div className="form-section">
      <div className="form-container">
        <h2>{editingId ? '✏️ Edit Interview/Media Appearance' : '🎤 Add Interview/Media Appearance'}</h2>
        <p className="form-description">
          {editingId ? 'Update your interview details' : 'Share interviews, podcasts, and media features'}
        </p>
        
        {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label>Interview Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Discussing Creativity and Writing"
                required
              />
            </div>

            <div className="form-group">
              <label>Publication/Platform Name *</label>
              <input
                type="text"
                name="publicationName"
                value={formData.publicationName}
                onChange={handleChange}
                placeholder="e.g., NPR, BBC, Podcast Name"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select name="publicationType" value={formData.publicationType} onChange={handleChange}>
                <option>Interview</option>
                <option>Podcast</option>
                <option>Article</option>
                <option>Video</option>
                <option>Feature</option>
                <option>Appearance</option>
              </select>
            </div>

            <div className="form-group">
              <label>Publication Date</label>
              <input
                type="date"
                name="publishedDate"
                value={formData.publishedDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Featured Image/Thumbnail (Optional)</label>
            <div className="image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleMediaChange}
                id="interview-image"
              />
              <label htmlFor="interview-image" className="upload-btn">
                📤 Upload Image
              </label>
            </div>
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Video URL/Embed Code (Optional)</label>
            <textarea
              name="videoEmbed"
              value={formData.videoEmbed}
              onChange={handleChange}
              rows="3"
              placeholder="Paste YouTube/Vimeo embed code here"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Brief description of the interview"
            />
          </div>

          <div className="form-group">
            <label>Content/Transcript (Optional)</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="4"
              placeholder="Full content or transcript (optional)"
            />
          </div>

          <div className="form-group">
            <label>External Link</label>
            <input
              type="url"
              name="externalLink"
              value={formData.externalLink}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="interview, podcast, media"
            />
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              name="featured"
              id="featured-interview"
              checked={formData.featured}
              onChange={handleChange}
            />
            <label htmlFor="featured-interview">Mark as Featured ⭐</label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : editingId ? '✏️ Update Interview' : '✨ Add Interview'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={resetForm} disabled={loading}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Interviews List */}
      <div className="list-container">
        <button 
          className="toggle-btn"
          onClick={() => setShowList(!showList)}
        >
          {showList ? '▼' : '▶'} My Interviews ({interviews.length})
        </button>

        {showList && (
          <div className="items-grid">
            {interviews.length === 0 ? (
              <p className="empty-message">No interviews yet</p>
            ) : (
              interviews.map((interview) => (
                <div key={interview._id} className="item-card">
                  {interview.featuredImage && (
                    <img src={interview.featuredImage} alt={interview.title} className="item-img" />
                  )}
                  <h4>{interview.title}</h4>
                  <p className="item-meta">{interview.publicationName}</p>
                  <p className="item-date">
                    {new Date(interview.publishedDate).toLocaleDateString()}
                  </p>
                  <p className="pub-mag">{interview.publicationType}</p>
                  <div className="item-actions">
                    <button
                      className="btn btn-outline"
                      onClick={() => handleEdit(interview)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(interview._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateInterviewForm