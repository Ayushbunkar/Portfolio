import { motion } from 'framer-motion'

const Marquee = ({ items, direction = 'left', speed = 30 }) => {
  const duplicatedItems = [...items, ...items, ...items]

  return (
    <div className="marquee-container">
      <motion.div
        className="marquee-track"
        animate={{
          x: direction === 'left' ? ['0%', '-33.33%'] : ['-33.33%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className="marquee-item">
            <span className="marquee-text">{item}</span>
            <span className="marquee-separator">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Marquee
