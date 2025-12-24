import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { storiesAPI } from '../utils/api'
import './BooksPage.css'

function StoriesPage() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await storiesAPI.getAll()
        setStories(data)
      } catch (error) {
        console.error('Error fetching stories:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStories()
  }, [])

  if (loading) return <div className="container"><p>Loading...</p></div>

  return (
    <div className="books-page container">
      <h1>Stories</h1>
      {stories.length === 0 ? (
        <p>No stories yet. Check back soon!</p>
      ) : (
        <div className="grid grid-3">
          {stories.map((story) => (
            <div key={story._id} className="card">
              {story.thumbnailImage && <img src={story.thumbnailImage} alt={story.title} className="card-image" />}
              <h3>{story.title}</h3>
              <p>{story.excerpt || story.content?.substring(0, 80)}...</p>
              <Link to={`/stories/${story._id}`} className="btn btn-outline">
                Read Story
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default StoriesPage