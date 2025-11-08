def calculate_nutrition_needs(bmi, age, glucose, is_high_risk):
    """Calculate personalized nutrition requirements"""
    # Base calorie calculation
    calories = 2000
    if bmi > 30: calories = 1600
    elif bmi > 25: calories = 1800
    elif bmi < 18.5: calories = 2200
    
    # Age adjustment
    if age > 60: calories -= 200
    elif age < 30: calories += 100
    
    # Protein calculation (15-25% of calories)
    protein = int((calories * 0.20) / 4)  # 20% of calories from protein
    
    # Carb calculation based on diabetes risk
    if is_high_risk or glucose > 140:
        carbs = int((calories * 0.30) / 4)  # 30% for diabetics
    else:
        carbs = int((calories * 0.50) / 4)  # 50% for healthy individuals
    
    return {'calories': calories, 'protein': protein, 'carbs': carbs}

def validate_input_data(data):
    """Validate input data for prediction"""
    required_fields = [
        'pregnancies', 'glucose', 'bloodPressure', 'skinThickness',
        'insulin', 'bmi', 'diabetesPedigreeFunction', 'age'
    ]
    
    # Check if all required fields are present
    for field in required_fields:
        if field not in data:
            return False
    
    # Basic range validation
    if not (0 <= data['pregnancies'] <= 20): return False
    if not (0 <= data['glucose'] <= 300): return False
    if not (0 <= data['bloodPressure'] <= 200): return False
    if not (0 <= data['skinThickness'] <= 100): return False
    if not (0 <= data['insulin'] <= 1000): return False
    if not (0 <= data['bmi'] <= 100): return False
    if not (0 <= data['diabetesPedigreeFunction'] <= 5): return False
    if not (0 <= data['age'] <= 120): return False
    
    return True

def calculate_bmi_category(bmi):
    """Calculate BMI category"""
    if bmi < 18.5: return 'Underweight'
    elif bmi < 25: return 'Normal'
    elif bmi < 30: return 'Overweight'
    else: return 'Obese'

def calculate_glucose_category(glucose):
    """Calculate glucose category"""
    if glucose < 70: return 'Low'
    elif glucose <= 140: return 'Normal'
    elif glucose <= 199: return 'Pre-diabetic'
    else: return 'Diabetic'