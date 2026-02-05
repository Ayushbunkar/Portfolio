import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'
import './Skills.css'

const Skills = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState(0)

  const skillCategories = [
    {
      name: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'React', level: 95, icon: '⚛️' },
        { name: 'Next.js', level: 90, icon: '▲' },
        { name: 'TypeScript', level: 88, icon: '📘' },
        { name: 'GSAP', level: 92, icon: '🎬' },
        { name: 'Framer Motion', level: 94, icon: '✨' },
        { name: 'Tailwind CSS', level: 96, icon: '🎯' },
      ]
    },
    {
      name: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 90, icon: '🟢' },
        { name: 'Express', level: 88, icon: '🚀' },
        { name: 'MongoDB', level: 85, icon: '🍃' },
        { name: 'PostgreSQL', level: 82, icon: '🐘' },
        { name: 'GraphQL', level: 80, icon: '◈' },
        { name: 'Redis', level: 75, icon: '🔴' },
      ]
    },
    {
      name: 'Tools',
      icon: '🛠️',
      skills: [
        { name: 'Git', level: 92, icon: '📦' },
        { name: 'Docker', level: 78, icon: '🐳' },
        { name: 'Figma', level: 88, icon: '🎨' },
        { name: 'VS Code', level: 95, icon: '💻' },
        { name: 'Webpack', level: 80, icon: '📦' },
        { name: 'Linux', level: 75, icon: '🐧' },
      ]
    },
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
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="skills-container">
        <motion.div 
          className="skills-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">My Expertise</span>
          <h2 className="section-title">
            Skills & <span className="gradient">Technologies</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive toolkit of modern technologies I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="skills-content">
          {/* Category Tabs */}
          <motion.div 
            className="skills-tabs"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {skillCategories.map((category, index) => (
              <motion.button
                key={index}
                className={`skill-tab ${activeCategory === index ? 'active' : ''}`}
                onClick={() => setActiveCategory(index)}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-name">{category.name}</span>
                <span className="tab-count">{category.skills.length}</span>
                {activeCategory === index && (
                  <motion.div
                    className="tab-indicator"
                    layoutId="skillTabIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}

            {/* Experience Stats */}
            <div className="skills-stats">
              <div className="stat-item">
                <span className="stat-number">
                  <AnimatedCounter target={15} suffix="+" duration={1.5} />
                </span>
                <span className="stat-label">Technologies</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  <AnimatedCounter target={3} suffix="+" duration={1.5} />
                </span>
                <span className="stat-label">Years Exp.</span>
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            className="skills-grid"
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-card"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="skill-header">
                  <span className="skill-icon">{skill.icon}</span>
                  <div className="skill-info">
                    <h4 className="skill-name">{skill.name}</h4>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                </div>
                
                <div className="skill-bar-container">
                  <motion.div
                    className="skill-bar"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ 
                      duration: 1.2, 
                      delay: index * 0.1,
                      ease: [0.76, 0, 0.24, 1] 
                    }}
                  >
                    <motion.div 
                      className="skill-bar-glow"
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                        x: ['0%', '100%', '0%']
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                  </motion.div>
                </div>

                <div className="skill-level-indicator">
                  {skill.level >= 90 ? (
                    <span className="level expert">Expert</span>
                  ) : skill.level >= 80 ? (
                    <span className="level advanced">Advanced</span>
                  ) : (
                    <span className="level intermediate">Intermediate</span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Decoration */}
        <motion.div 
          className="skills-decoration"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="decoration-text">
            <span>Always Learning</span>
            <span className="dot">•</span>
            <span>Always Growing</span>
            <span className="dot">•</span>
            <span>Always Building</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
