import pandas as pd
import numpy as np
from pathlib import Path

class FoodRecommender:
    def __init__(self):
        self.food_data = None
        self.load_food_data()
    
    def load_food_data(self):
        """Load the Indian food dataset"""
        try:
            data_path = Path(__file__).parent.parent.parent / 'ml' / 'data' / 'indian_food_weighted_220.csv'
            self.food_data = pd.read_csv(data_path)
        except Exception as e:
            print(f"Error loading food data: {e}")
            self.food_data = pd.DataFrame()
    
    def get_recommendations(self, patient_data, risk_level, diet_preference="Vegetarian", count=10):
        """
        Recommend foods based on patient condition
        
        Args:
            patient_data: dict with patient health metrics
            risk_level: str - "Low", "Moderate", "High" 
            diet_preference: str - "Vegetarian" or "Non-Vegetarian"
            count: int - number of recommendations
        """
        if self.food_data.empty:
            return []
        
        # Filter by diet preference
        filtered_foods = self.food_data[
            self.food_data['diet_type'] == diet_preference
        ].copy()
        
        # Calculate recommendation score based on patient condition
        filtered_foods['score'] = self._calculate_score(filtered_foods, patient_data, risk_level)
        
        # Sort by score and get top recommendations
        recommendations = filtered_foods.nlargest(count, 'score')
        
        return self._format_recommendations(recommendations)
    
    def _calculate_score(self, foods, patient_data, risk_level):
        """Calculate recommendation score for each food"""
        scores = np.zeros(len(foods))
        
        # Base scoring factors
        gi_weight = 0.4
        fiber_weight = 0.2
        protein_weight = 0.2
        risk_weight = 0.2
        
        # GI Index scoring (lower is better for diabetics)
        gi_scores = 100 - foods['gi_index']  # Invert GI (lower GI = higher score)
        scores += gi_weight * (gi_scores / 100)
        
        # Fiber scoring (higher is better)
        fiber_scores = foods['fiber_g'] * 20  # Scale fiber content
        scores += fiber_weight * np.minimum(fiber_scores / 100, 1)
        
        # Protein scoring (moderate protein is good)
        protein_scores = np.minimum(foods['protein_g'] * 10, 100)
        scores += protein_weight * (protein_scores / 100)
        
        # Risk-based scoring
        risk_mapping = {'Low': 1.0, 'Moderate': 0.7, 'High': 0.4}
        food_risk_scores = foods['risk'].map(risk_mapping).fillna(0.5)
        
        if risk_level == "High":
            # High-risk patients need low-risk foods
            scores += risk_weight * food_risk_scores
        elif risk_level == "Moderate":
            # Moderate-risk patients can have moderate-risk foods
            scores += risk_weight * (1 - abs(food_risk_scores - 0.7))
        else:
            # Low-risk patients can have varied foods
            scores += risk_weight * 0.8
        
        # BMI-based adjustments
        if 'bmi' in patient_data:
            bmi = patient_data['bmi']
            if bmi > 30:  # Obese - prefer lower calorie foods
                calorie_penalty = foods['calories'] / 1000
                scores -= 0.1 * calorie_penalty
            elif bmi < 18.5:  # Underweight - prefer higher calorie foods
                calorie_bonus = foods['calories'] / 1000
                scores += 0.1 * calorie_bonus
        
        return np.maximum(scores, 0)  # Ensure non-negative scores
    
    def _format_recommendations(self, recommendations):
        """Format recommendations for API response"""
        formatted = []
        
        for _, food in recommendations.iterrows():
            formatted.append({
                'title': food['title'],
                'icon': food['icon'],
                'calories': int(food['calories']),
                'protein': round(food['protein_g'], 1),
                'fiber': round(food['fiber_g'], 1),
                'gi_index': int(food['gi_index']),
                'weight': f"{int(food['weight_g'])}g",
                'risk_level': food['risk'],
                'region': food['region'],
                'benefit': food['benefit'],
                'score': round(food['score'], 2)
            })
        
        return formatted
    
    def get_daily_meal_plan(self, patient_data, risk_level, diet_preference="Vegetarian"):
        """Generate a complete daily meal plan with specific foods"""
        if self.food_data.empty:
            return {}
        
        # Filter foods by diet preference and risk level
        suitable_foods = self.food_data[
            (self.food_data['diet_type'] == diet_preference) &
            (self.food_data['risk'] == self._get_suitable_food_risk(risk_level))
        ].copy()
        
        if suitable_foods.empty:
            suitable_foods = self.food_data[self.food_data['diet_type'] == diet_preference].copy()
        
        # Calculate scores
        suitable_foods['score'] = self._calculate_score(suitable_foods, patient_data, risk_level)
        suitable_foods = suitable_foods.sort_values('score', ascending=False)
        
        # Select best foods for each meal
        breakfast_foods = self._select_meal_foods(suitable_foods, 'breakfast', 2)
        lunch_foods = self._select_meal_foods(suitable_foods, 'lunch', 2) 
        dinner_foods = self._select_meal_foods(suitable_foods, 'dinner', 2)
        snacks = self._select_meal_foods(suitable_foods, 'snacks', 1)
        
        return {
            'breakfast': breakfast_foods,
            'lunch': lunch_foods,
            'dinner': dinner_foods,
            'snacks': snacks,
            'daily_nutrition': self._calculate_daily_nutrition(breakfast_foods + lunch_foods + dinner_foods + snacks)
        }
    
    def _get_suitable_food_risk(self, patient_risk):
        """Map patient risk to suitable food risk"""
        if patient_risk == "High":
            return "Low"
        elif patient_risk == "Moderate":
            return "Moderate"
        else:
            return "Low"
    
    def _select_meal_foods(self, foods, meal_type, count):
        """Select appropriate foods for specific meal type"""
        # Meal-specific filtering logic
        if meal_type == 'breakfast':
            meal_foods = foods[foods['gi_index'] < 60].head(count * 3)  # Lower GI for breakfast
        elif meal_type == 'lunch':
            meal_foods = foods[(foods['calories'] >= 200) & (foods['calories'] <= 400)].head(count * 3)
        elif meal_type == 'dinner':
            meal_foods = foods[(foods['calories'] >= 150) & (foods['calories'] <= 350)].head(count * 3)
        else:  # snacks
            meal_foods = foods[foods['calories'] < 200].head(count * 3)
        
        # Select top foods and format
        selected = meal_foods.head(count)
        return self._format_recommendations(selected)
    
    def _calculate_daily_nutrition(self, all_foods):
        """Calculate total daily nutrition"""
        total_calories = sum(food['calories'] for food in all_foods)
        total_protein = sum(food['protein'] for food in all_foods)
        total_fiber = sum(food['fiber'] for food in all_foods)
        
        return {
            'calories': total_calories,
            'protein': round(total_protein, 1),
            'fiber': round(total_fiber, 1),
            'avg_gi': round(sum(food['gi_index'] for food in all_foods) / len(all_foods), 1) if all_foods else 0
        }