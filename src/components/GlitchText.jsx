import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const GlitchText = ({ children, className = '' }) => {
  return (
    <motion.span
      className={`glitch-text ${className}`}
      data-text={children}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.span>
  )
}

export const TypewriterText = ({ texts, speed = 100, deleteSpeed = 50, delay = 2000 }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[currentIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), delay)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentIndex, texts, speed, deleteSpeed, delay])

  return (
    <span className="typewriter">
      {displayText}
      <motion.span
        className="typewriter-cursor"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
      >
        |
      </motion.span>
    </span>
  )
}

export const ScrambleText = ({ children, className = '' }) => {
  const [text, setText] = useState(children)
  const [isHovered, setIsHovered] = useState(false)
  const chars = '!<>-_\\/[]{}—=+*^?#________'

  useEffect(() => {
    if (!isHovered) {
      setText(children)
      return
    }

    let iteration = 0
    const interval = setInterval(() => {
      setText(
        children
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return children[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      if (iteration >= children.length) {
        clearInterval(interval)
      }

      iteration += 1 / 3
    }, 30)

    return () => clearInterval(interval)
  }, [isHovered, children])

  return (
    <span
      className={`scramble-text ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </span>
  )
}

export default GlitchText
