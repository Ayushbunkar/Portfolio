import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import './Cursor.css'

const Cursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [cursorVariant, setCursorVariant] = useState('default')
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e) => {
      const target = e.target
      
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
          target.closest('a') || target.closest('button') ||
          target.classList.contains('magnetic-button')) {
        setIsHovering(true)
        setCursorVariant('hover')
      }
      
      if (target.dataset.cursorText) {
        setCursorText(target.dataset.cursorText)
        setCursorVariant('text')
      }
      
      if (target.classList.contains('project-card') || target.closest('.project-card')) {
        setCursorVariant('project')
        setCursorText('View')
      }
    }

    const handleMouseOut = (e) => {
      setIsHovering(false)
      setCursorVariant('default')
      setCursorText('')
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [cursorX, cursorY])

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: 'var(--accent)',
      mixBlendMode: 'difference',
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      border: '1px solid var(--accent)',
      mixBlendMode: 'normal',
    },
    project: {
      width: 80,
      height: 80,
      backgroundColor: 'var(--accent)',
      mixBlendMode: 'normal',
    },
    text: {
      width: 100,
      height: 100,
      backgroundColor: 'var(--accent)',
      mixBlendMode: 'normal',
    }
  }

  return (
    <>
      <motion.div
        className={`cursor-dot ${cursorVariant}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={cursorVariant}
        variants={variants}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        {cursorText && (
          <span className="cursor-text">{cursorText}</span>
        )}
      </motion.div>
      <motion.div
        className="cursor-trail"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
          opacity: isHovering ? 0 : 1,
        }}
      />
    </>
  )
}

export default Cursor
