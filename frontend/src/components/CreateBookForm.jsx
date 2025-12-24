import { useState } from 'react'
import { booksAPI } from '../utils/api'

function CreateBookForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: [],
    publicationDate: '',
    pages: '',
    isbn: '',
    coverImage: '',
    buyLinks: {
      amazon: '',
      goodreads: '',
      appleBooks: '',
    },
    authorNote: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      await booksAPI.create(formData)
      setMessage('✅ Book created successfully!')
      setFormData({
        title: '',
        description: '',
        genre: [],
        publicationDate: '',
        pages: '',
        isbn: '',
        coverImage: '',
        buyLinks: { amazon: '', goodreads: '', appleBooks: '' },
        authorNote: '',
      })
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h2>Create a New Book</h2>
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
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Publication Date</label>
          <input
            type="date"
            name="publicationDate"
            value={formData.publicationDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Pages</label>
          <input
            type="number"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Cover Image URL</label>
          <input
            type="url"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="form-group">
          <label>Amazon Link</label>
          <input
            type="url"
            name="buyLinks.amazon"
            value={formData.buyLinks.amazon}
            onChange={handleChange}
            placeholder="https://amazon.com/..."
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Book'}
        </button>
      </form>
    </div>
  )
}

export default CreateBookForm
