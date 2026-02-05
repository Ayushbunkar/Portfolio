import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltCard from './TiltCard'
import MagneticButton from './MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [hoveredProject, setHoveredProject] = useState(null)
  const [filter, setFilter] = useState('All')

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Full Stack',
      description: 'A modern e-commerce platform with seamless UX, real-time inventory, and AI-powered recommendations.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      color: '#6366f1',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      year: '2024',
    },
    {
      id: 2,
      title: 'Portfolio Dashboard',
      category: 'Frontend',
      description: 'Interactive analytics dashboard with beautiful 3D charts and real-time data visualization.',
      tech: ['React', 'D3.js', 'Three.js', 'GSAP'],
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
      year: '2024',
    },
    {
      id: 3,
      title: 'Social Media App',
      category: 'Full Stack',
      description: 'Full-featured social platform with real-time messaging, stories, and infinite scroll feed.',
      tech: ['Next.js', 'Socket.io', 'PostgreSQL', 'Redis'],
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
      year: '2023',
    },
    {
      id: 4,
      title: 'AI Content Generator',
      category: 'AI/ML',
      description: 'AI-powered content tool that creates blog posts, marketing copy, and social media content.',
      tech: ['Python', 'OpenAI', 'FastAPI', 'React'],
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
      year: '2024',
    },
  ]

  const categories = ['All', 'Full Stack', 'Frontend', 'AI/ML']
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-header',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects',
            start: 'top 80%',
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
      },
    },
  }

  const cardVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      y: -30,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="projects-header">
        <motion.span 
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Selected Work
        </motion.span>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Featured <span className="gradient">Projects</span>
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A curated collection of my best work, showcasing expertise in 
          modern web development and creative design.
        </motion.p>

        {/* Filter Tabs */}
        <motion.div 
          className="filter-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              className={`filter-tab ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
              {filter === cat && (
                <motion.div
                  className="tab-indicator"
                  layoutId="tabIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

      <motion.div 
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card-wrapper"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <TiltCard intensity={8}>
                <div 
                  className="project-card"
                  style={{ '--project-color': project.color }}
                >
                  {/* Project Number */}
                  <span className="project-number">
                    0{index + 1}
                  </span>

                  {/* Project Image/Preview */}
                  <div className="project-image">
                    <div 
                      className="project-placeholder"
                      style={{ background: project.gradient }}
                    >
                      <span className="project-initial">
                        {project.title.split(' ').map(w => w[0]).join('')}
                      </span>
                      
                      {/* Animated Background Shapes */}
                      <motion.div
                        className="bg-shape shape-1"
                        animate={{ 
                          rotate: 360,
                          scale: hoveredProject === project.id ? 1.2 : 1
                        }}
                        transition={{ 
                          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                          scale: { duration: 0.3 }
                        }}
                      />
                      <motion.div
                        className="bg-shape shape-2"
                        animate={{ 
                          rotate: -360,
                          scale: hoveredProject === project.id ? 1.3 : 1
                        }}
                        transition={{ 
                          rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
                          scale: { duration: 0.3 }
                        }}
                      />
                    </div>

                    {/* Hover Overlay */}
                    <motion.div
                      className="project-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="overlay-content">
                        <motion.a
                          href="#"
                          className="project-link"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                          </svg>
                          <span>Live</span>
                        </motion.a>
                        <motion.a
                          href="#"
                          className="project-link"
                          whileHover={{ scale: 1.1, rotate: -10 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          <span>Code</span>
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>

                  {/* Project Info */}
                  <div className="project-info">
                    <div className="project-meta">
                      <span className="project-category">{project.category}</span>
                      <span className="project-year">{project.year}</span>
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-tech">
                      {project.tech.map((tech, i) => (
                        <motion.span 
                          key={i} 
                          className="tech-tag"
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <motion.div 
                      className="project-arrow"
                      animate={{ 
                        x: hoveredProject === project.id ? 5 : 0,
                        opacity: hoveredProject === project.id ? 1 : 0.5
                      }}
                    >
                      <span>View Project</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* View All Projects Button */}
      <motion.div 
        className="projects-cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <MagneticButton href="#" className="outline">
          <span>View All Projects</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </MagneticButton>
      </motion.div>
    </section>
  )
}

export default Projects
