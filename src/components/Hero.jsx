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
          className="flex flex-wrap justify-center gap-4 mb-12"
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
          className="flex justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map((social, index) => (
            <motion.a
              key={social}
              href="#"
              className="text-gray-500 text-sm font-mono uppercase tracking-wider hover:text-indigo-500 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 + index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              {social}
            </motion.a>
          ))}
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
