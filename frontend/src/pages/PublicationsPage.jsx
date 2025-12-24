import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PublicationsPage.css'

function PublicationsPage() {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Sample poetry publications data
  const samplePublications = [
    {
      id: 1,
      title: "The Silence Between Words",
      magazine: "The New Yorker",
      magazineLogo: "https://media.wired.com/photos/59269d37f3e3356fd800091f/191:100/w_1280,c_limit/newyorker.jpg",
      category: "Literary Magazine",
      publicationDate: "2023-05-15",
      excerpt: "A meditation on the spaces where meaning lives, exploring how silence can speak louder than verse.",
      readUrl: "https://www.newyorker.com",
      featured: true,
      poemExcerpt: "In the margins where words dare not tread,\nLives the truth we've always known—\nThat emptiness, too, has a voice.",
      author: "Featured in"
    },
    {
      id: 2,
      title: "Inheritance",
      magazine: "Poetry Magazine",
      magazineLogo: "https://poetrymagazine.org/images/pm-logo.png",
      category: "Poetry Journal",
      publicationDate: "2023-04-22",
      excerpt: "An exploration of family legacies and the poems we inherit from our ancestors.",
      readUrl: "https://www.poetrymagazine.org",
      featured: true,
      poemExcerpt: "My grandmother's words live in my bones,\nEach syllable a brick in the house\nI am still learning to call home.",
      author: "Featured in"
    },
    {
      id: 3,
      title: "Digital Dreams",
      magazine: "Ploughshares",
      magazineLogo: "https://www.pshares.org/images/logo.png",
      category: "Literary Magazine",
      publicationDate: "2023-03-10",
      excerpt: "Poetry in the age of screens and algorithms—finding humanity in the digital age.",
      readUrl: "https://www.pshares.org",
      featured: false,
      poemExcerpt: "The cursor blinks like a second heartbeat,\nWaiting for words that never quite arrive\nOn time.",
      author: "Featured in"
    },
    {
      id: 4,
      title: "Conversations with the Moon",
      magazine: "The Sun Magazine",
      magazineLogo: "https://www.thesunmagazine.org/images/sun-logo.png",
      category: "Independent Magazine",
      publicationDate: "2023-02-28",
      excerpt: "Nocturnal meditations and the stories the night tells to those who listen.",
      readUrl: "https://www.thesunmagazine.org",
      featured: false,
      poemExcerpt: "The moon remembers when we were stars,\nBefore we fell and forgot how to shine.",
      author: "Featured in"
    },
    {
      id: 5,
      title: "Urban Gardening",
      magazine: "Rattle",
      magazineLogo: "https://www.rattle.com/images/rattle-logo.png",
      category: "Poetry Journal",
      publicationDate: "2023-01-15",
      excerpt: "Growing life in concrete jungles—verses about resilience and renewal.",
      readUrl: "https://www.rattle.com",
      featured: false,
      poemExcerpt: "Among the cracks, seeds remember\nHow to become green,\nHow to teach the city to bloom.",
      author: "Featured in"
    },
    {
      id: 6,
      title: "Metamorphosis",
      magazine: "Academy of American Poets",
      magazineLogo: "https://www.poets.org/images/aap-logo.png",
      category: "Poetry Organization",
      publicationDate: "2022-12-05",
      excerpt: "A collection celebrating transformation and the courage it takes to change.",
      readUrl: "https://www.poets.org",
      featured: true,
      poemExcerpt: "We are all butterflies pretending to be caterpillars,\nWaiting for permission to become\nWhatever comes next.",
      author: "Featured in"
    },
    {
      id: 7,
      title: "Echoes from the Library",
      magazine: "Literary Hub",
      magazineLogo: "https://www.lithub.com/images/lh-logo.png",
      category: "Online Literary Magazine",
      publicationDate: "2022-11-20",
      excerpt: "Verses inspired by the worlds contained in books and the voices of forgotten authors.",
      readUrl: "https://www.lithub.com",
      featured: false,
      poemExcerpt: "Every book holds a thousand voices waiting\nTo whisper themselves into being\nOnce someone dares to listen.",
      author: "Featured in"
    },
    {
      id: 8,
      title: "Watershed",
      magazine: "Georgia Review",
      magazineLogo: "https://www.georgiaview.uga.edu/images/logo.png",
      category: "Literary Journal",
      publicationDate: "2022-10-10",
      excerpt: "Poems about water, memory, and the currents that shape our lives.",
      readUrl: "https://www.georgiaview.uga.edu",
      featured: false,
      poemExcerpt: "Water remembers everything we forget,\nEvery tear, every river, every storm—\nHolding our history in its depths.",
      author: "Featured in"
    },
    {
      id: 9,
      title: "Nocturne",
      magazine: "Tin House",
      magazineLogo: "https://www.tinhouse.com/images/logo.png",
      category: "Literary Magazine",
      publicationDate: "2022-09-15",
      excerpt: "Night songs and the music of solitude—exploring the beauty of darkness.",
      readUrl: "https://www.tinhouse.com",
      featured: true,
      poemExcerpt: "In the dark, we are all equally visible,\nOur shadows holding the secrets\nOur daylight selves refuse to speak.",
      author: "Featured in"
    },
    {
      id: 10,
      title: "Crossing Borders",
      magazine: "World Literature Today",
      magazineLogo: "https://www.worldliteraturetoday.org/images/logo.png",
      category: "International Journal",
      publicationDate: "2022-08-22",
      excerpt: "Translated and multilingual poetry exploring identity and belonging.",
      readUrl: "https://www.worldliteraturetoday.org",
      featured: false,
      poemExcerpt: "Language is a home I carry with me,\nAnd I am always arriving and leaving\nAt the same time.",
      author: "Featured in"
    }
  ]

  useEffect(() => {
    // Simulate loading from backend
    setPublications(samplePublications)
    setLoading(false)
  }, [])

  // Filter publications
  const categories = ['all', 'literary magazine', 'poetry journal', 'independent magazine', 'online literary magazine', 'poetry organization', 'literary journal', 'international journal']
  
  const filtered = publications.filter(pub => {
    const matchesCategory = activeCategory === 'all' || pub.category.toLowerCase() === activeCategory
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.magazine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading) return <div className="container"><p>Loading publications...</p></div>

  return (
    <div className="publications-page">
      <div className="container">
        {/* Hero */}
        <div className="pub-hero">
          <h1>Published Poetry</h1>
          <p className="pub-subtitle">Featured in prestigious literary magazines and journals</p>
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
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
              <article key={pub.id} className={`pub-card ${pub.featured ? 'featured' : ''}`} style={{ animationDelay: `${idx * 0.05}s` }}>
                {/* Featured Badge */}
                {pub.featured && <div className="featured-ribbon">⭐ Featured</div>}

                {/* Magazine Info */}
                <div className="mag-header">
                  {pub.magazineLogo ? (
                    <img src={pub.magazineLogo} alt={pub.magazine} className="mag-logo" />
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
                  {new Date(pub.publicationDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>

                {/* Poem Excerpt */}
                <div className="poem-excerpt">
                  <p>{pub.poemExcerpt}</p>
                </div>

                {/* Description */}
                <p className="pub-description">{pub.excerpt}</p>

                {/* Read Button */}
                <a 
                  href={pub.readUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Read on {pub.magazine} →
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PublicationsPage