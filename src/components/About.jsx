import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'
import TiltCard from './TiltCard'
import MagneticButton from './MagneticButton'

const About = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  }

  const stats = [
    { number: 3, suffix: '+', label: 'Years of Experience' },
    { number: 50, suffix: '+', label: 'Projects Delivered' },
    { number: 30, suffix: '+', label: 'Happy Clients' },
    { number: 100, suffix: '%', label: 'Client Satisfaction' },
  ]

  const serviceIcons = {
    design: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-indigo-500">
        <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-indigo-500">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    responsive: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-indigo-500">
        <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    performance: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-indigo-500">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  }

  const services = [
    { icon: serviceIcons.design, title: 'UI/UX Design', desc: 'Beautiful interfaces' },
    { icon: serviceIcons.code, title: 'Web Development', desc: 'Modern websites' },
    { icon: serviceIcons.responsive, title: 'Responsive', desc: 'All devices' },
    { icon: serviceIcons.performance, title: 'Performance', desc: 'Lightning fast' },
  ]

  return (
    <section id="about" className="py-36 px-[5%] relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #12121a 100%)' }} ref={sectionRef}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.span className="text-indigo-500 font-mono text-sm uppercase tracking-wider mb-6" variants={itemVariants}>
            About Me
          </motion.span>
          <motion.h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8" variants={itemVariants}>
            Passionate About
            <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Creating Digital Art</span>
          </motion.h2>
          <motion.p className="text-gray-400 text-lg leading-relaxed mb-6" variants={itemVariants}>
            I'm <strong className="text-white">Ayush Bunkar</strong>, a creative developer based in India with 
            a passion for crafting exceptional digital experiences. I combine technical 
            expertise with artistic vision to build websites that are not just functional, 
            but truly memorable.
          </motion.p>
          <motion.p className="text-gray-400 text-lg leading-relaxed mb-6" variants={itemVariants}>
            My approach blends <span className="text-indigo-500 font-medium">cutting-edge technology</span> with 
            thoughtful design, ensuring every project delivers both aesthetic appeal and 
            outstanding performance. I believe in the power of <span className="text-indigo-500 font-medium">
            smooth animations</span> and intuitive interfaces.
          </motion.p>

          <motion.div className="grid grid-cols-2 gap-4 w-full mb-8" variants={itemVariants}>
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/5"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="flex items-center justify-center mb-3">{service.icon}</span>
                <h4 className="font-display text-sm font-semibold text-white mb-1">{service.title}</h4>
                <p className="text-xs text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
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

        <div className="relative flex justify-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            <TiltCard>
              <div className="w-80 h-96 rounded-3xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-indigo-500/30 to-pink-500/30 flex items-center justify-center">
                  <span className="font-display text-6xl font-extrabold text-white/30">AB</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 to-transparent" />
              </div>
            </TiltCard>
            
            <motion.div
              className="absolute px-5 py-3 bg-[#0f0f0f]/90 backdrop-blur-xl border border-white/10 rounded-full font-mono text-sm font-semibold text-white z-10 top-10 -right-12"
              style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span>React</span>
            </motion.div>
            <motion.div
              className="absolute px-5 py-3 bg-[#0f0f0f]/90 backdrop-blur-xl border border-white/10 rounded-full font-mono text-sm font-semibold text-white z-10 bottom-24 -left-10"
              style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span>GSAP</span>
            </motion.div>
            <motion.div
              className="absolute px-5 py-3 bg-[#0f0f0f]/90 backdrop-blur-xl border border-white/10 rounded-full font-mono text-sm font-semibold text-white z-10 top-1/2 -right-8"
              style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
              animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span>Framer</span>
            </motion.div>

            <motion.div
              className="absolute -top-8 -left-8 w-24 h-24 rounded-full flex flex-col items-center justify-center z-10"
              style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)', boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)' }}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
            >
              <span className="font-display text-2xl font-bold text-white">3+</span>
              <span className="text-xs text-white/80 font-medium">Years Exp.</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="mt-16 lg:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <span className="font-display text-3xl md:text-4xl font-bold text-white block mb-2">
              <AnimatedCounter target={stat.number} suffix={stat.suffix} duration={2} />
            </span>
            <span className="text-gray-400 text-sm">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default About
