import { useState, useEffect } from 'react'
import { btsAPI } from '../utils/api'
import './AdminForms.css'

function CreateBTSForm() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    contentType: 'Blog Post',
    featuredImage: '',
    videoUrl: '',
    tags: '',
  })
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [posts, setPosts] = useState([])
  const [showList, setShowList] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const data = await btsAPI.getAll()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const submitData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      }
      await btsAPI.create(submitData)
      setMessage('✅ BTS post created successfully!')
      setFormData({
        title: '',
        content: '',
        contentType: 'Blog Post',
        featuredImage: '',
        videoUrl: '',
        tags: '',
      })
      setPreview('')
      fetchPosts()
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this post?')) {
      try {
        await btsAPI.delete(id)
        setMessage('✅ Post deleted!')
        fetchPosts()
      } catch (error) {
        setMessage(`❌ Error: ${error.message}`)
      }
    }
  }

  return (
    <div className="form-section">
      <div className="form-container">
        <h2>🎬 Create Behind the Scenes Post</h2>
        <p className="form-description">Share videos, photos, and exclusive content</p>
        
        {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Post Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="form-group">
            <label>Content Type</label>
            <select name="contentType" value={formData.contentType} onChange={handleChange}>
              <option>Blog Post</option>
              <option>Photo Series</option>
              <option>Video</option>
              <option>Announcement</option>
            </select>
          </div>

          <div className="form-group">
            <label>Image or Video (Optional)</label>
            <div className="image-upload">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaChange}
                id="media-upload"
              />
              <label htmlFor="media-upload" className="upload-btn">
                📤 Upload Image/Video
              </label>
            </div>
            {preview && (
              <div className="image-preview">
                {formData.featuredImage.startsWith('data:video') ? (
                  <video src={preview} controls style={{ width: '100%', borderRadius: '8px' }} />
                ) : (
                  <img src={preview} alt="Preview" />
                )}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Video URL (Optional)</label>
            <input
              type="url"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              placeholder="https://youtube.com/embed/..."
            />
          </div>

          <div className="form-group">
            <label>Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="6"
              placeholder="Write your post here..."
              required
            />
          </div>

          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="writing, creative, behind-the-scenes"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : '✨ Create Post'}
          </button>
        </form>
      </div>

      {/* Posts List */}
      <div className="list-container">
        <button 
          className="toggle-btn"
          onClick={() => setShowList(!showList)}
        >
          {showList ? '▼' : '▶'} My Posts ({posts.length})
        </button>

        {showList && (
          <div className="items-grid">
            {posts.length === 0 ? (
              <p className="empty-message">No posts yet</p>
            ) : (
              posts.map((post) => (
                <div key={post._id} className="item-card">
                  {post.featuredImage && (
                    <img src={post.featuredImage} alt={post.title} className="item-img" />
                  )}
                  <h4>{post.title}</h4>
                  <p className="item-meta">{post.contentType}</p>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(post._id)}
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

export default CreateBTSForm