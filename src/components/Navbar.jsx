import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from './MagneticButton'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Detect active section
      const sections = navLinks.map(link => link.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setIsMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  }

  const linkVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    }),
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[1000] px-[5%] py-6 transition-all duration-300 ${isScrolled ? 'py-4 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-1 font-display text-xl font-bold text-white"
            onClick={(e) => handleLinkClick(e, '#home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>AB</span>
            <span className="w-2 h-2 bg-indigo-500 rounded-full" />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`relative flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 overflow-hidden ${activeSection === link.href.slice(1) ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={(e) => handleLinkClick(e, link.href)}
                whileHover={{ y: -2 }}
              >
                <span className="text-xs text-indigo-500 opacity-60">0{navLinks.indexOf(link) + 1}</span>
                <span>{link.name}</span>
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-1 h-1 bg-indigo-500 rounded-full -translate-x-1/2"
                    layoutId="navIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <MagneticButton href="#contact" className="text-sm">
              <span>Let's Talk</span>
            </MagneticButton>
          </div>

          {/* Menu Toggle */}
          <motion.button
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-transparent border-none cursor-pointer z-[1002]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 w-full max-w-md h-screen bg-[#12121a] z-[1001] flex flex-col"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex flex-col justify-between h-full pt-24 pb-10 px-8">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className="flex items-center gap-4 py-4 text-white font-display text-2xl font-semibold border-b border-white/5 transition-all duration-300 hover:text-indigo-500 hover:pl-2"
                      onClick={(e) => handleLinkClick(e, link.href)}
                      custom={i}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                    >
                      <span className="text-sm text-indigo-500 font-mono">0{i + 1}</span>
                      <span className="flex-1">{link.name}</span>
                      <span className="text-gray-500">→</span>
                    </motion.a>
                  ))}
                </div>

                <motion.div
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-6">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm font-mono uppercase tracking-wider hover:text-indigo-500 transition-colors">GH</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm font-mono uppercase tracking-wider hover:text-indigo-500 transition-colors">IN</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm font-mono uppercase tracking-wider hover:text-indigo-500 transition-colors">TW</a>
                  </div>
                  <p className="text-gray-500 text-sm">hello@ayushbunkar.com</p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
