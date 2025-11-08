export const config = {
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  API_ENDPOINTS: {
    HEALTH: '/api/health',
    PREDICT: '/api/predict'
  },
  APP_NAME: 'Diabetes Diet Planner',
  VERSION: '1.0.0'
};