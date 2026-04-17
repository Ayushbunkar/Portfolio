import { Suspense, lazy, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import FlowingElement from './components/FlowingElement'
import { ensureScrollTrigger, gsap } from './utils/scrollAnimations'

const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Skills = lazy(() => import('./components/Skills'))
const Experience = lazy(() => import('./components/Experience'))
const Contact = lazy(() => import('./components/Contact'))

const SectionFallback = () => (
  <section className="section-shell bg-[#060913]">
    <div className="section-container">
      <div className="h-36 rounded-2xl border border-white/10 bg-white/[0.04] animate-pulse" />
    </div>
  </section>
)

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.classList.add('portfolio-theme')
    return () => {
      document.body.classList.remove('portfolio-theme')
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    let lenis = null
    let disposeTicker = null
    let cancelled = false

    const setupLenis = async () => {
      const { default: Lenis } = await import('lenis')
      if (cancelled) return

      const ScrollTrigger = ensureScrollTrigger()

      lenis = new Lenis({
        duration: 1.2,
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
        syncTouch: false,
      })

      lenis.on('scroll', ScrollTrigger.update)

      const tick = (time) => {
        if (lenis) {
          lenis.raf(time * 1000)
        }
      }

      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      disposeTicker = () => gsap.ticker.remove(tick)

      document.documentElement.classList.add('lenis')
      document.body.classList.add('lenis')
    }

    setupLenis()

    return () => {
      cancelled = true
      if (disposeTicker) disposeTicker()
      if (lenis) lenis.destroy()
      document.documentElement.classList.remove('lenis')
      document.body.classList.remove('lenis')
    }
  }, [])

  const marqueeItems = [
    'IDENTITY TRANSMISSION',
    'ORIGIN SIGNAL',
    'POWER GRID',
    'IMPACT CONSTELLATION',
    'CONNECTION CHANNEL',
  ]

  return (
    <div className="app">
      <div aria-hidden="true" className="space-bg-wrap">
        <div className="space-bg-nebula" />
        <div className="space-bg-stars" />
        <div className="space-bg-grid" />
      </div>

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
            <FlowingElement />
            <Hero />
            <Marquee items={marqueeItems} direction="left" speed={26} />

            <Suspense fallback={<SectionFallback />}>
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Marquee
                items={[
                  'SPACE THEME STORYLINE',
                  'BUILD WITH PURPOSE',
                  'MOTION WITH MEANING',
                  'EXPERIENCE THAT CONVERTS',
                ]}
                direction="right"
                speed={30}
              />
              <Contact />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
