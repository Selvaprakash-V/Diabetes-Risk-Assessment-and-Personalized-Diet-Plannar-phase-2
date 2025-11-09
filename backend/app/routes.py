from flask import Blueprint, request, jsonify, send_file
from .model_loader import load_model, predict_diabetes
import subprocess
from pathlib import Path
from .diet_recommender import get_food_recommendations, calculate_meal_plan_nutrition
from .utils import calculate_nutrition_needs, validate_input_data
import io
from datetime import datetime

# reportlab for PDF generation
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, Frame, KeepInFrame

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

        # Run tests using the current Python interpreter's unittest discover
        # Use `python -m unittest discover` which is available in the stdlib
        import sys
        cmd = [sys.executable, '-m', 'unittest', 'discover', '-v', str(tests_dir)]
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


@api_bp.route('/report', methods=['POST'])
def generate_report():
    """Generate a PDF report for a user payload: includes inputs, risk, probabilities,
    nutrition and recommended foods. Returns application/pdf attachment.
    """
    try:
        data = request.json or {}

        # Validate input data if present
        if not validate_input_data(data):
            return jsonify({'error': 'Invalid input data'}), 400

        # Run prediction using existing model loader
        prediction, probability = predict_diabetes(model, data)

        # Calculate nutrition and recommendations
        nutrition = calculate_nutrition_needs(
            data['bmi'], data['age'], data['glucose'], prediction == 1
        )

        food_recommendations = get_food_recommendations(
            prediction == 1, data['glucose'], data['bmi'], data['age'], nutrition['calories']
        )

        # Build PDF in memory
        buffer = io.BytesIO()
        doc = canvas.Canvas(buffer, pagesize=letter)
        width, height = letter

        # --- Header ---
        title = 'Diabetes Risk Assessment Report'
        header_height = inch * 0.9
        # colored header box
        doc.setFillColor(colors.HexColor('#0b74de'))
        doc.rect(0, height - header_height, width, header_height, stroke=0, fill=1)
        doc.setFillColor(colors.white)
        doc.setFont('Helvetica-Bold', 20)
        doc.drawCentredString(width / 2.0, height - header_height / 2 + 6, title)
        # subtitle timestamp
        doc.setFont('Helvetica', 9)
        ts = datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')
        doc.drawCentredString(width / 2.0, height - header_height / 2 - 12, f'Report generated: {ts}')

        # content frame
        x_margin = inch * 0.6
        y = height - header_height - 18
        line_height = 14

        # Draw user inputs as a two-column table-like block
        doc.setFont('Helvetica-Bold', 12)
        doc.setFillColor(colors.black)
        doc.drawString(x_margin, y, 'User Inputs')
        y -= line_height
        doc.setFont('Helvetica', 10)
        left_keys = ['pregnancies', 'glucose', 'bloodPressure', 'skinThickness']
        right_keys = ['insulin', 'bmi', 'diabetesPedigreeFunction', 'age']
        max_rows = max(len(left_keys), len(right_keys))
        col_gap = 220
        for i in range(max_rows):
            lx = x_margin
            rx = x_margin + col_gap
            if i < len(left_keys):
                k = left_keys[i]
                v = data.get(k, '')
                doc.drawString(lx, y, f'{k}: {v}')
            if i < len(right_keys):
                k = right_keys[i]
                v = data.get(k, '')
                doc.drawString(rx, y, f'{k}: {v}')
            y -= line_height

        y -= line_height / 2

        # Risk box
        box_height = line_height * 3
        box_width = width - x_margin * 2
        doc.setFillColor(colors.HexColor('#fdecea') if prediction == 1 else colors.HexColor('#eef7f9'))
        doc.rect(x_margin, y - box_height + 6, box_width, box_height, stroke=0, fill=1)
        # Risk text
        doc.setFillColor(colors.black)
        doc.setFont('Helvetica-Bold', 12)
        doc.drawString(x_margin + 6, y - 6, 'Risk Summary')
        doc.setFont('Helvetica', 10)
        risk_text = 'HIGH RISK' if prediction == 1 else 'LOW / MODERATE RISK'
        prob_text = f'Probability (neg,pos): {probability}' if isinstance(probability, (list, tuple)) else ''
        doc.drawString(x_margin + 6, y - 6 - line_height, f'Prediction: {risk_text} (class={int(prediction)})')
        doc.drawString(x_margin + 6, y - 6 - line_height * 2, prob_text)
        y -= box_height + line_height

        # Nutrition
        doc.setFont('Helvetica-Bold', 12)
        doc.drawString(x_margin, y, 'Recommended Nutrition')
        y -= line_height
        doc.setFont('Helvetica', 10)
        doc.drawString(x_margin + 6, y, f"Calories: {nutrition.get('calories')}, Protein: {nutrition.get('protein')} g, Carbs: {nutrition.get('carbs')} g")
        y -= line_height * 1.5

        # Food recommendations formatted
        doc.setFont('Helvetica-Bold', 12)
        doc.drawString(x_margin, y, 'Food Recommendations')
        y -= line_height
        doc.setFont('Helvetica', 10)

        def draw_group(col_title, items, y):
            doc.setFont('Helvetica-Bold', 11)
            doc.drawString(x_margin + 6, y, col_title)
            y -= line_height
            doc.setFont('Helvetica', 10)
            for it in items[:6]:
                name = it.get('name', '')
                calories = it.get('calories', '')
                carbs = it.get('carbs', '')
                protein = it.get('protein', '')
                text = f'• {name} — {calories} kcal, {carbs}g carbs, {protein}g protein'
                # wrap using Paragraph for long text
                style = getSampleStyleSheet()['Normal']
                para = Paragraph(text, style)
                w = width - x_margin * 2
                # use a small frame to layout this paragraph
                f = Frame(x_margin + 12, y - line_height, w - 24, line_height * 1.5, showBoundary=0)
                k = KeepInFrame(w - 24, line_height * 1.5, [para])
                f.addFromList([k], doc)
                y -= line_height * 1.2
                if y < inch * 1.5:
                    doc.showPage()
                    y = height - inch
            return y

        for group in ['breakfast', 'lunch', 'dinner', 'snacks']:
            items = food_recommendations.get(group, []) if isinstance(food_recommendations, dict) else []
            y = draw_group(group.capitalize(), items, y)
            y -= line_height * 0.6

        # Footer
        if y < inch:
            doc.showPage()
            y = height - inch
        doc.setFont('Helvetica-Oblique', 9)
        doc.drawString(x_margin, inch * 0.6, 'This report is for informational purposes only and not medical advice.')

        doc.save()
        buffer.seek(0)
        return send_file(buffer, as_attachment=True, download_name='diabetes_report.pdf', mimetype='application/pdf')

    except Exception as e:
        return jsonify({'error': 'Failed to generate report', 'message': str(e)}), 500

@api_bp.route('/', methods=['GET'])
def root():
    return jsonify({
        'message': 'Diabetes Prediction API',
        'status': 'running',
        'endpoints': ['/api/predict', '/api/health']
    })