import React from 'react'
import { motion } from 'framer-motion'

const FloatingElements = ({ count = 8 }) => {
  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
    color: ['bg-blue-200', 'bg-purple-200', 'bg-pink-200', 'bg-cyan-200', 'bg-yellow-200'][Math.floor(Math.random() * 5)]
  }))

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, -5, 0],
      rotate: [0, 180, 360],
      scale: [1, 1.2, 0.8, 1],
      opacity: [0.3, 0.7, 0.4, 0.6],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.2, 0.5, 0.2],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute rounded-full ${element.color} blur-sm`}
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          variants={floatingVariants}
          animate="animate"
          transition={{
            delay: element.delay,
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Larger pulse elements */}
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20"
          style={{
            width: 100 + i * 50,
            height: 100 + i * 50,
            left: `${20 + i * 30}%`,
            top: `${10 + i * 25}%`,
          }}
          variants={pulseVariants}
          animate="animate"
          transition={{
            delay: i * 1,
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export default FloatingElements