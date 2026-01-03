import { useState, useEffect } from 'react'
import './AboutPage.css'

function AboutPage() {
  const defaultData = {
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
  }

  const [aboutData, setAboutData] = useState(defaultData)

  // Load custom about data from localStorage if it exists
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('aboutPageData')
      if (savedData) {
        const parsed = JSON.parse(savedData)
        setAboutData(parsed)
      }
    } catch (error) {
      console.error('Error loading about data:', error)
      setAboutData(defaultData)
    }
  }, [])

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <div className="about-hero">
          <div className="hero-content">
            <h1>About Me</h1>
            <p className="hero-subtitle">
              Author | Storyteller | Creative Mind
            </p>
          </div>
        </div>

        {/* Main Bio */}
        <section className="about-section bio-section">
          <div className="section-content">
            <p className="opening-quote">
              "{aboutData.openingQuote}" - <i>{aboutData.openingQuoteAuthor}</i>
            </p>
            
            <p>
              {aboutData.bioText}
            </p>
          </div>
        </section>

        {/* Writing Style */}
        <section className="about-card style-card">
          <h2>What I Write</h2>
          <div className="style-list">
            {aboutData.writingGenres && aboutData.writingGenres.map((genre, idx) => (
              <div key={idx} className="style-item">
                <span className="style-emoji">{genre.emoji}</span>
                <div>
                  <h4>{genre.title}</h4>
                  <p>{genre.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <br />

        {/* Philosophy */}
        <section className="about-section philosophy-section">
          <h2>My Philosophy</h2>
          {aboutData.philosophyText && aboutData.philosophyText.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>
              {paragraph}
            </p>
          ))}
        </section>
      </div>
    </div>
  )
}

export default AboutPage