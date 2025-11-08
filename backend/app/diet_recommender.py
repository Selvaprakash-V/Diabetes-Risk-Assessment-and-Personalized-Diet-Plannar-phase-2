"""
Comprehensive food database with nutritional information and GI values
"""

FOOD_DATABASE = {
    'breakfast': {
        'low_gi': [
            {'name': 'Steel-cut oats with berries', 'calories': 250, 'protein': 8, 'carbs': 45, 'gi': 42, 'fiber': 8},
            {'name': 'Greek yogurt with almonds', 'calories': 200, 'protein': 15, 'carbs': 12, 'gi': 35, 'fiber': 2},
            {'name': 'Vegetable omelet (2 eggs)', 'calories': 220, 'protein': 18, 'carbs': 8, 'gi': 15, 'fiber': 3},
            {'name': 'Avocado toast (whole grain)', 'calories': 280, 'protein': 12, 'carbs': 30, 'gi': 45, 'fiber': 12},
        ],
        'moderate_gi': [
            {'name': 'Whole grain toast with jam', 'calories': 300, 'protein': 8, 'carbs': 55, 'gi': 65, 'fiber': 6},
            {'name': 'Banana smoothie', 'calories': 250, 'protein': 6, 'carbs': 50, 'gi': 62, 'fiber': 4},
            {'name': 'Oatmeal with honey', 'calories': 280, 'protein': 10, 'carbs': 48, 'gi': 58, 'fiber': 5},
        ]
    },
    'lunch': {
        'low_gi': [
            {'name': 'Grilled chicken salad', 'calories': 350, 'protein': 35, 'carbs': 15, 'gi': 25, 'fiber': 8},
            {'name': 'Quinoa bowl with vegetables', 'calories': 400, 'protein': 16, 'carbs': 45, 'gi': 35, 'fiber': 10},
            {'name': 'Lentil soup with vegetables', 'calories': 300, 'protein': 18, 'carbs': 35, 'gi': 30, 'fiber': 12},
            {'name': 'Salmon with broccoli', 'calories': 380, 'protein': 32, 'carbs': 12, 'gi': 20, 'fiber': 6},
        ],
        'moderate_gi': [
            {'name': 'Brown rice with chicken', 'calories': 450, 'protein': 28, 'carbs': 55, 'gi': 55, 'fiber': 4},
            {'name': 'Whole wheat pasta primavera', 'calories': 400, 'protein': 14, 'carbs': 65, 'gi': 50, 'fiber': 6},
            {'name': 'Sweet potato with protein', 'calories': 420, 'protein': 25, 'carbs': 50, 'gi': 48, 'fiber': 8},
        ]
    },
    'dinner': {
        'low_gi': [
            {'name': 'Grilled fish with asparagus', 'calories': 320, 'protein': 30, 'carbs': 10, 'gi': 15, 'fiber': 5},
            {'name': 'Turkey meatballs with zucchini', 'calories': 350, 'protein': 28, 'carbs': 18, 'gi': 25, 'fiber': 6},
            {'name': 'Beef stir-fry with vegetables', 'calories': 380, 'protein': 32, 'carbs': 20, 'gi': 30, 'fiber': 8},
            {'name': 'Chicken curry with cauliflower', 'calories': 340, 'protein': 30, 'carbs': 15, 'gi': 20, 'fiber': 7},
        ],
        'moderate_gi': [
            {'name': 'Chicken with brown rice', 'calories': 450, 'protein': 30, 'carbs': 50, 'gi': 55, 'fiber': 4},
            {'name': 'Lean beef with quinoa', 'calories': 420, 'protein': 35, 'carbs': 40, 'gi': 45, 'fiber': 6},
            {'name': 'Fish with sweet potato', 'calories': 400, 'protein': 28, 'carbs': 45, 'gi': 48, 'fiber': 8},
        ]
    },
    'snacks': {
        'low_gi': [
            {'name': 'Almonds (1 oz)', 'calories': 160, 'protein': 6, 'carbs': 6, 'gi': 15, 'fiber': 4},
            {'name': 'Apple with peanut butter', 'calories': 180, 'protein': 8, 'carbs': 20, 'gi': 38, 'fiber': 5},
            {'name': 'Greek yogurt (plain)', 'calories': 100, 'protein': 17, 'carbs': 6, 'gi': 35, 'fiber': 0},
            {'name': 'Hummus with vegetables', 'calories': 120, 'protein': 5, 'carbs': 15, 'gi': 25, 'fiber': 6},
        ],
        'moderate_gi': [
            {'name': 'Whole grain crackers', 'calories': 140, 'protein': 3, 'carbs': 22, 'gi': 55, 'fiber': 3},
            {'name': 'Banana', 'calories': 105, 'protein': 1, 'carbs': 27, 'gi': 62, 'fiber': 3},
            {'name': 'Granola bar', 'calories': 150, 'protein': 4, 'carbs': 25, 'gi': 60, 'fiber': 2},
        ]
    }
}

def get_food_recommendations(is_high_risk, glucose_level, bmi, age, target_calories):
    """
    Get personalized food recommendations based on health parameters
    """
    # Determine GI category
    if is_high_risk or glucose_level > 140:
        gi_category = 'low_gi'
    else:
        gi_category = 'moderate_gi' if glucose_level > 100 else 'low_gi'
    
    recommendations = {}
    
    for meal_type in ['breakfast', 'lunch', 'dinner', 'snacks']:
        # Get foods from appropriate GI category
        foods = FOOD_DATABASE[meal_type][gi_category]
        
        # Sort by protein content for high-risk individuals
        if is_high_risk:
            foods = sorted(foods, key=lambda x: x['protein'], reverse=True)
        
        recommendations[meal_type] = foods[:4]  # Top 4 recommendations
    
    return recommendations

def calculate_meal_plan_nutrition(meal_plan):
    """
    Calculate total nutrition for a meal plan
    """
    total_calories = sum(meal['calories'] for meal in meal_plan)
    total_protein = sum(meal['protein'] for meal in meal_plan)
    total_carbs = sum(meal['carbs'] for meal in meal_plan)
    total_fiber = sum(meal.get('fiber', 0) for meal in meal_plan)
    
    return {
        'calories': total_calories,
        'protein': total_protein,
        'carbs': total_carbs,
        'fiber': total_fiber
    }