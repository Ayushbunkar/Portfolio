import { motion } from 'framer-motion'

const Marquee = ({ items, direction = 'left', speed = 30 }) => {
  const duplicatedItems = [...items, ...items, ...items]

  return (
    <div className="relative w-full overflow-hidden py-6 border-y border-white/5" style={{ background: 'linear-gradient(90deg, #0a0a0f, transparent 5%, transparent 95%, #0a0a0f)' }}>
      <motion.div
        className="flex items-center gap-8 whitespace-nowrap"
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
          <div key={index} className="flex items-center gap-8">
            <span className="font-display text-3xl md:text-5xl font-bold text-white/5 uppercase tracking-tighter hover:text-white/10 transition-colors duration-300">{item}</span>
            <span className="text-indigo-500 text-xl">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Marquee
