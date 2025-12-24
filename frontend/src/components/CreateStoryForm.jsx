import { useState } from 'react'
import { storiesAPI } from '../utils/api'

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
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
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
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h2>Create a New Story</h2>
      {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Story Content *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="8"
            required
          />
        </div>

        <div className="form-group">
          <label>Excerpt</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows="3"
            placeholder="Short preview of the story"
          />
        </div>

        <div className="form-group">
          <label>Thumbnail Image URL</label>
          <input
            type="url"
            name="thumbnailImage"
            value={formData.thumbnailImage}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="form-group">
          <label>Read Time (minutes)</label>
          <input
            type="number"
            name="readTime"
            value={formData.readTime}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Story'}
        </button>
      </form>
    </div>
  )
}

export default CreateStoryForm