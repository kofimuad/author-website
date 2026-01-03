import { useState, useEffect } from 'react'
import './AdminForms.css'

function CreateAboutForm() {
  const [formData, setFormData] = useState({
    openingQuote: "We do not escape into philosophy, psychology, and the art - we go there to restore our shattered selves into whole ones.",
    openingQuoteAuthor: "Anais Nin, from In Favor of the Sensitive Man and Other Essays",
    bioText: "Welcome to my corner of the literary world. I'm a writer passionate about creating stories that explore the depths of human emotion, challenge perspectives, and ultimately, transform readers into believers of impossible things.",
    philosophyText: "I believe fiction is not an escape from reality—it's a mirror held up to it. Through carefully crafted characters and authentic scenarios, I aim to help readers understand themselves and others better.\n\nEvery page I write is infused with the question: \"What does it mean to be human?\" Whether it's exploring love, loss, identity, or transformation, my goal is to create stories that stick with you long after you've closed the book.",
    writingGenres: [
      {
        emoji: '🌟',
        title: 'Fantasy',
        description: 'Epic worlds with magic, wonder, and adventure'
      },
      {
        emoji: '🌍',
        title: 'Contemporary',
        description: 'Real characters facing modern challenges'
      },
      {
        emoji: '💫',
        title: 'Poetry',
        description: 'Lyrical language capturing emotion and truth'
      },
      {
        emoji: '✍️',
        title: 'Personal Essays',
        description: 'Reflective explorations of life and meaning'
      }
    ]
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Load saved about data on component mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('aboutPageData')
      if (savedData) {
        const parsed = JSON.parse(savedData)
        setFormData(parsed)
      }
    } catch (error) {
      console.error('Error loading about data:', error)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleGenreChange = (index, field, value) => {
    const newGenres = [...formData.writingGenres]
    newGenres[index] = {
      ...newGenres[index],
      [field]: value,
    }
    setFormData({
      ...formData,
      writingGenres: newGenres,
    })
  }

  const addGenre = () => {
    setFormData({
      ...formData,
      writingGenres: [
        ...formData.writingGenres,
        { emoji: '✍️', title: '', description: '' },
      ],
    })
  }

  const removeGenre = (index) => {
    const newGenres = formData.writingGenres.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      writingGenres: newGenres,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      // Save to localStorage
      localStorage.setItem('aboutPageData', JSON.stringify(formData))
      setMessage('✅ About page updated successfully!')
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-section">
      <div className="form-container">
        <h2>📖 Edit About Page</h2>
        <p className="form-description">Customize your author biography and philosophy</p>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          {/* Opening Quote Section */}
          <div className="form-group">
            <label>Opening Quote *</label>
            <textarea
              name="openingQuote"
              value={formData.openingQuote}
              onChange={handleChange}
              rows="3"
              placeholder="Enter an inspiring quote about your work..."
              required
            />
          </div>

          <div className="form-group">
            <label>Quote Author</label>
            <input
              type="text"
              name="openingQuoteAuthor"
              value={formData.openingQuoteAuthor}
              onChange={handleChange}
              placeholder="e.g., Anais Nin, from In Favor of the Sensitive Man"
            />
          </div>

          {/* Bio Section */}
          <div className="form-group">
            <label>Your Biography *</label>
            <textarea
              name="bioText"
              value={formData.bioText}
              onChange={handleChange}
              rows="6"
              placeholder="Tell your story. What drives you as a writer? What makes your work unique?"
              required
            />
          </div>

          {/* Philosophy Section */}
          <div className="form-group">
            <label>Your Writing Philosophy *</label>
            <textarea
              name="philosophyText"
              value={formData.philosophyText}
              onChange={handleChange}
              rows="6"
              placeholder="What is your philosophy about writing and storytelling? How do you approach your craft?"
              required
            />
          </div>

          {/* Writing Genres/Styles */}
          <div className="genres-section">
            <label>What You Write</label>
            <p className="form-description">Add the genres or styles you write in</p>

            {formData.writingGenres && formData.writingGenres.map((genre, index) => (
              <div key={index} className="genre-item" style={{ 
                backgroundColor: 'var(--dark-bg)',
                padding: '1rem',
                borderRadius: '6px',
                marginBottom: '1rem',
                border: '1px solid var(--border-dark)'
              }}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Emoji</label>
                    <input
                      type="text"
                      value={genre.emoji}
                      onChange={(e) => handleGenreChange(index, 'emoji', e.target.value)}
                      placeholder="🌟"
                      maxLength="2"
                      style={{ maxWidth: '80px' }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={genre.title}
                      onChange={(e) => handleGenreChange(index, 'title', e.target.value)}
                      placeholder="e.g., Fantasy"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    value={genre.description}
                    onChange={(e) =>
                      handleGenreChange(index, 'description', e.target.value)
                    }
                    placeholder="Brief description of this genre..."
                  />
                </div>

                {formData.writingGenres.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-delete"
                    onClick={() => removeGenre(index)}
                    style={{ marginTop: '0.5rem' }}
                  >
                    🗑️ Remove Genre
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              className="btn btn-secondary"
              onClick={addGenre}
              style={{ marginBottom: '1.5rem' }}
            >
              + Add Genre
            </button>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : '💾 Save About Page'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateAboutForm