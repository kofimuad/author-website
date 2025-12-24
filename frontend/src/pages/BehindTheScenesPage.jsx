import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { btsAPI } from '../utils/api'
import './BehindTheScenesPage.css'

function BehindTheScenesPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeType, setActiveType] = useState('all')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await btsAPI.getAll()
        setPosts(data.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate)))
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const contentTypes = ['all', 'blog post', 'photo series', 'video', 'announcement']
  const filtered = activeType === 'all' 
    ? posts 
    : posts.filter(p => p.contentType.toLowerCase() === activeType)

  if (loading) return <div className="container"><p>Loading...</p></div>

  return (
    <div className="bts-page">
      <div className="container">
        <h1>Behind the Scenes</h1>
        <p className="page-subtitle">Discover the creative process and exclusive content</p>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          {contentTypes.map(type => (
            <button
              key={type}
              className={`filter-btn ${activeType === type ? 'active' : ''}`}
              onClick={() => setActiveType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Timeline + Gallery */}
        <div className="timeline-gallery">
          {filtered.length === 0 ? (
            <p className="empty-state">No posts in this category yet</p>
          ) : (
            <div className="timeline">
              {filtered.map((post, idx) => (
                <div key={post._id} className="timeline-item">
                  {/* Timeline Dot */}
                  <div className="timeline-dot"></div>
                  
                  {/* Timeline Content */}
                  <div className={`timeline-content ${idx % 2 === 0 ? 'left' : 'right'}`}>
                    <div className="content-card">
                      {/* Video or Image */}
                      {post.contentType.toLowerCase() === 'video' && post.videoEmbed ? (
                        <div className="video-embed" dangerouslySetInnerHTML={{ __html: post.videoEmbed }} />
                      ) : post.featuredImage ? (
                        <img src={post.featuredImage} alt={post.title} className="post-image" />
                      ) : null}

                      {/* Content */}
                      <div className="post-info">
                        <span className="content-type">{post.contentType}</span>
                        <h3>{post.title}</h3>
                        <p className="post-date">{new Date(post.postedDate).toLocaleDateString()}</p>
                        <p className="post-excerpt">{post.content?.substring(0, 120)}...</p>
                        
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="tags">
                            {post.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="tag">#{tag}</span>
                            ))}
                          </div>
                        )}

                        <Link to={`/behind-the-scenes/${post._id}`} className="btn btn-outline">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BehindTheScenesPage