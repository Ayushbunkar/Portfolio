import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const MagneticButton = ({
  children,
  className = '',
  onClick,
  href,
  type = 'button',
  target,
  rel,
}) => {
  const ref = useRef(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 160, damping: 18, mass: 0.08 })
  const y = useSpring(rawY, { stiffness: 160, damping: 18, mass: 0.08 })

  const innerX = useSpring(rawX, { stiffness: 160, damping: 18, mass: 0.08 })
  const innerY = useSpring(rawY, { stiffness: 160, damping: 18, mass: 0.08 })

  const handleMouse = (e) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - left - width / 2) * 0.3)
    rawY.set((e.clientY - top - height / 2) * 0.3)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  const Component = href ? motion.a : motion.button

  const isFilled = className.includes('filled')
  const isOutline = className.includes('outline')

  return (
    <Component
      ref={ref}
      href={href}
      type={href ? undefined : type}
      target={href ? target : undefined}
      rel={href ? rel : undefined}
      className={`group relative inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 font-body text-sm font-semibold rounded-full cursor-pointer transition-all duration-300 whitespace-nowrap ${
        isFilled
          ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-none hover:shadow-[0_10px_40px_rgba(99,102,241,0.3)]'
          : isOutline
          ? 'bg-transparent text-white border border-white/30 hover:border-indigo-400/70 hover:bg-indigo-500/10'
          : 'bg-white/5 text-white border border-white/10 hover:border-indigo-500/30 hover:bg-white/10'
      } ${className}`}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, willChange: 'transform' }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="flex items-center justify-center gap-2"
        style={{ x: innerX, y: innerY }}
      >
        {children}
      </motion.span>
    </Component>
  )
}

export default MagneticButton
