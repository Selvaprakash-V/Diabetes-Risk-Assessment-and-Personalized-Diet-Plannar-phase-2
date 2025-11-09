import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ParticleSystem = ({ particleCount = 50, colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981'] }) => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
      direction: Math.random() > 0.5 ? 1 : -1,
      amplitude: Math.random() * 50 + 20
    }))
    setParticles(newParticles)
  }, [particleCount, colors])

  const particleVariants = {
    animate: (particle) => ({
      x: [
        `${particle.x}vw`,
        `${particle.x + particle.direction * particle.amplitude}vw`,
        `${particle.x}vw`
      ],
      y: [
        `${particle.y}vh`,
        `${particle.y - particle.amplitude}vh`,
        `${particle.y}vh`
      ],
      scale: [0, 1, 0.5, 1, 0],
      opacity: [0, 0.8, 0.6, 0.8, 0],
      rotate: [0, 180, 360],
      transition: {
        duration: particle.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: particle.delay
      }
    })
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            filter: 'blur(1px)',
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}40`
          }}
          variants={particleVariants}
          animate="animate"
          custom={particle}
        />
      ))}
      
      {/* DNA Helix Animation */}
      <motion.div
        className="absolute top-1/4 right-10 opacity-10"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
          transition: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
      >
        <svg width="60" height="200" viewBox="0 0 60 200" fill="none">
          {Array.from({ length: 10 }, (_, i) => (
            <g key={i}>
              <motion.circle
                cx="15"
                cy={20 + i * 18}
                r="3"
                fill="#3B82F6"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                  transition: { duration: 2, repeat: Infinity, delay: i * 0.2 }
                }}
              />
              <motion.circle
                cx="45"
                cy={20 + i * 18}
                r="3"
                fill="#8B5CF6"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                  transition: { duration: 2, repeat: Infinity, delay: i * 0.2 + 0.1 }
                }}
              />
              <motion.line
                x1="15"
                y1={20 + i * 18}
                x2="45"
                y2={20 + i * 18}
                stroke="#EC4899"
                strokeWidth="1"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  transition: { duration: 2, repeat: Infinity, delay: i * 0.2 }
                }}
              />
            </g>
          ))}
        </svg>
      </motion.div>
      
      {/* Floating Medical Icons */}
      <motion.div
        className="absolute top-20 left-20 text-4xl opacity-20"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, -10, 0],
          transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        🧬
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 right-32 text-3xl opacity-20"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, -15, 15, 0],
          transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }
        }}
      >
        🩺
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 left-10 text-2xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
          transition: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }
        }}
      >
        💊
      </motion.div>
    </div>
  )
}

export default ParticleSystem