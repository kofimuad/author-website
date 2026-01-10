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
  const [editingId, setEditingId] = useState(null)

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

  const handleRemoveImage = () => {
    setPreview('')
    setFormData({
      ...formData,
      coverImage: '',
    })
    // Reset file input
    const fileInput = document.getElementById('book-cover')
    if (fileInput) fileInput.value = ''
  }

  const resetForm = () => {
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
    setEditingId(null)
    const fileInput = document.getElementById('book-cover')
    if (fileInput) fileInput.value = ''
  }

  const handleEdit = (book) => {
    setFormData({
      title: book.title,
      description: book.description,
      genre: book.genre || [],
      publicationDate: book.publicationDate?.split('T')[0] || '',
      pages: book.pages || '',
      isbn: book.isbn || '',
      coverImage: book.coverImage,
      buyLinks: book.buyLinks || { amazon: '', goodreads: '', appleBooks: '' },
      authorNote: book.authorNote || '',
    })
    setPreview(book.coverImage || '')
    setEditingId(book._id)
    
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
      if (editingId) {
        await booksAPI.update(editingId, formData)
        setMessage('✅ Book updated successfully!')
      } else {
        await booksAPI.create(formData)
        setMessage('✅ Book created successfully!')
      }
      resetForm()
      fetchBooks()
      setTimeout(() => setMessage(''), 3000)
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
        <h2>{editingId ? '✏️ Edit Book' : '📚 Create a New Book'}</h2>
        <p className="form-description">
          {editingId ? 'Update your book details' : 'Add a new book to your collection'}
        </p>
        
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
            <label>Book Cover Image {editingId ? '' : '*'}</label>
            <div className="image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="book-cover"
                required={!editingId}
              />
              <label htmlFor="book-cover" className="upload-btn">
                📤 Choose Image from Computer
              </label>
            </div>
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
                <button 
                  type="button"
                  className="btn btn-delete"
                  onClick={handleRemoveImage}
                  style={{ marginTop: '0.8rem', width: '100%' }}
                >
                  🗑️ Remove Image
                </button>
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
            <label>ISBN</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Book ISBN"
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

          <div className="form-group">
            <label>Apple Books Link</label>
            <input
              type="url"
              name="buyLinks.appleBooks"
              value={formData.buyLinks.appleBooks}
              onChange={handleChange}
              placeholder="https://books.apple.com/..."
            />
          </div>

          <div className="form-group">
            <label>Author's Note</label>
            <textarea
              name="authorNote"
              value={formData.authorNote}
              onChange={handleChange}
              rows="3"
              placeholder="Add a personal note about this book"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : editingId ? '✏️ Update Book' : '✨ Create Book'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={resetForm} disabled={loading}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Books List */}
      <div className="list-container">
        <button 
          className="toggle-btn"
          onClick={() => setShowBooks(!showBooks)}
        >
          {showBooks ? '▼' : '▶'} My Books ({books.length})
        </button>

        {showBooks && (
          <div className="items-grid">
            {books.length === 0 ? (
              <p className="empty-message">No books yet. Create your first one!</p>
            ) : (
              books.map((book) => (
                <div key={book._id} className="item-card">
                  {book.coverImage && (
                    <img src={book.coverImage} alt={book.title} className="item-img" />
                  )}
                  <div className="item-info">
                    <h4>{book.title}</h4>
                    <p className="item-date">
                      {new Date(book.publicationDate).toLocaleDateString()}
                    </p>
                    {book.pages && (
                      <p className="item-meta">{book.pages} pages</p>
                    )}
                    <div className="item-actions">
                      <button
                        className="btn btn-outline"
                        onClick={() => handleEdit(book)}
                      >
                        ✏️ Edit
                      </button>
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