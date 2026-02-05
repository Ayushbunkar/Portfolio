import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'

const TiltCard = ({ children, className = '' }) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useMotionTemplate`${ySpring}deg`
  const rotateY = useMotionTemplate`${xSpring}deg`

  const handleMouseMove = (e) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPercent = (mouseX / width - 0.5) * 20
    const yPercent = (mouseY / height - 0.5) * -20

    x.set(xPercent)
    y.set(yPercent)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="tilt-card-content" style={{ transform: 'translateZ(50px)' }}>
        {children}
      </div>
      <div className="tilt-card-glow" />
    </motion.div>
  )
}

export default TiltCard
