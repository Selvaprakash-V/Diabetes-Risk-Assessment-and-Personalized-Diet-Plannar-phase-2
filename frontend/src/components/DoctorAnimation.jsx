import React from 'react'
import { motion } from 'framer-motion'

const DoctorAnimation = ({ width = 144, height = 144 }) => {
  const headBob = {
    animate: { y: [0, -6, 0], rotate: [0, -2, 0] },
    transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
  }

  const handWave = {
    animate: { rotate: [0, -18, 0, -8, 0] },
    transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
  }

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="240" height="240" rx="20" fill="#F3F7FF" />

      <motion.g {...headBob} transform="translate(30,20)">
        <motion.circle cx="60" cy="40" r="26" fill="#FFEFD5" stroke="#E6C9A0" />
        <motion.ellipse cx="50" cy="44" rx="3" ry="2" fill="#3b3b3b" />
        <motion.ellipse cx="70" cy="44" rx="3" ry="2" fill="#3b3b3b" />
      </motion.g>

      <g transform="translate(30,20)">
        <rect x="24" y="74" width="72" height="60" rx="10" fill="#ffffff" stroke="#D1E8FF" />
        <path d="M10 120 C 40 140, 80 140, 110 120" stroke="#D1E8FF" strokeWidth="6" fill="none" strokeLinecap="round" />
      </g>

      {/* waving hand group - positioned to the right of the body */}
      <motion.g style={{ originX: '170px', originY: '120px' }} {...handWave}>
        <ellipse cx="170" cy="110" rx="12" ry="8" fill="#FFEFD5" stroke="#E6C9A0" />
        <rect x="162" y="118" width="16" height="36" rx="6" fill="#ffffff" stroke="#D1E8FF" />
      </motion.g>

      <text x="120" y="200" fontFamily="Helvetica, Arial" fontSize="12" fill="#3b4a59" textAnchor="middle">Dr. Care</text>
    </motion.svg>
  )
}

export default DoctorAnimation
