import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingSpectacle = ({ message = "Analyzing your health data..." }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const steps = [
    { text: "Initializing AI models...", icon: "🤖", duration: 1000 },
    { text: "Processing health metrics...", icon: "📊", duration: 1500 },
    { text: "Analyzing risk factors...", icon: "🔍", duration: 1200 },
    { text: "Generating predictions...", icon: "🧠", duration: 1000 },
    { text: "Finalizing results...", icon: "✨", duration: 800 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 200);

    const stepTimer = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 1500);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, []);

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const dotVariants = {
    animate: {
      y: [0, -30, 0],
      scale: [1, 1.5, 1],
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const pulseVariants = {
    animate: {
      scale: [1, 2.5, 1],
      opacity: [0.8, 0, 0.8],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const orbitVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  const dnaVariants = {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-pink-900/80 backdrop-blur-lg flex items-center justify-center z-50"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        {/* Main loading animation */}
        <div className="relative mb-12">
          {/* Multiple pulsing backgrounds */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className={`absolute inset-0 w-${32 + ring * 8} h-${32 + ring * 8} mx-auto bg-gradient-to-r from-blue-500/${30 - ring * 5} to-purple-500/${30 - ring * 5} rounded-full`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0.2, 0.8],
              }}
              transition={{
                duration: 3 + ring * 0.5,
                repeat: Infinity,
                delay: ring * 0.3,
              }}
            />
          ))}
          
          {/* DNA Helix Animation */}
          <motion.div
            className="relative w-40 h-40 mx-auto"
            variants={dnaVariants}
            animate="animate"
          >
            {/* Orbiting particles */}
            {[
              { color: 'bg-blue-400', size: 'w-4 h-4', position: 'top-0 left-1/2 transform -translate-x-1/2' },
              { color: 'bg-purple-400', size: 'w-3 h-3', position: 'top-1/2 right-0 transform -translate-y-1/2' },
              { color: 'bg-pink-400', size: 'w-3.5 h-3.5', position: 'bottom-0 left-1/2 transform -translate-x-1/2' },
              { color: 'bg-cyan-400', size: 'w-3 h-3', position: 'top-1/2 left-0 transform -translate-y-1/2' },
              { color: 'bg-yellow-400', size: 'w-2.5 h-2.5', position: 'top-1/4 right-1/4' },
              { color: 'bg-green-400', size: 'w-2.5 h-2.5', position: 'bottom-1/4 left-1/4' },
            ].map((particle, i) => (
              <motion.div
                key={i}
                className={`absolute ${particle.position} ${particle.size} ${particle.color} rounded-full shadow-lg`}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
          
          {/* Center animated icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="text-6xl filter drop-shadow-lg"
              animate={{
                textShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.5)',
                  '0 0 40px rgba(139, 92, 246, 0.8)',
                  '0 0 20px rgba(59, 130, 246, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🧬
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced bouncing dots */}
        <motion.div 
          className="flex justify-center space-x-3 mb-8"
          variants={containerVariants}
          animate="animate"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full shadow-lg"
              variants={dotVariants}
              animate="animate"
              transition={{ delay: i * 0.15 }}
            />
          ))}
        </motion.div>

        {/* Dynamic step indicator */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <motion.div
              className="text-5xl mb-4"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {steps[currentStep].icon}
            </motion.div>
            <motion.p
              className="text-white text-xl font-semibold"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {steps[currentStep].text}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Enhanced progress bar */}
        <div className="w-80 mx-auto">
          <motion.div 
            className="w-full h-3 bg-white/20 rounded-full overflow-hidden shadow-inner"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </motion.div>
          
          <motion.p
            className="text-white/80 text-sm mt-3 font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {Math.round(Math.min(progress, 100))}% Complete
          </motion.p>
        </div>

        {/* Floating medical icons */}
        <div className="absolute inset-0 pointer-events-none">
          {['🩺', '💊', '🧪', '📋', '💉'].map((icon, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-20"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {icon}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingSpectacle