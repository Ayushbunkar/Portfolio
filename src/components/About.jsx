import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedCounter from './AnimatedCounter'
import TiltCard from './TiltCard'
import MagneticButton from './MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-image-wrapper',
        { y: 100, rotation: -5 },
        {
          y: 0,
          rotation: 0,
          scrollTrigger: {
            trigger: '.about',
            start: 'top center',
            end: 'center center',
            scrub: 1,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  }

  const stats = [
    { number: 3, suffix: '+', label: 'Years of Experience' },
    { number: 50, suffix: '+', label: 'Projects Delivered' },
    { number: 30, suffix: '+', label: 'Happy Clients' },
    { number: 100, suffix: '%', label: 'Client Satisfaction' },
  ]

  const services = [
    { icon: '🎨', title: 'UI/UX Design', desc: 'Beautiful interfaces' },
    { icon: '💻', title: 'Web Development', desc: 'Modern websites' },
    { icon: '📱', title: 'Responsive', desc: 'All devices' },
    { icon: '⚡', title: 'Performance', desc: 'Lightning fast' },
  ]

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about-container">
        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.span className="section-label" variants={itemVariants}>
            About Me
          </motion.span>
          <motion.h2 className="section-title" variants={itemVariants}>
            Passionate About
            <br />
            <span className="gradient">Creating Digital Art</span>
          </motion.h2>
          <motion.p className="about-text" variants={itemVariants}>
            I'm <strong>Ayush Bunkar</strong>, a creative developer based in India with 
            a passion for crafting exceptional digital experiences. I combine technical 
            expertise with artistic vision to build websites that are not just functional, 
            but truly memorable.
          </motion.p>
          <motion.p className="about-text" variants={itemVariants}>
            My approach blends <span className="highlight">cutting-edge technology</span> with 
            thoughtful design, ensuring every project delivers both aesthetic appeal and 
            outstanding performance. I believe in the power of <span className="highlight">
            smooth animations</span> and intuitive interfaces.
          </motion.p>

          <motion.div className="about-services" variants={itemVariants}>
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="service-icon">{service.icon}</span>
                <h4>{service.title}</h4>
                <p>{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="about-buttons" variants={itemVariants}>
            <MagneticButton href="#contact" className="filled">
              <span>Let's Talk</span>
            </MagneticButton>
            <MagneticButton href="/resume.pdf">
              <span>Download CV</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </MagneticButton>
          </motion.div>
        </motion.div>

        <div className="about-visual">
          <motion.div
            className="about-image-wrapper"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            <TiltCard>
              <div className="about-image">
                <div className="image-placeholder">
                  <span>AB</span>
                </div>
                <div className="image-overlay" />
              </div>
            </TiltCard>
            
            <motion.div
              className="floating-element elem-1"
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span>React</span>
            </motion.div>
            <motion.div
              className="floating-element elem-2"
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span>GSAP</span>
            </motion.div>
            <motion.div
              className="floating-element elem-3"
              animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span>Framer</span>
            </motion.div>

            <motion.div
              className="experience-badge"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
            >
              <span className="exp-number">3+</span>
              <span className="exp-text">Years Exp.</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="about-stats">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <span className="stat-number">
              <AnimatedCounter target={stat.number} suffix={stat.suffix} duration={2} />
            </span>
            <span className="stat-label">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default About
