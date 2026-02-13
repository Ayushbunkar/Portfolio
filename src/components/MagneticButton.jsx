import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const MagneticButton = ({ children, className = '', onClick, href }) => {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (clientX - left - width / 2) * 0.3
    const y = (clientY - top - height / 2) * 0.3
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const Component = href ? motion.a : motion.button

  const isFilled = className.includes('filled')
  const isOutline = className.includes('outline')

  return (
    <Component
      ref={ref}
      href={href}
      className={`relative inline-flex items-center justify-center gap-2 px-7 py-3.5 font-body text-sm font-semibold rounded-full cursor-pointer transition-all duration-300 ${
        isFilled 
          ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-none hover:shadow-[0_10px_40px_rgba(99,102,241,0.3)]' 
          : isOutline
          ? 'bg-transparent text-white border border-white/20 hover:border-indigo-500/50 hover:bg-indigo-500/10'
          : 'bg-white/5 text-white border border-white/10 hover:border-indigo-500/30 hover:bg-white/10'
      } ${className}`}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="flex items-center gap-2"
        animate={{ x: position.x * 0.5, y: position.y * 0.5 }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.span>
    </Component>
  )
}

export default MagneticButton
