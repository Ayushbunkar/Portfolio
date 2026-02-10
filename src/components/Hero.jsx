import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import MagneticButton from './MagneticButton'
import { TypewriterText } from './GlitchText'

// Floating gallery images - using placeholder gradients (5 cards with proper spacing)
const galleryItems = [
  { id: 1, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', rotation: -12, x: -120, y: -140, z: 20, scale: 0.9 },
  { id: 2, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', rotation: -5, x: 60, y: -180, z: 60, scale: 0.95 },
  { id: 3, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', rotation: 0, x: 0, y: 0, z: 100, scale: 1.15, main: true },
  { id: 4, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', rotation: 6, x: -80, y: 160, z: 50, scale: 0.9 },
  { id: 5, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', rotation: 10, x: 100, y: 120, z: 30, scale: 0.85 },
]

const Hero = () => {
  const heroRef = useRef(null)
  const galleryRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // Floating animation for gallery cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation
      gsap.fromTo('.gallery-card', 
        { 
          opacity: 0, 
          scale: 0.5,
          y: 100,
          rotateX: 45,
        },
        { 
          opacity: 1, 
          scale: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.1,
          delay: 1.5,
          ease: 'back.out(1.7)',
        }
      )
      
      // Continuous floating animation
      gsap.to('.gallery-card', {
        y: '+=15',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.2,
          from: 'random',
        }
      })
      
      // Subtle rotation animation
      gsap.to('.gallery-card-inner', {
        rotateY: '+=5',
        rotateX: '-=3',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3,
      })
    }, galleryRef)

    return () => ctx.revert()
  }, [])

  const roles = [
    'Frontend Developer',
    'UI/UX Designer', 
    'Creative Coder',
    'Problem Solver'
  ]

  const letterVariants = {
    hidden: { y: 100, opacity: 0, rotateX: -90 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  }

  const name = "AYUSH"
  const lastName = "BUNKAR"

  return (
    <section id="home" className="hero" ref={heroRef}>
      {/* Animated Background */}
      <div className="hero-bg">
        <div className="grid-overlay" />
        <div className="gradient-overlay" />
        <motion.div 
          className="orb orb-1"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="orb orb-2"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="orb orb-3"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div className="hero-content" style={{ y }}>
        {/* Status Badge */}
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: 'backOut' }}
        >
          <span className="badge-dot" />
          <span className="badge-text">Available for work</span>
          <span className="badge-divider">|</span>
          <span className="badge-location">
            <svg className="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            India
          </span>
        </motion.div>

        {/* Main Title */}
        <div className="hero-title">
          <motion.p
            className="hero-intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Hello, I'm
          </motion.p>
          
          <h1 className="hero-name">
            <span className="name-line">
              {name.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="letter"
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
            <span className="name-line gradient-text">
              {lastName.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="letter"
                  custom={index + name.length}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.div
            className="hero-role"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span className="role-prefix">I'm a </span>
            <span className="role-dynamic">
              <TypewriterText texts={roles} speed={80} deleteSpeed={40} delay={1500} />
            </span>
          </motion.div>
        </div>

        {/* Decorative Line */}
        <motion.div
          className="hero-divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Description */}
        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          Crafting <span className="highlight">immersive digital experiences</span> through 
          clean code, stunning animations, and pixel-perfect design. Turning complex 
          ideas into <span className="highlight">elegant solutions</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <MagneticButton href="#projects" className="filled">
            <span>View My Work</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </MagneticButton>
          <MagneticButton href="#contact">
            <span>Get In Touch</span>
          </MagneticButton>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="hero-socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map((social, index) => (
            <motion.a
              key={social}
              href="#"
              className="social-link"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 + index * 0.1 }}
              whileHover={{ y: -3, color: '#6366f1' }}
            >
              {social}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Side Text */}
      <motion.div
        className="hero-side-text left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span>PORTFOLIO © 2026</span>
      </motion.div>
      <motion.div
        className="hero-side-text right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span>BASED IN INDIA</span>
      </motion.div>

      {/* Floating 3D Gallery */}
      <div className="floating-gallery" ref={galleryRef}>
        <div className="gallery-container">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`gallery-card ${item.main ? 'gallery-card-main' : ''}`}
              style={{
                '--card-x': `${item.x}px`,
                '--card-y': `${item.y}px`,
                '--card-rotation': `${item.rotation}deg`,
                '--card-scale': item.scale,
                '--card-z': `${item.z}px`,
              }}
              whileHover={{ 
                scale: item.scale * 1.15, 
                zIndex: 100,
                rotateY: 0,
                rotateX: 0,
              }}
            >
              <div className="gallery-card-inner">
                <div 
                  className="gallery-card-image"
                  style={{ background: item.gradient }}
                >
                  <div className="gallery-card-shine" />
                  <div className="gallery-card-content">
                    <span className="gallery-card-number">0{item.id}</span>
                    <div className="gallery-card-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="gallery-card-glow" style={{ background: item.gradient }} />
              </div>
            </motion.div>
          ))}
          
          {/* Decorative elements */}
          <div className="gallery-orbit gallery-orbit-1" />
          <div className="gallery-orbit gallery-orbit-2" />
          <div className="gallery-center-glow" />
        </div>
      </div>
    </section>
  )
}

export default Hero
