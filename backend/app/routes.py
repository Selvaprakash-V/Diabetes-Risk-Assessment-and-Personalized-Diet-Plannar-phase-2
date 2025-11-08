from flask import Blueprint, request, jsonify
from .model_loader import load_model, predict_diabetes
from .diet_recommender import get_food_recommendations, calculate_meal_plan_nutrition
from .utils import calculate_nutrition_needs, validate_input_data

api_bp = Blueprint('api', __name__, url_prefix='/api')

# Load model on startup
model = load_model()

@api_bp.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Validate input data
        if not validate_input_data(data):
            return jsonify({'error': 'Invalid input data'}), 400
        
        # Make prediction
        prediction, probability = predict_diabetes(model, data)
        
        # Calculate risk factors
        risk_factors = []
        if data['glucose'] > 140: risk_factors.append('glucose')
        if data['bmi'] > 30: risk_factors.append('bmi')
        if data['age'] > 60: risk_factors.append('age')
        if data['bloodPressure'] > 90: risk_factors.append('bloodPressure')
        
        # Calculate nutrition needs
        nutrition = calculate_nutrition_needs(
            data['bmi'], data['age'], data['glucose'], prediction == 1
        )
        
        # Get food recommendations
        food_recommendations = get_food_recommendations(
            prediction == 1, data['glucose'], data['bmi'], data['age'], nutrition['calories']
        )
        
        # Create sample meal plan
        sample_meal_plan = [
            food_recommendations['breakfast'][0],
            food_recommendations['lunch'][0], 
            food_recommendations['dinner'][0],
            food_recommendations['snacks'][0]
        ]
        
        meal_plan_nutrition = calculate_meal_plan_nutrition(sample_meal_plan)
        
        return jsonify({
            'prediction': int(prediction),
            'probability': probability,
            'risk_factors': risk_factors,
            'accuracy': 0.952,
            'nutrition': nutrition,
            'food_recommendations': food_recommendations,
            'sample_meal_plan': sample_meal_plan,
            'meal_plan_nutrition': meal_plan_nutrition
        })
            
    except Exception as e:
        return jsonify({
            'error': 'Prediction failed',
            'message': str(e)
        }), 500

@api_bp.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy', 
        'model_loaded': model is not None,
        'version': '1.0.0',
        'endpoints': ['/api/predict', '/api/health']
    })

@api_bp.route('/', methods=['GET'])
def root():
    return jsonify({
        'message': 'Diabetes Prediction API',
        'status': 'running',
        'endpoints': ['/api/predict', '/api/health']
    })