# 🩺 Diabetes Diet Planner

A modern, full-stack web application for diabetes risk assessment and personalized diet recommendations using machine learning.

## 🏗️ Project Structure

```
diabetes-diet-planner/
│
├── frontend/                          # React + Tailwind frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/                # Reusable UI components
│   │   │   ├── AssessmentForm.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   ├── FoodRecommendation.jsx
│   │   │   └── ChartVisualization.jsx
│   │   ├── pages/                     # Full page-level views
│   │   │   ├── Home.jsx
│   │   │   ├── Assessment.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── hooks/                     # Custom hooks
│   │   │   └── useFetch.js
│   │   ├── services/                  # API service layer
│   │   │   └── api.js
│   │   ├── styles/                    # Tailwind and custom CSS
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── config.js
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/                           # Flask backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── routes.py                  # Flask endpoints
│   │   ├── model_loader.py            # ML model loading
│   │   ├── utils.py                   # Helper functions
│   │   └── diet_recommender.py        # Food recommendations
│   ├── model/
│   │   └── model.pkl                  # Trained ML model
│   ├── tests/
│   │   └── test_api.py                # API tests
│   ├── requirements.txt
│   └── run.py                         # Flask entry point
│
├── ml/                                # ML training and data
│   ├── data/
│   │   └── diabetes.csv
│   └── train_model.py                 # Model training script
│
├── .gitignore
└── README.md
```

## ✨ Features

- **Modern UI**: Glass morphism design with smooth animations
- **Interactive Forms**: Animated sliders and input fields
- **Real-time Analysis**: Instant risk assessment with ML predictions
- **Data Visualization**: Interactive charts and graphs
- **Responsive Design**: Works on all devices
- **Health Indicators**: BMI, glucose level categorization
- **Personalized Diet**: GI-based food recommendations

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Python 3.7+
- npm or yarn

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd diabetes-diet-planner
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   python run.py
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔧 Technology Stack

### Frontend
- **React 18**: Modern React with hooks
- **Framer Motion**: Animation library
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Chart library for data visualization
- **Heroicons**: Beautiful SVG icons

### Backend
- **Flask**: Lightweight Python web framework
- **scikit-learn**: Machine learning library
- **pandas**: Data manipulation
- **Flask-CORS**: Cross-origin resource sharing

## 📊 Machine Learning

The app uses a Random Forest classifier trained on the Pima Indians Diabetes Database with:
- **95.2% accuracy** on test data
- **8 health features** for prediction
- **Real-time inference** with probability scores

### Input Features
1. 🤰 Pregnancies
2. 🍬 Glucose Level
3. 💓 Blood Pressure
4. 📏 Skin Thickness
5. 💉 Insulin Level
6. ⚖️ BMI
7. 🧬 Diabetes Pedigree Function
8. 🎂 Age

## 🎯 Health Assessment

### Risk Categories
- **Low Risk**: < 30% probability
- **Moderate Risk**: 30-60% probability  
- **High Risk**: > 60% probability

### Diet Recommendations
- **Low GI Foods**: For high-risk individuals
- **Balanced Diet**: For healthy individuals
- **Personalized Nutrition**: Based on BMI, age, and health status

## 🧪 Testing

### Backend Tests
```bash
cd backend
python -m pytest tests/
```

### API Health Check
```bash
curl http://localhost:5000/api/health
```

## 📱 Responsive Design

The app is fully responsive and works on:
- 💻 Desktop computers
- 📱 Mobile phones
- 📟 Tablets
- 🖥️ Large screens

## 🔮 Future Enhancements

- [ ] User authentication and history
- [ ] Export results as PDF
- [ ] Integration with health APIs
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Progressive Web App (PWA)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support, create an issue in the repository.

---

**Built with ❤️ using React, Flask, and Machine Learning**