import React from 'react'
import { motion } from 'framer-motion'

const MorphingBackground = () => {
  const blobVariants = {
    animate: {
      scale: [1, 1.2, 0.8, 1.1, 1],
      rotate: [0, 90, 180, 270, 360],
      borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", 
                     "70% 30% 30% 70% / 70% 70% 30% 30%",
                     "50% 50% 50% 50% / 50% 50% 50% 50%",
                     "30% 70% 70% 30% / 30% 30% 70% 70%"],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const gradientVariants = {
    animate: {
      background: [
        "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
        "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))",
        "linear-gradient(225deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))",
        "linear-gradient(315deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))"
      ],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        variants={gradientVariants}
        animate="animate"
      />
      
      {/* Morphing blobs */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl"
        variants={blobVariants}
        animate="animate"
      />
      
      <motion.div
        className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-cyan-400/20 blur-3xl"
        variants={blobVariants}
        animate="animate"
        transition={{ delay: 2, duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400/15 to-orange-400/15 blur-2xl"
        variants={blobVariants}
        animate="animate"
        transition={{ delay: 4, duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      />
    </div>
  )
}

export default MorphingBackground