import { useState, useEffect } from 'react'
import { storiesAPI } from '../utils/api'
import './AdminForms.css'

function CreateStoryForm() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    genre: [],
    excerpt: '',
    thumbnailImage: '',
    readTime: '',
    tags: [],
  })
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [stories, setStories] = useState([])
  const [showStories, setShowStories] = useState(false)

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const data = await storiesAPI.getAll()
      setStories(data)
    } catch (error) {
      console.error('Error fetching stories:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        setFormData({
          ...formData,
          thumbnailImage: reader.result,
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
      await storiesAPI.create(formData)
      setMessage('✅ Story created successfully!')
      setFormData({
        title: '',
        content: '',
        genre: [],
        excerpt: '',
        thumbnailImage: '',
        readTime: '',
        tags: [],
      })
      setPreview('')
      fetchStories()
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteStory = async (id) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        await storiesAPI.delete(id)
        setMessage('✅ Story deleted successfully!')
        fetchStories()
      } catch (error) {
        setMessage(`❌ Error deleting story: ${error.message}`)
      }
    }
  }

  return (
    <div className="form-section">
      <div className="form-container">
        <h2>✍️ Create a New Story</h2>
        {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}
        
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Story Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter story title"
              required
            />
          </div>

          <div className="form-group">
            <label>Thumbnail Image (Optional)</label>
            <div className="image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="story-thumbnail"
              />
              <label htmlFor="story-thumbnail" className="upload-btn">
                📤 Choose Image from Computer
              </label>
            </div>
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Story Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="10"
              placeholder="Write your story here..."
              required
            />
          </div>

          <div className="form-group">
            <label>Excerpt (Short Preview)</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows="3"
              placeholder="Brief summary of your story"
            />
          </div>

          <div className="form-group">
            <label>Read Time (minutes)</label>
            <input
              type="number"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              placeholder="Estimated reading time"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : '✨ Create Story'}
          </button>
        </form>
      </div>

      {/* Stories List */}
      <div className="stories-list-container">
        <button 
          className="toggle-btn"
          onClick={() => setShowStories(!showStories)}
        >
          {showStories ? '▼' : '▶'} My Stories ({stories.length})
        </button>

        {showStories && (
          <div className="stories-grid">
            {stories.length === 0 ? (
              <p className="empty-message">No stories yet. Write your first one!</p>
            ) : (
              stories.map((story) => (
                <div key={story._id} className="story-item">
                  {story.thumbnailImage && (
                    <img src={story.thumbnailImage} alt={story.title} className="story-thumbnail" />
                  )}
                  <div className="story-info">
                    <h3>{story.title}</h3>
                    <p className="story-excerpt">
                      {story.excerpt || story.content?.substring(0, 100)}...
                    </p>
                    <p className="read-time">📖 {story.readTime || 5} min read</p>
                    <div className="story-actions">
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDeleteStory(story._id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
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

export default CreateStoryForm