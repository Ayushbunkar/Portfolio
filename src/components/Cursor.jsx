import { useEffect, useRef, useState } from 'react'

const Cursor = () => {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const stateRef = useRef({
    targetX: -100, targetY: -100,
    x: -100, y: -100,
    isClicking: false,
    isHovering: false,
    variant: 'default',
    rafId: null,
  })
  const [cursorText, setCursorText] = useState('')
  const [cursorVariant, setCursorVariant] = useState('default')

  useEffect(() => {
    const st = stateRef.current

    const applyVariant = (variant, isClicking) => {
      const dot = dotRef.current
      const ring = ringRef.current
      if (!dot || !ring) return

      if (variant === 'hover') {
        dot.style.width = '60px'
        dot.style.height = '60px'
        dot.style.backgroundColor = 'rgba(99, 102, 241, 0.2)'
        dot.style.border = '1px solid #6366f1'
        dot.style.mixBlendMode = 'normal'
      } else if (variant === 'project') {
        dot.style.width = '80px'
        dot.style.height = '80px'
        dot.style.backgroundColor = '#6366f1'
        dot.style.border = 'none'
        dot.style.mixBlendMode = 'normal'
      } else if (variant === 'text') {
        dot.style.width = '100px'
        dot.style.height = '100px'
        dot.style.backgroundColor = '#6366f1'
        dot.style.border = 'none'
        dot.style.mixBlendMode = 'normal'
      } else {
        dot.style.width = '12px'
        dot.style.height = '12px'
        dot.style.backgroundColor = '#6366f1'
        dot.style.border = 'none'
        dot.style.mixBlendMode = 'difference'
      }
      ring.style.opacity = st.isHovering ? '0' : '1'
      ring.style.transform = `translate(calc(${st.x}px - 50%), calc(${st.y}px - 50%)) scale(${isClicking ? 0.8 : 1})`
    }

    const animate = () => {
      st.x += (st.targetX - st.x) * 0.18
      st.y += (st.targetY - st.y) * 0.18

      const dot = dotRef.current
      const ring = ringRef.current
      if (dot) dot.style.transform = `translate(calc(${st.x}px - 50%), calc(${st.y}px - 50%))`
      if (ring) ring.style.transform = `translate(calc(${st.x}px - 50%), calc(${st.y}px - 50%)) scale(${st.isClicking ? 0.8 : 1})`

      st.rafId = requestAnimationFrame(animate)
    }
    st.rafId = requestAnimationFrame(animate)

    const handleMouseMove = (e) => {
      st.targetX = e.clientX
      st.targetY = e.clientY
    }

    const handleMouseDown = () => {
      st.isClicking = true
    }
    const handleMouseUp = () => {
      st.isClicking = false
    }

    const handleMouseOver = (e) => {
      const target = e.target
      let variant = 'default'
      let text = ''

      if (target.tagName === 'A' || target.tagName === 'BUTTON' ||
          target.closest('a') || target.closest('button') ||
          target.classList.contains('magnetic-button')) {
        variant = 'hover'
        st.isHovering = true
      }
      if (target.dataset.cursorText) {
        text = target.dataset.cursorText
        variant = 'text'
      }
      if (target.classList.contains('project-card') || target.closest('.project-card')) {
        variant = 'project'
        text = 'View'
      }

      if (variant !== st.variant) {
        st.variant = variant
        applyVariant(variant, st.isClicking)
        setCursorVariant(variant)
      }
      if (text !== '') setCursorText(text)
    }

    const handleMouseOut = () => {
      st.isHovering = false
      st.variant = 'default'
      applyVariant('default', st.isClicking)
      setCursorVariant('default')
      setCursorText('')
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })

    return () => {
      if (st.rafId) cancelAnimationFrame(st.rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center hidden md:flex"
        style={{
          width: 12,
          height: 12,
          backgroundColor: '#6366f1',
          mixBlendMode: 'difference',
          willChange: 'transform',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border 0.2s ease',
        }}
      >
        {cursorText && (
          <span className="text-white text-xs font-semibold">{cursorText}</span>
        )}
      </div>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998] rounded-full border border-indigo-500/50 hidden md:block"
        style={{
          willChange: 'transform',
          transition: 'opacity 0.2s ease, transform 0.1s ease',
        }}
      />
    </>
  )
}

export default Cursor
