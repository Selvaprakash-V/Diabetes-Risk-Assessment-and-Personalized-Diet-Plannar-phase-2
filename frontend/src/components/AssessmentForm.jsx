import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, HeartIcon, BeakerIcon } from '@heroicons/react/24/outline';

const AssessmentForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    pregnancies: 3,
    glucose: 120,
    bloodPressure: 70,
    skinThickness: 20,
    insulin: 79,
    bmi: 24.0,
    diabetesPedigreeFunction: 0.47,
    age: 33
  });

  const [focusedField, setFocusedField] = useState(null);
  const [hoveredField, setHoveredField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputFields = [
    { name: 'pregnancies', label: '🤰 Pregnancies', type: 'number', min: 0, max: 17, step: 1, color: 'from-pink-400 to-rose-500' },
    { name: 'glucose', label: '🍬 Glucose Level (mg/dL)', type: 'range', min: 0, max: 200, step: 1, color: 'from-yellow-400 to-orange-500' },
    { name: 'bloodPressure', label: '💓 Blood Pressure (mmHg)', type: 'range', min: 0, max: 122, step: 1, color: 'from-red-400 to-pink-500' },
    { name: 'skinThickness', label: '📏 Skin Thickness (mm)', type: 'range', min: 0, max: 100, step: 1, color: 'from-green-400 to-emerald-500' },
    { name: 'insulin', label: '💉 Insulin Level (μU/mL)', type: 'range', min: 0, max: 846, step: 1, color: 'from-blue-400 to-cyan-500' },
    { name: 'bmi', label: '⚖️ BMI (kg/m²)', type: 'number', min: 0, max: 67, step: 0.1, color: 'from-purple-400 to-violet-500' },
    { name: 'diabetesPedigreeFunction', label: '🧬 Diabetes Pedigree Function', type: 'number', min: 0, max: 2.4, step: 0.01, color: 'from-indigo-400 to-blue-500' },
    { name: 'age', label: '🎂 Age (years)', type: 'number', min: 21, max: 88, step: 1, color: 'from-teal-400 to-cyan-500' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="glass-card p-8 mb-8 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-r from-pink-200/20 to-yellow-200/20 rounded-full blur-xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center mb-8 relative z-10"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block mb-4"
        >
          <SparklesIcon className="w-8 h-8 text-blue-500 mx-auto" />
        </motion.div>
        <h2 className="text-3xl font-bold gradient-text mb-2">
          Health Metrics Input
        </h2>
        <p className="text-gray-600">Enter your health data for AI-powered analysis</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {inputFields.map((field, index) => (
            <motion.div
              key={field.name}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              onHoverStart={() => setHoveredField(field.name)}
              onHoverEnd={() => setHoveredField(null)}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                focusedField === field.name || hoveredField === field.name
                  ? 'border-blue-300 bg-white/80 shadow-lg'
                  : 'border-white/30 bg-white/60'
              } backdrop-blur-sm`}
            >
              {/* Animated border glow */}
              <AnimatePresence>
                {(focusedField === field.name || hoveredField === field.name) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${field.color} opacity-20 blur-sm`}
                  />
                )}
              </AnimatePresence>

              <div className="relative z-10">
                <motion.label
                  animate={focusedField === field.name ? { scale: 1.05, color: '#3B82F6' } : {}}
                  className="block text-lg font-semibold text-gray-700 mb-3 flex items-center"
                >
                  <span className="mr-2 text-2xl">{field.label.split(' ')[0]}</span>
                  <span>{field.label.substring(field.label.indexOf(' ') + 1)}</span>
                </motion.label>
                
                {field.type === 'range' ? (
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="range"
                        name={field.name}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        value={formData[field.name]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        className="w-full h-3 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((formData[field.name] - field.min) / (field.max - field.min)) * 100}%, #e2e8f0 ${((formData[field.name] - field.min) / (field.max - field.min)) * 100}%, #e2e8f0 100%)`
                        }}
                      />
                      {/* Animated value indicator */}
                      <motion.div
                        animate={{ scale: focusedField === field.name ? 1.1 : 1 }}
                        className={`absolute -top-12 bg-gradient-to-r ${field.color} text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg`}
                        style={{
                          left: `${((formData[field.name] - field.min) / (field.max - field.min)) * 100}%`,
                          transform: 'translateX(-50%)'
                        }}
                      >
                        {formData[field.name]}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-current"></div>
                      </motion.div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{field.min}</span>
                      <span>{field.max}</span>
                    </div>
                  </div>
                ) : (
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type={field.type}
                    name={field.name}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={formData[field.name]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm text-lg font-semibold"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center"
        >
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="relative px-12 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
          >
            {/* Animated background */}
            <motion.div
              animate={{
                x: loading ? ['-100%', '100%'] : '0%',
              }}
              transition={{
                duration: 1.5,
                repeat: loading ? Infinity : 0,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            
            <div className="relative z-10 flex items-center justify-center space-x-3">
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🔍
                  </motion.span>
                  <span>Analyze Risk Profile</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ✨
                  </motion.div>
                </>
              )}
            </div>
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default AssessmentForm;