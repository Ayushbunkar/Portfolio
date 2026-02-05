import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import { useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading) {
      // Smooth scroll effect
      gsap.to('.smooth-scroll', {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })
    }
  }, [loading])

  const marqueeItems = [
    'CREATIVE DEVELOPER',
    'UI/UX DESIGN',
    'WEB ANIMATION',
    'REACT SPECIALIST',
    'FRONTEND MAGIC',
  ]

  return (
    <div className="app">
      <Cursor />
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="main-content"
          >
            <Navbar />
            <Hero />
            <Marquee items={marqueeItems} direction="left" speed={25} />
            <About />
            <Projects />
            <Marquee items={['LET\'S WORK TOGETHER', 'OPEN FOR OPPORTUNITIES', 'HIRE ME']} direction="right" speed={30} />
            <Skills />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
