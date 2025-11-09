from flask import Blueprint, request, jsonify, send_file
from .model_loader import load_model, predict_diabetes
import subprocess
from pathlib import Path
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


@api_bp.route('/run-tests', methods=['GET', 'POST'])
def run_tests():
    """Run backend tests and return a downloadable test result file.

    This endpoint runs pytest on the backend/tests folder and returns the
    captured stdout/stderr as a text file attachment.
    """
    try:
        # Calculate repository root (../../ from this file: backend/app/routes.py)
        repo_root = Path(__file__).resolve().parents[2]
        tests_dir = repo_root / 'backend' / 'tests'
        result_file = repo_root / 'backend' / 'test_results.txt'

        # Ensure pytest is available; run it and capture output
        cmd = ['pytest', '-q', str(tests_dir)]
        proc = subprocess.run(cmd, cwd=str(repo_root), capture_output=True, text=True)

        output = ''
        if proc.stdout:
            output += proc.stdout
        if proc.stderr:
            output += '\nSTDERR:\n' + proc.stderr

        result_file.write_text(output, encoding='utf-8')

        # Send the result file as an attachment
        return send_file(str(result_file), as_attachment=True, download_name='test_results.txt', mimetype='text/plain')

    except Exception as e:
        return jsonify({'error': 'Failed to run tests', 'message': str(e)}), 500

@api_bp.route('/', methods=['GET'])
def root():
    return jsonify({
        'message': 'Diabetes Prediction API',
        'status': 'running',
        'endpoints': ['/api/predict', '/api/health']
    })