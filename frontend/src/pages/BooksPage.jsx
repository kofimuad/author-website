import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { booksAPI } from '../utils/api'
import './BooksPage.css'

function BooksPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [genre, setGenre] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await booksAPI.getAll(genre || undefined, sortBy)
        setBooks(data)
      } catch (error) {
        console.error('Error fetching books:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [genre, sortBy])

  if (loading) return <div className="container"><p>Loading...</p></div>

  return (
    <div className="books-page container">
      <h1>My Books</h1>
      <div className="filters">
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">All Genres</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Romance">Romance</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title">By Title</option>
        </select>
      </div>
      <div className="grid grid-3">
        {books.map((book) => (
          <div key={book._id} className="card">
            {book.coverImage && <img src={book.coverImage} alt={book.title} />}
            <h3>{book.title}</h3>
            <p className="genre">{book.genre?.join(', ')}</p>
            <p>{book.description?.substring(0, 80)}...</p>
            <Link to={`/books/${book._id}`} className="btn btn-outline">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BooksPage