import { useState } from 'react'
import './ContactPage.css'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="container">
      <div className="contact-page">
        <h1>Get in Touch</h1>
        <p className="contact-intro">I'd love to hear from you! Whether you have questions, feedback, or just want to say hello.</p>

        <div className="contact-grid">
          <div className="contact-card">
            <h3>Contact Me</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
            {submitted && <p className="success-message">✅ Message sent! I'll get back to you soon.</p>}
          </div>

          <div className="contact-info">
            <div className="info-card">
              <h3>Publisher</h3>
              <p>Shaherazad Shelves</p>
              <p><a href="https://shaherazadshelves.com/">Get in Touch</a></p>
            </div>

            {/* <div className="info-card">
              <h3>Agent</h3>
              <p>Agent Name</p>
              <p>Agency Name</p>
              <p>agent@agency.com</p>
            </div> */}

            <div className="info-card">
              <h3>Follow Me</h3>
              <p><a href="https://www.instagram.com/kforkataru/">Instagram</a></p>
              <p><a href="https://x.com/kforkataru">Twitter</a></p>
              {/* <p><a href="#tiktok">TikTok</a></p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage