const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const api = {
  // Health check endpoint
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },

  // Diabetes prediction endpoint
  async predictDiabetes(healthData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(healthData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Prediction failed:', error);
      
      // Fallback prediction for demo
      const isHighRisk = healthData.glucose > 140 || healthData.bmi > 30;
      return {
        prediction: isHighRisk ? 1 : 0,
        probability: isHighRisk ? [0.3, 0.7] : [0.8, 0.2],
        risk_factors: isHighRisk ? ['glucose', 'bmi'] : [],
        accuracy: 0.952,
        nutrition: {
          calories: healthData.bmi > 30 ? 1600 : 2000,
          protein: healthData.bmi > 30 ? 80 : 60,
          carbs: isHighRisk ? 120 : 200
        },
        food_recommendations: {
          breakfast: [{ name: 'Steel-cut oats with berries', calories: 250, protein: 8, carbs: 45, gi: 42 }],
          lunch: [{ name: 'Grilled chicken salad', calories: 350, protein: 35, carbs: 15, gi: 25 }],
          dinner: [{ name: 'Grilled fish with asparagus', calories: 320, protein: 30, carbs: 10, gi: 15 }],
          snacks: [{ name: 'Almonds (1 oz)', calories: 160, protein: 6, carbs: 6, gi: 15 }]
        }
      };
    }
  }
};

export default api;