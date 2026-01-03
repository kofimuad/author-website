// ============================================
// File: frontend/src/pages/HomePage.jsx
// Fixed with /publications route
// ============================================

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { booksAPI, publicationsAPI, btsAPI } from '../utils/api'
import './HomePage.css'

function HomePage() {
  const [featured, setFeatured] = useState({ books: [], publications: [], posts: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const [books, publications, posts] = await Promise.all([
          booksAPI.getAll(),
          publicationsAPI.getAll(),
          btsAPI.getAll(),
        ])
        setFeatured({
          books: books.slice(0, 3),
          publications: publications.slice(0, 2),
          posts: posts.slice(0, 1),
        })
      } catch (error) {
        console.error('Error fetching featured content:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  if (loading) {
    return <div className="container"><p>Loading...</p></div>
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to Kataru's Corner</h1>
          <p className="subtitle">Discover stories, insights, and the creative journey</p>
          <div className="hero-buttons">
            <Link to="/books" className="btn btn-primary">Explore Books</Link>
            <Link to="/other-publications" className="btn btn-secondary">Read Publications</Link>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="featured-section">
        <div className="container">
          <h2>Featured Books</h2>
          <div className="grid grid-3">
            {featured.books.map((book) => (
              <div key={book._id} className="card">
                {book.coverImage && (
                  <img src={book.coverImage} alt={book.title} className="card-image" />
                )}
                <h3>{book.title}</h3>
                <p>{book.description?.substring(0, 100)}...</p>
                <Link to={`/books/${book._id}`} className="btn btn-outline">
                  View Details
                </Link>
              </div>
            ))}
          </div>
          <div className="section-footer">
            <Link to="/books">View All Books →</Link>
          </div>
        </div>
      </section>

      {/* Featured Publications */}
      <section className="featured-section">
        <div className="container">
          <h2>Latest Publications</h2>
          <div className="grid grid-2">
            {featured.publications.map((publication) => (
              <div key={publication._id} className="card">
                {publication.thumbnailImage && (
                  <img src={publication.thumbnailImage} alt={publication.title} className="card-image" />
                )}
                <h3>{publication.title}</h3>
                <p>{publication.excerpt || publication.content?.substring(0, 100)}...</p>
                <small>{publication.readTime || 5} min read</small>
                <Link to={`/other-publications`} className="btn btn-outline">
                  Read Publication
                </Link>
              </div>
            ))}
          </div>
          <div className="section-footer">
            <Link to="/other-publications">View All Publications →</Link>
          </div>
        </div>
      </section>

      {/* Latest Behind the Scenes */}
      {featured.posts.length > 0 && (
        <section className="featured-section">
          <div className="container">
            <h2>Behind the Scenes</h2>
            {featured.posts.map((post) => (
              <div key={post._id} className="card">
                {post.featuredImage && (
                  <img src={post.featuredImage} alt={post.title} className="card-image" />
                )}
                <h3>{post.title}</h3>
                <p className="meta">{post.contentType}</p>
                <p>{post.content?.substring(0, 150)}...</p>
                <Link to={`/behind-the-scenes/${post._id}`} className="btn btn-outline">
                  Read More
                </Link>
              </div>
            ))}
            <div className="section-footer">
              <Link to="/behind-the-scenes">View All Posts →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <h2>Stay Updated</h2>
          <p>Get the latest publications and updates directly to your inbox</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email" required />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default HomePage