import { useState, useEffect } from 'react'
import { booksAPI } from '../utils/api'
import './AdminForms.css'

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
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [books, setBooks] = useState([])
  const [showBooks, setShowBooks] = useState(false)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const data = await booksAPI.getAll()
      setBooks(data)
    } catch (error) {
      console.error('Error fetching books:', error)
    }
  }

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

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        setFormData({
          ...formData,
          coverImage: reader.result,
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
      setPreview('')
      fetchBooks()
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteBook = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await booksAPI.delete(id)
        setMessage('✅ Book deleted successfully!')
        fetchBooks()
      } catch (error) {
        setMessage(`❌ Error deleting book: ${error.message}`)
      }
    }
  }

  return (
    <div className="form-section">
      <div className="form-container">
        <h2>📚 Create a New Book</h2>
        {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}
        
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              required
            />
          </div>

          <div className="form-group">
            <label>Book Cover Image *</label>
            <div className="image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="book-cover"
                required
              />
              <label htmlFor="book-cover" className="upload-btn">
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
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Book synopsis"
            />
          </div>

          <div className="form-row">
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
                placeholder="Number of pages"
              />
            </div>
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

          <div className="form-group">
            <label>Goodreads Link</label>
            <input
              type="url"
              name="buyLinks.goodreads"
              value={formData.buyLinks.goodreads}
              onChange={handleChange}
              placeholder="https://goodreads.com/..."
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : '✨ Create Book'}
          </button>
        </form>
      </div>

      {/* Books List */}
      <div className="books-list-container">
        <button 
          className="toggle-btn"
          onClick={() => setShowBooks(!showBooks)}
        >
          {showBooks ? '▼' : '▶'} My Books ({books.length})
        </button>

        {showBooks && (
          <div className="books-grid">
            {books.length === 0 ? (
              <p className="empty-message">No books yet. Create your first one!</p>
            ) : (
              books.map((book) => (
                <div key={book._id} className="book-item">
                  {book.coverImage && (
                    <img src={book.coverImage} alt={book.title} className="book-cover" />
                  )}
                  <div className="book-info">
                    <h3>{book.title}</h3>
                    <p className="book-date">
                      {new Date(book.publicationDate).toLocaleDateString()}
                    </p>
                    <div className="book-actions">
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDeleteBook(book._id)}
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

export default CreateBookForm