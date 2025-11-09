import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, ExclamationTriangleIcon, HeartIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const ResultCard = ({ prediction, inputData }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({ healthy: 0, diabetic: 0, accuracy: 0 });
  
  const isHighRisk = prediction.prediction === 1;
  const healthyProb = (prediction.probability[0] * 100).toFixed(1);
  const diabeticProb = (prediction.probability[1] * 100).toFixed(1);
  const accuracy = (prediction.accuracy * 100).toFixed(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({
        healthy: parseFloat(healthyProb),
        diabetic: parseFloat(diabeticProb),
        accuracy: parseFloat(accuracy)
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [healthyProb, diabeticProb, accuracy]);

  const getRiskLevel = () => {
    if (diabeticProb < 30) return { level: 'Low', color: 'green', emoji: '😊', gradient: 'from-green-400 to-emerald-500' };
    if (diabeticProb < 60) return { level: 'Moderate', color: 'yellow', emoji: '😐', gradient: 'from-yellow-400 to-orange-500' };
    return { level: 'High', color: 'red', emoji: '😟', gradient: 'from-red-400 to-pink-500' };
  };

  const risk = getRiskLevel();

  const getHealthIndicators = () => {
    const indicators = [];
    
    if (inputData.bmi < 18.5) indicators.push({ text: 'Underweight', color: 'blue' });
    else if (inputData.bmi < 25) indicators.push({ text: 'Normal Weight', color: 'green' });
    else if (inputData.bmi < 30) indicators.push({ text: 'Overweight', color: 'yellow' });
    else indicators.push({ text: 'Obese', color: 'red' });

    if (inputData.glucose < 70) indicators.push({ text: 'Low Glucose', color: 'blue' });
    else if (inputData.glucose <= 140) indicators.push({ text: 'Normal Glucose', color: 'green' });
    else if (inputData.glucose <= 199) indicators.push({ text: 'Pre-diabetic', color: 'yellow' });
    else indicators.push({ text: 'Diabetic Range', color: 'red' });

    return indicators;
  };

  const indicators = getHealthIndicators();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
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
          className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r ${risk.gradient} opacity-10 rounded-full blur-xl`}
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl"
        />
      </div>

      <motion.div
        variants={itemVariants}
        className="text-center mb-8 relative z-10"
      >
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block mb-4"
        >
          <ChartBarIcon className="w-12 h-12 text-blue-500 mx-auto" />
        </motion.div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          📋 Analysis Results
        </h2>
      </motion.div>

      {/* Main Result Card */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02, y: -5 }}
        className={`relative p-8 rounded-3xl mb-8 text-center overflow-hidden border-2 ${
          isHighRisk 
            ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200' 
            : 'bg-gradient-to-br from-green-50 to-blue-50 border-green-200'
        }`}
      >
        {/* Animated glow effect */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className={`absolute inset-0 bg-gradient-to-r ${risk.gradient} opacity-20 blur-2xl`}
        />
        
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 10 }}
            className="mb-6"
          >
            {isHighRisk ? (
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-xl"
              >
                <ExclamationTriangleIcon className="w-12 h-12" />
              </motion.div>
            ) : (
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-xl"
              >
                <CheckCircleIcon className="w-12 h-12" />
              </motion.div>
            )}
          </motion.div>
          
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={`text-3xl font-bold mb-4 ${
              isHighRisk ? 'text-red-700' : 'text-green-700'
            }`}
          >
            {isHighRisk ? 'HIGH DIABETES RISK' : 'LOW DIABETES RISK'}
          </motion.h3>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className={`inline-block px-6 py-3 rounded-2xl font-bold text-lg text-white bg-gradient-to-r ${risk.gradient} shadow-lg`}
          >
            Risk Level: {risk.level}
          </motion.div>
        </div>
      </motion.div>

      {/* Probability Visualization */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {[
          { value: animatedValues.healthy, label: 'Healthy Probability', color: 'from-green-400 to-emerald-500', icon: '💚', bgColor: 'bg-green-50' },
          { value: animatedValues.accuracy, label: 'Model Accuracy', color: 'from-blue-400 to-cyan-500', icon: '🎯', bgColor: 'bg-blue-50' },
          { value: animatedValues.diabetic, label: 'Diabetic Probability', color: 'from-red-400 to-pink-500', icon: '⚠️', bgColor: 'bg-red-50' }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`relative p-6 rounded-2xl text-center ${item.bgColor} border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}
          >
            {/* Animated background */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
              className={`absolute inset-0 bg-gradient-to-r ${item.color} blur-xl`}
            />
            
            <div className="relative z-10">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                className="text-3xl mb-3"
              >
                {item.icon}
              </motion.div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + index * 0.1, type: "spring", stiffness: 200 }}
                className={`text-3xl font-bold mb-2 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
              >
                {item.value.toFixed(1)}%
              </motion.div>
              
              <div className="text-sm font-semibold text-gray-700 mb-4">{item.label}</div>
              
              {/* Animated progress bar */}
              <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0, x: '-100%' }}
                  animate={{ width: `${item.value}%`, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 1.5, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full relative`}
                >
                  <motion.div
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 2 + index * 0.2
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Health Indicators */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl mb-8 border border-white/30 shadow-lg relative overflow-hidden"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-xl"
        />
        
        <div className="relative z-10">
          <motion.div
            className="flex items-center mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mr-3 text-2xl"
            >
              🎯
            </motion.div>
            <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Health Indicators
            </h4>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {indicators.map((indicator, index) => {
              const colorClasses = {
                green: { bg: 'bg-green-50', border: 'border-green-400', text: 'text-green-700', gradient: 'from-green-400 to-emerald-500' },
                yellow: { bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-700', gradient: 'from-yellow-400 to-orange-500' },
                red: { bg: 'bg-red-50', border: 'border-red-400', text: 'text-red-700', gradient: 'from-red-400 to-pink-500' },
                blue: { bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-700', gradient: 'from-blue-400 to-cyan-500' }
              };
              const colors = colorClasses[indicator.color];
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  className={`relative p-4 rounded-xl border-l-4 ${colors.bg} ${colors.border} shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden`}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-10`}
                  />
                  <span className={`font-semibold text-lg relative z-10 ${colors.text}`}>
                    {indicator.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="relative p-8 bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-sm rounded-2xl border border-blue-200/50 shadow-lg overflow-hidden"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-2xl"
        />
        
        <div className="relative z-10">
          <motion.div
            className="flex items-center mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mr-3 text-2xl"
            >
              💡
            </motion.div>
            <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Recommendations
            </h4>
          </motion.div>
          
          <div className="space-y-3">
            {(isHighRisk ? [
              'Consult with a healthcare professional for proper diagnosis',
              'Monitor blood glucose levels regularly',
              'Follow a low-carbohydrate diet',
              'Increase physical activity',
              'Maintain a healthy weight'
            ] : [
              'Maintain your healthy lifestyle',
              'Continue regular exercise routine',
              'Follow a balanced diet',
              'Schedule regular health checkups',
              'Stay hydrated and get adequate sleep'
            ]).map((recommendation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-center p-3 bg-white/60 rounded-xl border border-white/30 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="mr-3 text-lg"
                >
                  {isHighRisk ? '⚠️' : '✅'}
                </motion.div>
                <span className="text-gray-700 font-medium">{recommendation}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultCard;