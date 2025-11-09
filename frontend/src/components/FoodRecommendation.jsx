import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const FoodRecommendation = ({ dailyMealPlan, riskLevel }) => {
  const [expandedMeal, setExpandedMeal] = useState(null);

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      case 'Moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 mb-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8 gradient-text"
      >
        🍽️ Food Recommendations
      </motion.h2>

      {/* Daily Nutrition Summary */}
      {dailyMealPlan?.daily_nutrition && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8 border border-green-200"
        >
          <h3 className="text-xl font-bold text-center mb-4 text-gray-800">📊 Daily Nutrition Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/60 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-600">{dailyMealPlan.daily_nutrition.calories}</div>
              <div className="text-sm text-gray-600">Calories</div>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-600">{dailyMealPlan.daily_nutrition.protein}g</div>
              <div className="text-sm text-gray-600">Protein</div>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-600">{dailyMealPlan.daily_nutrition.fiber}g</div>
              <div className="text-sm text-gray-600">Fiber</div>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <div className="text-2xl font-bold text-orange-600">{dailyMealPlan.daily_nutrition.avg_gi}</div>
              <div className="text-sm text-gray-600">Avg GI</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Daily Meal Plan */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {dailyMealPlan && Object.entries(dailyMealPlan).map(([mealType, foods]) => {
          if (mealType === 'daily_nutrition' || !Array.isArray(foods)) return null;
          
          const mealIcons = {
            breakfast: '🌅',
            lunch: '☀️',
            dinner: '🌙',
            snacks: '🍎'
          };

          return (
            <motion.div
              key={mealType}
              variants={itemVariants}
              className="mb-6"
            >
              <motion.button
                onClick={() => setExpandedMeal(expandedMeal === mealType ? null : mealType)}
                whileHover={{ scale: 1.02 }}
                className="w-full bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200 hover:border-blue-300 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{mealIcons[mealType]}</span>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-gray-800 capitalize">
                        {mealType}
                      </h3>
                      <p className="text-gray-600">
                        {foods.length} recommended items
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedMeal === mealType ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDownIcon className="w-6 h-6 text-gray-600" />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {expandedMeal === mealType && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {foods.map((food, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/80 rounded-xl p-6 border border-white/40 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-center mb-4">
                          <div className="text-3xl mb-2">{food.icon}</div>
                          <h4 className="font-bold text-lg text-gray-800 mb-2">
                            {food.title}
                          </h4>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(food.risk_level)}`}>
                            {food.risk_level} Risk
                          </span>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Calories:</span>
                            <span className="font-semibold">{food.calories}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Protein:</span>
                            <span className="font-semibold">{food.protein}g</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Fiber:</span>
                            <span className="font-semibold">{food.fiber}g</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">GI Index:</span>
                            <span className={`font-semibold ${food.gi_index < 55 ? 'text-green-600' : food.gi_index < 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {food.gi_index}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default FoodRecommendation;