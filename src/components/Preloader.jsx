import { motion } from 'framer-motion'

const Preloader = () => {
  const name = "AYUSH"
  const lastName = "BUNKAR"
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  }

  const letter = {
    hidden: { y: 100, opacity: 0, rotateX: -90 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const slideUp = {
    initial: { y: 0 },
    exit: {
      y: '-100%',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0a0a0f]"
      initial="initial"
      exit="exit"
      variants={slideUp}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="flex flex-col items-center"
          variants={container}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center justify-center mb-2">
            {name.split('').map((char, index) => (
              <motion.span
                key={index}
                variants={letter}
                className="font-display text-5xl md:text-7xl font-extrabold text-white inline-block"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {char}
              </motion.span>
            ))}
          </div>
          <div className="flex items-center justify-center">
            {lastName.split('').map((char, index) => (
              <motion.span
                key={index}
                variants={letter}
                className="font-display text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-6 text-gray-400 font-body text-sm tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Creative Developer & Designer
        </motion.div>

        <div className="mt-8 w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>

        <motion.div
          className="mt-4 font-mono text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Counter />
        </motion.div>
      </div>

      {/* Background Elements */}
      <motion.div 
        className="absolute w-96 h-96 rounded-full border border-indigo-500/10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
    </motion.div>
  )
}

const Counter = () => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading...
      </motion.span>
    </motion.span>
  )
}

export default Preloader
