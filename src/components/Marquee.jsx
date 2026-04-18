import { motion } from 'framer-motion'

const Marquee = ({ items, direction = 'left', speed = 30 }) => {
  const duplicatedItems = [...items, ...items, ...items]

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-[#0d0d14]/68 py-5 md:py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0d0d14]/95 to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0d0d14]/95 to-transparent md:w-40" />
      <motion.div
        className="flex items-center gap-10 md:gap-12 whitespace-nowrap"
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
          <div key={index} className="flex items-center gap-10 md:gap-12">
            <span className="font-display text-3xl md:text-5xl font-bold text-white/10 uppercase tracking-tight hover:text-white/20 transition-colors duration-300">{item}</span>
            <span className="text-indigo-400 text-xl">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Marquee
