import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'

// On touch devices, tilt has no effect and wastes resources — render plain div
const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

const TiltCard = ({ children, className = '', intensity = 20 }) => {
  const ref = useRef(null)
  const rafRef = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSpring = useSpring(x, { stiffness: 280, damping: 32 })
  const ySpring = useSpring(y, { stiffness: 280, damping: 32 })

  const rotateX = useMotionTemplate`${ySpring}deg`
  const rotateY = useMotionTemplate`${xSpring}deg`

  const handleMouseMove = (e) => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) { rafRef.current = null; return }
      const rect = ref.current.getBoundingClientRect()
      x.set(((e.clientX - rect.left) / rect.width - 0.5) * intensity)
      y.set(((e.clientY - rect.top) / rect.height - 0.5) * -intensity)
      rafRef.current = null
    })
  }

  const handleMouseLeave = () => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
    x.set(0)
    y.set(0)
  }

  // On touch devices skip 3D tilt entirely — just render children directly
  if (isTouch) {
    return <div className={`relative ${className}`}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <div style={{ transform: 'translateZ(50px)' }}>
        {children}
      </div>
    </motion.div>
  )
}

export default TiltCard
