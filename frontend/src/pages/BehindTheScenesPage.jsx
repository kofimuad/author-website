import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { btsAPI } from '../utils/api'
import './BooksPage.css'

function BehindTheScenesPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await btsAPI.getAll()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) return <div className="container"><p>Loading...</p></div>

  return (
    <div className="books-page container">
      <h1>Behind the Scenes</h1>
      {posts.length === 0 ? (
        <p>No posts yet. Check back soon!</p>
      ) : (
        <div className="grid grid-2">
          {posts.map((post) => (
            <div key={post._id} className="card">
              {post.featuredImage && <img src={post.featuredImage} alt={post.title} className="card-image" />}
              <h3>{post.title}</h3>
              <p className="meta">{post.contentType}</p>
              <p>{post.content?.substring(0, 100)}...</p>
              <Link to={`/behind-the-scenes/${post._id}`} className="btn btn-outline">
                Read More
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BehindTheScenesPage