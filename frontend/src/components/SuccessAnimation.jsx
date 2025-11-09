import React from 'react'
import { motion } from 'framer-motion'

const SuccessAnimation = ({ onComplete }) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300 }
    }
  }

  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.8, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    }
  }

  const celebrationVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.6,
        repeat: 3,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onComplete}
    >
      <motion.div
        className="bg-white rounded-3xl p-12 text-center max-w-md mx-4 shadow-2xl"
        variants={itemVariants}
      >
        {/* Success checkmark */}
        <motion.div className="mb-6 relative">
          <motion.div
            className="w-24 h-24 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 0 0 rgba(34, 197, 94, 0.4)",
                "0 0 0 20px rgba(34, 197, 94, 0)",
                "0 0 0 0 rgba(34, 197, 94, 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <motion.path
                d="M5 13l4 4L19 7"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={checkmarkVariants}
              />
            </svg>
          </motion.div>
          
          {/* Floating particles */}
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: [0, (Math.cos(i * 45 * Math.PI / 180) * 60)],
                y: [0, (Math.sin(i * 45 * Math.PI / 180) * 60)],
                opacity: [1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                delay: 0.5 + i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>

        {/* Success message */}
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-4"
          variants={itemVariants}
        >
          Analysis Complete! 🎉
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-6 text-lg"
          variants={itemVariants}
        >
          Your diabetes risk assessment has been successfully processed.
        </motion.p>

        {/* Celebration emojis */}
        <motion.div
          className="flex justify-center space-x-4 text-2xl mb-6"
          variants={celebrationVariants}
          animate="animate"
        >
          <span>🎊</span>
          <span>✨</span>
          <span>🎉</span>
          <span>💫</span>
        </motion.div>

        {/* Continue button */}
        <motion.button
          onClick={onComplete}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Results
        </motion.button>

        {/* Subtle instruction */}
        <motion.p
          className="text-gray-400 text-sm mt-4"
          variants={itemVariants}
        >
          Click anywhere to continue
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default SuccessAnimation