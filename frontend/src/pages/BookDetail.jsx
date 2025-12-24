import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { booksAPI } from '../utils/api'

function BookDetail() {
  const { bookId } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await booksAPI.getOne(bookId)
        setBook(data)
      } catch (error) {
        console.error('Error fetching book:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBook()
  }, [bookId])

  if (loading) return <div className="container"><p>Loading...</p></div>
  if (!book) return <div className="container"><p>Book not found</p></div>

  return (
    <div className="container">
      <div className="book-detail">
        {book.coverImage && <img src={book.coverImage} alt={book.title} className="cover-image" />}
        <div className="book-info">
          <h1>{book.title}</h1>
          <p className="meta">Published: {new Date(book.publicationDate).toLocaleDateString()}</p>
          <p>{book.description}</p>
          {book.authorNote && (
            <div className="author-note">
              <h3>Author's Note</h3>
              <p>{book.authorNote}</p>
            </div>
          )}
          <div className="buy-links">
            <h3>Where to Buy</h3>
            {book.buyLinks?.amazon && (
              <a href={book.buyLinks.amazon} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Amazon
              </a>
            )}
            {book.buyLinks?.appleBooks && (
              <a href={book.buyLinks.appleBooks} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Apple Books
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetail