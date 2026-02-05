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
      className="preloader"
      initial="initial"
      exit="exit"
      variants={slideUp}
    >
      <div className="preloader-content">
        <motion.div
          className="preloader-text"
          variants={container}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="preloader-name">
            {name.split('').map((char, index) => (
              <motion.span
                key={index}
                variants={letter}
                className="preloader-letter"
              >
                {char}
              </motion.span>
            ))}
          </div>
          <div className="preloader-lastname">
            {lastName.split('').map((char, index) => (
              <motion.span
                key={index}
                variants={letter}
                className="preloader-letter gradient"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="preloader-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Creative Developer & Designer
        </motion.div>

        <div className="preloader-progress">
          <motion.div 
            className="preloader-progress-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>

        <motion.div
          className="preloader-counter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Counter />
        </motion.div>
      </div>

      {/* Background Elements */}
      <motion.div 
        className="preloader-circle"
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
      className="counter-text"
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
