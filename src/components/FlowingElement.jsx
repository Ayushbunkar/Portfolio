import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const FLOW_STEPS = [
  {
    id: 'home',
    label: 'Identity',
    anchor: 16,
    color: '#7c86ff',
    form: 'circle',
  },
  {
    id: 'about',
    label: 'Origin',
    anchor: 74,
    color: '#2dd4bf',
    form: 'diamond',
  },
  {
    id: 'skills',
    label: 'Power',
    anchor: 25,
    color: '#f59e0b',
    form: 'hex',
  },
  {
    id: 'projects',
    label: 'Impact',
    anchor: 78,
    color: '#ec4899',
    form: 'pill',
  },
  {
    id: 'journey',
    label: 'Journey',
    anchor: 28,
    color: '#22d3ee',
    form: 'diamond',
  },
  {
    id: 'contact',
    label: 'Connection',
    anchor: 66,
    color: '#a78bfa',
    form: 'circle',
  },
]

const SHAPE_STYLE = {
  circle: { width: 12, height: 12, borderRadius: '999px', rotate: 0 },
  diamond: { width: 11, height: 11, borderRadius: '34%', rotate: 45 },
  hex: { width: 14, height: 14, borderRadius: '30%', rotate: 30 },
  pill: { width: 21, height: 9, borderRadius: '999px', rotate: 8 },
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const lerp = (start, end, t) => start + (end - start) * t

const FlowingElement = () => {
  const frameRef = useRef(0)
  const [model, setModel] = useState({
    x: 140,
    y: 160,
    color: FLOW_STEPS[0].color,
    label: FLOW_STEPS[0].label,
    form: FLOW_STEPS[0].form,
    docHeight: typeof document !== 'undefined' ? document.documentElement.scrollHeight : 2000,
  })

  const points = useMemo(() => FLOW_STEPS.map((step) => ({ ...step })), [])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const update = () => {
      frameRef.current = 0

      const viewportHeight = window.innerHeight
      const viewportWidth = window.innerWidth
      const scrollY = window.scrollY
      const probeY = scrollY + viewportHeight * 0.45

      const calibrated = points
        .map((point) => {
          const section = document.getElementById(point.id)
          if (!section) return null

          const rect = section.getBoundingClientRect()
          const sectionTop = rect.top + scrollY
          const sectionMid = sectionTop + rect.height * 0.48

          return {
            ...point,
            y: sectionMid,
            x: (point.anchor / 100) * viewportWidth,
          }
        })
        .filter(Boolean)

      if (calibrated.length === 0) return

      let current = calibrated[0]
      let next = calibrated[calibrated.length - 1]
      let localT = 0

      for (let i = 0; i < calibrated.length - 1; i += 1) {
        const start = calibrated[i]
        const end = calibrated[i + 1]

        if (probeY >= start.y && probeY <= end.y) {
          const spread = Math.max(end.y - start.y, 1)
          localT = clamp((probeY - start.y) / spread, 0, 1)
          current = start
          next = end
          break
        }

        if (probeY < calibrated[0].y) {
          current = calibrated[0]
          next = calibrated[1] || calibrated[0]
          localT = 0
          break
        }
      }

      const baseX = lerp(current.x, next.x, localT)
      const waveX = Math.sin(probeY * 0.012) * 30
      const driftX = Math.cos(probeY * 0.0056) * 14
      const x = clamp(baseX + waveX + driftX, 30, viewportWidth - 30)
      const y = probeY

      setModel({
        x,
        y,
        color: current.color,
        form: current.form,
        label: current.label,
        docHeight: document.documentElement.scrollHeight,
      })
    }

    const requestUpdate = () => {
      if (frameRef.current) return
      frameRef.current = window.requestAnimationFrame(update)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [points])

  const shape = SHAPE_STYLE[model.form] || SHAPE_STYLE.circle

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-[15]"
      style={{ height: model.docHeight }}
    >
      <motion.div
        className="absolute"
        animate={{
          left: model.x,
          top: model.y,
        }}
        transition={{ type: 'spring', stiffness: 130, damping: 26, mass: 0.6 }}
      >
        <motion.div
          className="connector-tail absolute left-1/2 -translate-x-1/2"
          style={{
            top: -116,
            width: 2,
            height: 112,
            borderRadius: 999,
          }}
          animate={{ opacity: [0.45, 0.82, 0.45] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: -134,
            width: 30,
            height: 30,
            borderRadius: '999px',
            filter: 'blur(11px)',
            background: model.color,
            opacity: 0.28,
          }}
          animate={{ scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute"
          animate={{
            width: shape.width,
            height: shape.height,
            borderRadius: shape.borderRadius,
            rotate: shape.rotate,
            backgroundColor: model.color,
            boxShadow: `0 0 26px ${model.color}`,
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            left: '50%',
            top: 0,
            transform: 'translateX(-50%)',
            animation: 'orb-pulse 1.7s ease-in-out infinite',
          }}
        />

      </motion.div>
    </div>
  )
}

export default FlowingElement
