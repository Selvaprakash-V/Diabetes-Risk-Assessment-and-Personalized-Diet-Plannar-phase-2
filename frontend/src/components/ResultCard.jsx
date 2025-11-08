import React from 'react';
import { motion } from 'framer-motion';

const ResultCard = ({ prediction, inputData }) => {
  const isHighRisk = prediction.prediction === 1;
  const healthyProb = (prediction.probability[0] * 100).toFixed(1);
  const diabeticProb = (prediction.probability[1] * 100).toFixed(1);

  const getRiskLevel = () => {
    if (diabeticProb < 30) return { level: 'Low', color: 'green', emoji: '😊' };
    if (diabeticProb < 60) return { level: 'Moderate', color: 'yellow', emoji: '😐' };
    return { level: 'High', color: 'red', emoji: '😟' };
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-8 mb-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-center mb-8 gradient-text"
      >
        📋 Analysis Results
      </motion.h2>

      {/* Main Result Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`p-6 rounded-2xl mb-6 text-center ${
          isHighRisk 
            ? 'bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-200' 
            : 'bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-200'
        }`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          className="text-6xl mb-4"
        >
          {risk.emoji}
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`text-2xl font-bold mb-2 ${
            isHighRisk ? 'text-red-700' : 'text-green-700'
          }`}
        >
          {isHighRisk ? '⚠️ HIGH DIABETES RISK' : '✅ LOW DIABETES RISK'}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-lg text-gray-700"
        >
          Risk Level: <span className="font-semibold">{risk.level}</span>
        </motion.p>
      </motion.div>

      {/* Probability Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/60 p-4 rounded-xl text-center"
        >
          <div className="text-2xl font-bold text-green-600">{healthyProb}%</div>
          <div className="text-sm text-gray-600">Healthy Probability</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${healthyProb}%` }}
              transition={{ delay: 0.8, duration: 1 }}
              className="bg-green-500 h-2 rounded-full"
            ></motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/60 p-4 rounded-xl text-center"
        >
          <div className="text-2xl font-bold text-blue-600">{(prediction.accuracy * 100).toFixed(1)}%</div>
          <div className="text-sm text-gray-600">Model Accuracy</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${prediction.accuracy * 100}%` }}
              transition={{ delay: 0.9, duration: 1 }}
              className="bg-blue-500 h-2 rounded-full"
            ></motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/60 p-4 rounded-xl text-center"
        >
          <div className="text-2xl font-bold text-red-600">{diabeticProb}%</div>
          <div className="text-sm text-gray-600">Diabetic Probability</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${diabeticProb}%` }}
              transition={{ delay: 1, duration: 1 }}
              className="bg-red-500 h-2 rounded-full"
            ></motion.div>
          </div>
        </motion.div>
      </div>

      {/* Health Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white/60 p-6 rounded-xl"
      >
        <h4 className="text-lg font-semibold mb-4 text-gray-800">🎯 Health Indicators</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {indicators.map((indicator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className={`p-3 rounded-lg border-l-4 ${
                indicator.color === 'green' ? 'bg-green-50 border-green-400' :
                indicator.color === 'yellow' ? 'bg-yellow-50 border-yellow-400' :
                indicator.color === 'red' ? 'bg-red-50 border-red-400' :
                'bg-blue-50 border-blue-400'
              }`}
            >
              <span className="font-medium">{indicator.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200"
      >
        <h4 className="text-lg font-semibold mb-3 text-gray-800">💡 Recommendations</h4>
        <div className="space-y-2 text-gray-700">
          {isHighRisk ? (
            <>
              <p>• Consult with a healthcare professional for proper diagnosis</p>
              <p>• Monitor blood glucose levels regularly</p>
              <p>• Follow a low-carbohydrate diet</p>
              <p>• Increase physical activity</p>
              <p>• Maintain a healthy weight</p>
            </>
          ) : (
            <>
              <p>• Maintain your healthy lifestyle</p>
              <p>• Continue regular exercise routine</p>
              <p>• Follow a balanced diet</p>
              <p>• Schedule regular health checkups</p>
              <p>• Stay hydrated and get adequate sleep</p>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultCard;