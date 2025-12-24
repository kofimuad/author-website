import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { interviewsAPI } from '../utils/api'
import './BooksPage.css'

function InterviewsPublicationsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const data = await interviewsAPI.getAll()
        setItems(data)
      } catch (error) {
        console.error('Error fetching interviews:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchInterviews()
  }, [])

  if (loading) return <div className="container"><p>Loading...</p></div>

  return (
    <div className="books-page container">
      <h1>Interviews & Publications</h1>
      {items.length === 0 ? (
        <p>No interviews or publications yet. Check back soon!</p>
      ) : (
        <div className="grid grid-2">
          {items.map((item) => (
            <div key={item._id} className="card">
              {item.featuredImage && <img src={item.featuredImage} alt={item.title} className="card-image" />}
              <h3>{item.title}</h3>
              <p className="meta">{item.publicationName}</p>
              <p className="genre">{item.publicationType}</p>
              <p>{item.description?.substring(0, 80)}...</p>
              <Link to={`/interviews-publications/${item._id}`} className="btn btn-outline">
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default InterviewsPublicationsPage