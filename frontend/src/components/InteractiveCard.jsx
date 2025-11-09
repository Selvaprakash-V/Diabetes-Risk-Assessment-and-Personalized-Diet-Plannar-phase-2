import React, { useState } from 'react'
import { motion } from 'framer-motion'

const InteractiveCard = ({ children, className = "", glowColor = "blue" }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const cardVariants = {
    initial: {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      z: 0
    },
    hover: {
      scale: 1.05,
      rotateX: (mousePosition.y - 150) / 30,
      rotateY: (mousePosition.x - 150) / 30,
      z: 50,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  }

  const glowVariants = {
    initial: {
      opacity: 0,
      scale: 0.8
    },
    hover: {
      opacity: 0.6,
      scale: 1.2,
      transition: {
        duration: 0.3
      }
    }
  }

  const shimmerVariants = {
    initial: {
      x: "-100%",
      opacity: 0
    },
    hover: {
      x: "100%",
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  }

  const glowColors = {
    blue: "from-blue-500/50 to-cyan-500/50",
    purple: "from-purple-500/50 to-pink-500/50",
    green: "from-green-500/50 to-emerald-500/50",
    orange: "from-orange-500/50 to-yellow-500/50"
  }

  return (
    <motion.div
      className={`relative perspective-1000 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-4 bg-gradient-to-r ${glowColors[glowColor]} rounded-2xl blur-xl`}
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      />
      
      {/* Main card */}
      <motion.div
        className="relative glass-card overflow-hidden"
        variants={cardVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        style={{
          transformStyle: "preserve-3d"
        }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          variants={shimmerVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Floating particles on hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{
                  x: mousePosition.x,
                  y: mousePosition.y,
                  opacity: 0
                }}
                animate={{
                  x: mousePosition.x + (Math.random() - 0.5) * 100,
                  y: mousePosition.y + (Math.random() - 0.5) * 100,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default InteractiveCard