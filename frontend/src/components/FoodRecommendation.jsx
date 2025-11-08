import React from 'react';
import { motion } from 'framer-motion';

const FoodRecommendation = ({ prediction, inputData }) => {
  const isHighRisk = prediction.prediction === 1;
  const { glucose, bmi, age } = inputData;

  // Use nutrition data from API if available, otherwise calculate
  const nutrition = prediction.nutrition || {
    calories: 2000,
    protein: 50,
    carbs: isHighRisk ? 120 : 200
  };

  // Use food recommendations from API if available
  const recommendations = prediction.food_recommendations || {
    breakfast: [{ name: 'Steel-cut oats with berries', calories: 250, protein: 8, carbs: 45, gi: 42 }],
    lunch: [{ name: 'Grilled chicken salad', calories: 350, protein: 35, carbs: 15, gi: 25 }],
    dinner: [{ name: 'Grilled fish with asparagus', calories: 320, protein: 30, carbs: 10, gi: 15 }],
    snacks: [{ name: 'Almonds (1 oz)', calories: 160, protein: 6, carbs: 6, gi: 15 }]
  };

  // Use sample meal plan from API if available
  const plan = prediction.sample_meal_plan ? 
    prediction.sample_meal_plan.map((item, index) => ({
      ...item,
      mealType: ['breakfast', 'lunch', 'dinner', 'snacks'][index]
    })) : 
    Object.entries(recommendations).map(([mealType, items]) => ({ ...items[0], mealType }));

  const totals = prediction.meal_plan_nutrition || {
    calories: plan.reduce((sum, meal) => sum + meal.calories, 0),
    protein: plan.reduce((sum, meal) => sum + meal.protein, 0),
    carbs: plan.reduce((sum, meal) => sum + meal.carbs, 0)
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-8 mt-8"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-center mb-8 gradient-text"
      >
        🍽️ Personalized Food Recommendations
      </motion.h2>

      {/* Nutritional Targets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <div className="bg-white/60 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-blue-600">{nutrition.calories}</div>
          <div className="text-sm text-gray-600">Daily Calories</div>
        </div>
        <div className="bg-white/60 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-green-600">{nutrition.protein}g</div>
          <div className="text-sm text-gray-600">Protein Target</div>
        </div>
        <div className="bg-white/60 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-purple-600">{nutrition.carbs}g</div>
          <div className="text-sm text-gray-600">Carb Limit</div>
        </div>
      </motion.div>

      {/* Diet Type Alert */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className={`p-4 rounded-xl mb-6 text-center ${
          isHighRisk || glucose > 140
            ? 'bg-red-50 border border-red-200'
            : 'bg-green-50 border border-green-200'
        }`}
      >
        <div className="text-lg font-semibold">
          {isHighRisk || glucose > 140 ? '🔴 Low GI Diet Recommended' : '🟢 Balanced Diet Plan'}
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {isHighRisk || glucose > 140 
            ? 'Focus on low glycemic index foods to manage blood sugar'
            : 'Maintain balanced nutrition with moderate carbohydrates'
          }
        </div>
      </motion.div>

      {/* Today's Meal Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/60 p-6 rounded-xl mb-6"
      >
        <h3 className="text-lg font-semibold mb-4">📅 Today's Meal Plan</h3>
        <div className="space-y-4">
          {plan.map((meal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex justify-between items-center p-3 bg-white/50 rounded-lg"
            >
              <div>
                <div className="font-medium capitalize">{meal.mealType}: {meal.name}</div>
                <div className="text-sm text-gray-600">GI: {meal.gi} (Low)</div>
              </div>
              <div className="text-right text-sm">
                <div>{meal.calories} cal</div>
                <div>{meal.protein}g protein</div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Daily Totals */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm font-semibold">
            <span>Daily Totals:</span>
            <span>{totals.calories} cal | {totals.protein}g protein | {totals.carbs}g carbs</span>
          </div>
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"
      >
        <h4 className="font-semibold mb-2">💡 Nutrition Tips</h4>
        <div className="text-sm text-gray-700 space-y-1">
          {isHighRisk || glucose > 140 ? (
            <>
              <p>• Choose foods with GI &lt; 55 to manage blood sugar</p>
              <p>• Eat protein with each meal to slow glucose absorption</p>
              <p>• Monitor portion sizes and eat at regular intervals</p>
            </>
          ) : (
            <>
              <p>• Maintain balanced meals with all food groups</p>
              <p>• Stay hydrated and include fiber-rich foods</p>
              <p>• Practice portion control for weight management</p>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FoodRecommendation;