import './AboutPage.css'

function AboutPage() {
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
              "We do not escape into philosophy, psychology, and the art - we go there to restore our shattered selvees into whole ones." - Anais Nin, from <i>In Favor of the Sensitive Man and Other Essays</i>
            </p>
            
            <p>
              Welcome to my corner of the literary world. I'm a writer passionate about creating stories 
              that explore the depths of human emotion, challenge perspectives, and ultimately, transform 
              readers into believers of impossible things.
            </p>
          {/* 
            <p>
              With over [X] years in the publishing industry, I've had the privilege of seeing my work 
              translated into [X] languages and reach readers across [X] countries. But more importantly, 
              I've built a community of readers who don't just consume my stories—they live in them.
            </p> */}
          </div>
        </section>

        {/* Key Sections */}
        {/* <div className="about-grid"> */}
          {/* Writing Journey */}
          {/* <section className="about-card journey-card">
            <h2>My Journey</h2>
            <div className="timeline-dots">
              <div className="dot-item">
                <span className="year">2018</span>
                <p>First publication</p>
              </div>
              <div className="dot-item">
                <span className="year">2020</span>
                <p>Bestseller status</p>
              </div>
              <div className="dot-item">
                <span className="year">2023</span>
                <p>International recognition</p>
              </div>
              <div className="dot-item">
                <span className="year">Today</span>
                <p>Continuing to create</p>
              </div>
            </div>
          </section> */}

          {/* Writing Style */}
          <section className="about-card style-card">
            <h2>What I Write</h2>
            <div className="style-list">
              <div className="style-item">
                <span className="style-emoji">🌟</span>
                <div>
                  <h4>Fantasy</h4>
                  <p>Epic worlds with magic, wonder, and adventure</p>
                </div>
              </div>
              <div className="style-item">
                <span className="style-emoji">🌍</span>
                <div>
                  <h4>Contemporary</h4>
                  <p>Real characters facing modern challenges</p>
                </div>
              </div>
              <div className="style-item">
                <span className="style-emoji">💫</span>
                <div>
                  <h4>Poetry</h4>
                  <p>Lyrical language capturing emotion and truth</p>
                </div>
              </div>
              <div className="style-item">
                <span className="style-emoji">✍️</span>
                <div>
                  <h4>Personal Essays</h4>
                  <p>Reflective explorations of life and meaning</p>
                </div>
              </div>
            </div>
          </section>
        {/* </div> */}

        {/* Philosophy */}
        <section className="about-section philosophy-section">
          <h2>My Philosophy</h2>
          <p>
            I believe fiction is not an escape from reality—it's a mirror held up to it. Through carefully 
            crafted characters and authentic scenarios, I aim to help readers understand themselves and others better.
          </p>
          <p>
            Every page I write is infused with the question: "What does it mean to be human?" Whether it's 
            exploring love, loss, identity, or transformation, my goal is to create stories that stick with you 
            long after you've closed the book.
          </p>
        </section>

        {/* Fun Facts */}
        {/* <section className="about-section fun-facts">
          <h2>Quick Facts</h2>
          <div className="facts-grid">
            <div className="fact-card">
              <h4>12+</h4>
              <p>Published Novels</p>
            </div>
            <div className="fact-card">
              <h4>50K+</h4>
              <p>Active Readers</p>
            </div>
            <div className="fact-card">
              <h4>25</h4>
              <p>Awards Won</p>
            </div>
            <div className="fact-card">
              <h4>8</h4>
              <p>Languages Published</p>
            </div>
          </div>
        </section> */}
      </div>
    </div>
  )
}

export default AboutPage