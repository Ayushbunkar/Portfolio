import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
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

  // Floating animation for gallery cards - entrance only
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-card', 
        { opacity: 0, scale: 0.5, y: 100 },
        { opacity: 1, scale: 1, y: 0, duration: 1, stagger: 0.1, delay: 1.5, ease: 'power3.out' }
      )
    }, galleryRef)
    return () => ctx.revert()
  }, [])

  const roles = ['Frontend Developer', 'UI/UX Designer', 'Creative Coder', 'Problem Solver']

  const letterVariants = {
    hidden: { y: 100, opacity: 0, rotateX: -90 },
    visible: (i) => ({
      y: 0, opacity: 1, rotateX: 0,
      transition: { delay: i * 0.05, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
    }),
  }

  const name = "AYUSH"
  const lastName = "BUNKAR"

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative py-20 px-[5%] pt-[120px] overflow-hidden" ref={heroRef}>
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)'
        }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #0a0a0f 100%)' }} />
        <motion.div 
          className="absolute rounded-full blur-[80px] w-[600px] h-[600px] -top-[20%] -right-[10%]"
          style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(168, 85, 247, 0.3))' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute rounded-full blur-[80px] w-[500px] h-[500px] -bottom-[15%] -left-[10%]"
          style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(99, 102, 241, 0.2))' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute rounded-full blur-[80px] w-[400px] h-[400px] top-[30%] left-[20%]"
          style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.2))' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div className="relative z-20 text-center max-w-5xl mx-auto flex flex-col items-center">
        {/* Main Title */}
        <div className="mb-8">
          <motion.p
            className="font-mono text-indigo-500 text-lg mb-4 tracking-wider uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Hello, I'm
          </motion.p>
          
          <h1 className="flex flex-col items-center gap-2 leading-none mb-6">
            <span className="flex items-center justify-center">
              {name.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="font-display text-[clamp(2.5rem,10vw,8rem)] font-extrabold text-white inline-block tracking-tighter"
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
            <span className="flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {lastName.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="font-display text-[clamp(2.5rem,10vw,8rem)] font-extrabold inline-block tracking-tighter"
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
            className="text-xl md:text-2xl text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span>I'm a </span>
            <span className="text-indigo-500 font-semibold">
              <TypewriterText texts={roles} speed={80} deleteSpeed={40} delay={1500} />
            </span>
          </motion.div>
        </div>

        {/* Decorative Line */}
        <motion.div
          className="w-24 h-0.5 mx-auto mb-8 origin-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Description */}
        <motion.p
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          Crafting <span className="text-white font-medium">immersive digital experiences</span> through 
          clean code, stunning animations, and pixel-perfect design. Turning complex 
          ideas into <span className="text-white font-medium">elegant solutions</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <MagneticButton href="#projects" className="filled">
            <span>View My Work</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" className="flex-shrink-0">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </MagneticButton>
          <MagneticButton href="#contact">
            <span>Get In Touch</span>
          </MagneticButton>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex items-center justify-center gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
            whileHover={{ y: -3, scale: 1.1 }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#0A66C2] transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3 }}
            whileHover={{ y: -3, scale: 1.1 }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4 }}
            whileHover={{ y: -3, scale: 1.1 }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </motion.a>
          <motion.a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#EA4C89] transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            whileHover={{ y: -3, scale: 1.1 }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Side Text */}
      <motion.div
        className="hidden lg:block absolute top-1/2 -translate-y-1/2 text-gray-500 text-xs font-mono uppercase tracking-widest left-8"
        style={{ writingMode: 'vertical-rl' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span>PORTFOLIO © 2026</span>
      </motion.div>
      <motion.div
        className="hidden lg:block absolute top-1/2 -translate-y-1/2 text-gray-500 text-xs font-mono uppercase tracking-widest right-8 rotate-180"
        style={{ writingMode: 'vertical-rl' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span>BASED IN INDIA</span>
      </motion.div>

      {/* Floating 3D Gallery */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[40%] h-[70vh] pointer-events-none z-[5]" style={{ perspective: '1200px' }} ref={galleryRef}>
        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              className="gallery-card absolute cursor-pointer pointer-events-auto"
              style={{
                left: '50%',
                top: '50%',
                transform: `translateX(calc(-50% + ${item.x}px)) translateY(calc(-50% + ${item.y}px)) translateZ(${item.z}px) rotate(${item.rotation}deg) scale(${item.scale})`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: 5 + Math.floor(item.z / 10),
              }}
              whileHover={{ scale: item.scale * 1.15, zIndex: 100 }}
            >
              <div className="relative" style={{ transformStyle: 'preserve-3d', animation: 'card-float 4s ease-in-out infinite', animationDelay: `${item.id * 0.5}s` }}>
                <div 
                  className={`relative ${item.main ? 'w-40 h-52 md:w-48 md:h-60 lg:w-56 lg:h-72' : 'w-32 h-40 md:w-36 md:h-44 lg:w-40 lg:h-52'} rounded-2xl overflow-hidden border border-white/10`}
                  style={{ 
                    background: item.gradient,
                    boxShadow: item.main 
                      ? '0 30px 60px -15px rgba(0, 0, 0, 0.6), 0 0 80px rgba(99, 102, 241, 0.25)' 
                      : '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(99, 102, 241, 0.15)'
                  }}
                >
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%, transparent 100%)', pointerEvents: 'none' }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-mono text-white/40 text-sm font-bold absolute top-4 left-4">0{item.id}</span>
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-white/70">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 -z-10 rounded-2xl blur-3xl opacity-50" style={{ background: item.gradient, transform: 'translateZ(-20px) scale(1.3)' }} />
              </div>
            </motion.div>
          ))}
          
          {/* Decorative orbits */}
          <div className="absolute left-1/2 top-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-white/[0.03]" style={{ transform: 'translate(-50%, -50%) rotateX(75deg)', animation: 'orbit-spin 30s linear infinite' }} />
          <div className="absolute left-1/2 top-1/2 w-[450px] h-[450px] md:w-[550px] md:h-[550px] rounded-full border border-white/[0.02]" style={{ transform: 'translate(-50%, -50%) rotateX(75deg)', animation: 'orbit-spin 40s linear infinite reverse' }} />
        </div>
      </div>
    </section>
  )
}

export default Hero
