import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { ScrambleText } from './GlitchText'

const Contact = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [focused, setFocused] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Add your form submission logic here
  }

  const contactInfo = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: 'hello@ayushbunkar.com',
      link: 'mailto:hello@ayushbunkar.com'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Location',
      value: 'India',
      link: null
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      ),
      label: 'Website',
      value: 'ayushbunkar.com',
      link: 'https://ayushbunkar.com'
    }
  ]

  const socialLinks = [
    { name: 'GitHub', icon: 'gh', url: 'https://github.com' },
    { name: 'LinkedIn', icon: 'in', url: 'https://linkedin.com' },
    { name: 'Twitter', icon: 'tw', url: 'https://twitter.com' },
    { name: 'Instagram', icon: 'ig', url: 'https://instagram.com' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  }

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact-container">
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">
            Let's Work <span className="gradient">Together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Let's create something amazing together. 
            I'm always open to discussing new opportunities.
          </p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Form */}
          <motion.div 
            className="contact-form-wrapper"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <motion.div 
                className={`form-group ${focused === 'name' ? 'focused' : ''} ${formData.name ? 'filled' : ''}`}
                variants={itemVariants}
              >
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  required
                />
                <label htmlFor="name">Your Name</label>
                <div className="form-line" />
              </motion.div>

              <motion.div 
                className={`form-group ${focused === 'email' ? 'focused' : ''} ${formData.email ? 'filled' : ''}`}
                variants={itemVariants}
              >
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  required
                />
                <label htmlFor="email">Your Email</label>
                <div className="form-line" />
              </motion.div>

              <motion.div 
                className={`form-group ${focused === 'subject' ? 'focused' : ''} ${formData.subject ? 'filled' : ''}`}
                variants={itemVariants}
              >
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused(null)}
                  required
                />
                <label htmlFor="subject">Subject</label>
                <div className="form-line" />
              </motion.div>

              <motion.div 
                className={`form-group ${focused === 'message' ? 'focused' : ''} ${formData.message ? 'filled' : ''}`}
                variants={itemVariants}
              >
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  required
                />
                <label htmlFor="message">Your Message</label>
                <div className="form-line" />
              </motion.div>

              <motion.div variants={itemVariants}>
                <MagneticButton type="submit" className="submit-btn">
                  <span>Send Message</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </MagneticButton>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="contact-info"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.div className="info-card" variants={itemVariants}>
              <h3>
                <ScrambleText text="Contact Info" />
              </h3>
              <div className="info-items">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link || '#'}
                    className="info-item"
                    whileHover={{ x: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className="info-icon">{info.icon}</span>
                    <div className="info-text">
                      <span className="info-label">{info.label}</span>
                      <span className="info-value">{info.value}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div className="social-card" variants={itemVariants}>
              <h3>Follow Me</h3>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="social-icon">{social.icon}</span>
                    <span className="social-name">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div className="availability-card" variants={itemVariants}>
              <div className="availability-status">
                <span className="status-dot" />
                <span>Available for freelance</span>
              </div>
              <p>Currently accepting new projects. Let's discuss your ideas!</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="brand-name">Ayush Bunkar</span>
            <span className="brand-tagline">Creative Developer</span>
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} All Rights Reserved. Built with ❤️ and React.
          </p>
        </div>
      </footer>
    </section>
  )
}

export default Contact
