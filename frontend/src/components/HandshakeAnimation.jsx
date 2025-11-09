import React from 'react'
import { motion } from 'framer-motion'

const HandshakeAnimation = ({ size = 48 }) => {
  const container = {
    hidden: { rotate: -10, scale: 0.95 },
    visible: {
      rotate: 0,
      scale: 1,
      transition: { yoyo: Infinity, duration: 1.2 }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      style={{ display: 'inline-block' }}
      aria-hidden
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12s4-6 10-6 10 6 10 6" stroke="#06b6d4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 12l3 3 7-7" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 12l3-3 7 7" stroke="#fb7185" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      </svg>
    </motion.div>
  )
}

export default HandshakeAnimation
