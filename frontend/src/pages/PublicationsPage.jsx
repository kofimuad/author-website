import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { publicationsAPI } from '../utils/api'
import './PublicationsPage.css'

function PublicationsPage() {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const data = await publicationsAPI.getAll()
        setPublications(data)
      } catch (error) {
        console.error('Error fetching publications:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPublications()
  }, [])

  // Filter publications
  const categories = [
    'all',
    'literary magazine',
    'poetry journal',
    'independent magazine',
    'online literary magazine',
    'poetry organization',
    'literary journal',
    'international journal',
    'substack essays',
    'medium essays',
    'personal blog'
  ]
  
  const filtered = publications.filter(pub => {
    const matchesCategory = activeCategory === 'all' || pub.category.toLowerCase() === activeCategory
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.magazine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading) return <div className="container"><p>Loading publications...</p></div>

  return (
    <div className="publications-page">
      <div className="container">
        {/* Hero */}
        <div className="pub-hero">
          <h1>Other Publications</h1>
          <p className="pub-subtitle">Featured in prestigious literary magazines, journals, and platforms</p>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search publications, magazines, or poems..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          <p className="filter-label">Filter by Category:</p>
          <div className="filter-buttons">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'all' ? 'All' : cat.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="results-count">
          Showing {filtered.length} publication{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Featured Badge */}
        {filtered.some(p => p.featured) && activeCategory === 'all' && (
          <div className="featured-info">
            <span className="featured-badge">⭐ Featured Publications</span>
          </div>
        )}

        {/* Publications Grid */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>📚 No publications found matching your search.</p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm('')
                setActiveCategory('all')
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="publications-grid">
            {filtered.map((pub, idx) => (
              <article key={pub._id} className={`pub-card ${pub.featured ? 'featured' : ''}`} style={{ animationDelay: `${idx * 0.05}s` }}>
                {/* Featured Badge */}
                {pub.featured && <div className="featured-ribbon">⭐ Featured</div>}

                {/* Magazine Info */}
                <div className="mag-header">
                  {pub.publicationLogo ? (
                    <img src={pub.publicationLogo} alt={pub.magazine} className="mag-logo" />
                  ) : (
                    <div className="mag-logo-placeholder">{pub.magazine.charAt(0)}</div>
                  )}
                  <div className="mag-info">
                    <h4 className="magazine-name">{pub.magazine}</h4>
                    <span className="pub-category">{pub.category}</span>
                  </div>
                </div>

                {/* Poem Title */}
                <h3 className="poem-title">{pub.title}</h3>

                {/* Publication Date */}
                <p className="pub-date">
                  {new Date(pub.publishedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>

                {/* Poem Excerpt */}
                {pub.poemExcerpt && (
                  <div className="poem-excerpt">
                    <p>{pub.poemExcerpt}</p>
                  </div>
                )}

                {/* Description */}
                {pub.description && (
                  <p className="pub-description">{pub.description}</p>
                )}

                {/* Read Button */}
                {pub.readUrl && (
                  <a 
                    href={pub.readUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Read on {pub.magazine} →
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PublicationsPage