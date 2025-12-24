import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { interviewsAPI } from '../utils/api'
import './InterviewsPublicationsPage.css'

function InterviewsPublicationsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeType, setActiveType] = useState('all')

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const data = await interviewsAPI.getAll()
        setItems(data.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)))
      } catch (error) {
        console.error('Error fetching interviews:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchInterviews()
  }, [])

  const types = ['all', 'interview', 'article', 'feature', 'podcast', 'appearance', 'video']
  const filtered = activeType === 'all'
    ? items
    : items.filter(i => i.publicationType.toLowerCase() === activeType)

  if (loading) return <div className="container"><p>Loading...</p></div>

  return (
    <div className="interviews-page">
      <div className="container">
        <h1>Interviews & Publications</h1>
        <p className="page-subtitle">Featured appearances and media coverage</p>

        {/* Filter */}
        <div className="filter-buttons">
          {types.map(type => (
            <button
              key={type}
              className={`filter-btn ${activeType === type ? 'active' : ''}`}
              onClick={() => setActiveType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filtered.length === 0 ? (
          <p className="empty-state">No items in this category</p>
        ) : (
          <div className="gallery-grid">
            {filtered.map((item, idx) => (
              <div key={item._id} className="gallery-item" style={{ animationDelay: `${idx * 0.1}s` }}>
                {/* Video Embed */}
                {item.publicationType.toLowerCase() === 'video' && item.videoEmbed ? (
                  <div className="item-video" dangerouslySetInnerHTML={{ __html: item.videoEmbed }} />
                ) : item.featuredImage ? (
                  <div className="item-image-wrapper">
                    <img src={item.featuredImage} alt={item.title} />
                  </div>
                ) : (
                  <div className="item-placeholder">
                    <span>🎬</span>
                  </div>
                )}

                {/* Info */}
                <div className="item-info">
                  <div className="item-header">
                    <span className="publication-type">{item.publicationType}</span>
                    {item.publicationLogo && (
                      <img src={item.publicationLogo} alt="Logo" className="pub-logo" />
                    )}
                  </div>
                  
                  <h3>{item.title}</h3>
                  {item.publicationName && (
                    <p className="publication-name">{item.publicationName}</p>
                  )}
                  <p className="item-date">{new Date(item.publishedDate).toLocaleDateString()}</p>
                  
                  {item.description && (
                    <p className="item-description">{item.description.substring(0, 100)}...</p>
                  )}

                  <div className="item-actions">
                    <Link to={`/interviews-publications/${item._id}`} className="btn btn-outline">
                      View
                    </Link>
                    {item.externalLink && (
                      <a href={item.externalLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        Open
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default InterviewsPublicationsPage