import requests
import json
import unittest

class TestDiabetesAPI(unittest.TestCase):
    
    def setUp(self):
        self.base_url = "http://localhost:5000"
        self.test_data = {
            "pregnancies": 3,
            "glucose": 120,
            "bloodPressure": 70,
            "skinThickness": 20,
            "insulin": 79,
            "bmi": 24.0,
            "diabetesPedigreeFunction": 0.47,
            "age": 33
        }
    
    def test_health_endpoint(self):
        """Test the health check endpoint"""
        response = requests.get(f"{self.base_url}/api/health")
        self.assertEqual(response.status_code, 200)
        
        data = response.json()
        self.assertIn('status', data)
        self.assertEqual(data['status'], 'healthy')
    
    def test_predict_endpoint(self):
        """Test the prediction endpoint"""
        response = requests.post(
            f"{self.base_url}/api/predict",
            json=self.test_data,
            headers={'Content-Type': 'application/json'}
        )
        
        self.assertEqual(response.status_code, 200)
        
        data = response.json()
        required_fields = ['prediction', 'probability', 'accuracy', 'nutrition']
        for field in required_fields:
            self.assertIn(field, data)
    
    def test_invalid_data(self):
        """Test with invalid input data"""
        invalid_data = {"glucose": "invalid"}
        
        response = requests.post(
            f"{self.base_url}/api/predict",
            json=invalid_data,
            headers={'Content-Type': 'application/json'}
        )
        
        # Should handle gracefully
        self.assertIn(response.status_code, [400, 500])

if __name__ == '__main__':
    print("🧪 Running API tests...")
    unittest.main()