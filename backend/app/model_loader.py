import pickle
import os
import pandas as pd
import numpy as np

def load_model():
    """Load the trained ML model"""
    model = None
    try:
        model_paths = ['model/model.pkl', '../model.pkl', 'model.pkl']
        for path in model_paths:
            if os.path.exists(path):
                with open(path, 'rb') as f:
                    model = pickle.load(f)
                print(f"Model loaded from: {path}")
                break
        
        if not model:
            print("No model file found. Using fallback prediction logic.")
            
    except Exception as e:
        print(f"Model loading failed: {e}. Using fallback prediction logic.")
        model = None
    
    return model

def predict_diabetes(model, data):
    """Make diabetes prediction"""
    try:
        if model:
            # Convert input data to the format expected by the model
            input_features = [
                data['pregnancies'],
                data['glucose'],
                data['bloodPressure'],
                data['skinThickness'],
                data['insulin'],
                data['bmi'],
                data['diabetesPedigreeFunction'],
                data['age']
            ]
            
            # Create DataFrame with proper column names
            feature_names = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 
                            'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age']
            input_df = pd.DataFrame([input_features], columns=feature_names)
            
            # Make prediction
            prediction = model.predict(input_df)[0]
            probability = model.predict_proba(input_df)[0].tolist()
            
            return prediction, probability
        else:
            # Fallback prediction logic
            risk_score = 0
            if data['glucose'] > 140: risk_score += 0.3
            if data['bmi'] > 30: risk_score += 0.2
            if data['age'] > 60: risk_score += 0.15
            if data['bloodPressure'] > 90: risk_score += 0.1
            if data['diabetesPedigreeFunction'] > 1.0: risk_score += 0.1
            
            prediction = 1 if risk_score > 0.4 else 0
            probability = [1 - risk_score, risk_score] if prediction == 1 else [0.8, 0.2]
            
            return prediction, probability
            
    except Exception as e:
        print(f"Prediction error: {e}")
        # Emergency fallback
        is_high_risk = data['glucose'] > 140 or data['bmi'] > 30
        return (1 if is_high_risk else 0), ([0.3, 0.7] if is_high_risk else [0.8, 0.2])