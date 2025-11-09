# 🩺 Diabetes Diet Planner - Project Structure

## 📁 Organized Project Structure

```
diabetes-diet-planner/
│
├── 📂 backend/                     # Flask Backend API
│   ├── 📂 app/                     # Application modules
│   │   ├── __init__.py             # App initialization
│   │   ├── routes.py               # API endpoints
│   │   ├── model_loader.py         # ML model loading
│   │   ├── food_recommender.py     # Food recommendation system
│   │   ├── diet_recommender.py     # Diet recommendation logic
│   │   └── utils.py                # Utility functions
│   ├── 📂 model/                   # ML model files
│   │   └── model.pkl               # Trained diabetes prediction model
│   ├── 📂 tests/                   # Backend tests
│   │   └── test_api.py             # API test cases
│   ├── requirements.txt            # Python dependencies
│   └── run.py                      # Flask application entry point
│
├── 📂 frontend/                    # React Frontend
│   ├── 📂 public/                  # Static files
│   │   └── index.html              # HTML template
│   ├── 📂 src/                     # Source code
│   │   ├── 📂 components/          # Reusable UI components
│   │   │   ├── AssessmentForm.jsx  # Health metrics input form
│   │   │   ├── ResultCard.jsx      # Risk assessment results
│   │   │   ├── FoodRecommendation.jsx # Daily meal plan display
│   │   │   ├── ChartVisualization.jsx # Data visualization
│   │   │   ├── Navbar.jsx          # Navigation component
│   │   │   ├── LoadingSpectacle.jsx # Loading animations
│   │   │   ├── FloatingElements.jsx # Background animations
│   │   │   ├── ParticleSystem.jsx  # Particle effects
│   │   │   ├── DoctorAnimation.jsx # Animated doctor icon
│   │   │   ├── HandshakeAnimation.jsx # Handshake animation
│   │   │   ├── InteractiveCard.jsx # Interactive card component
│   │   │   ├── MorphingBackground.jsx # Background effects
│   │   │   └── SuccessAnimation.jsx # Success animations
│   │   ├── 📂 pages/               # Full page components
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── Assessment.jsx      # Risk assessment page
│   │   │   ├── Dashboard.jsx       # User dashboard
│   │   │   └── About.jsx           # About page
│   │   ├── 📂 hooks/               # Custom React hooks
│   │   │   └── useFetch.js         # Data fetching hook
│   │   ├── 📂 services/            # API services
│   │   │   └── api.js              # API communication
│   │   ├── 📂 styles/              # Styling files
│   │   │   └── globals.css         # Global CSS with animations
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # React entry point
│   │   ├── index.js                # Application bootstrap
│   │   └── config.js               # Configuration settings
│   ├── package.json                # Node.js dependencies
│   ├── package-lock.json           # Dependency lock file
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   └── postcss.config.js           # PostCSS configuration
│
├── 📂 ml/                          # Machine Learning
│   ├── 📂 data/                    # Dataset files
│   │   ├── diabetes.csv            # Original diabetes dataset
│   │   └── indian_food_weighted_220.csv # Indian food recommendations
│   └── train_model.py              # Model training script
│
├── .gitignore                      # Git ignore rules
├── README.md                       # Project documentation
├── PROJECT_STRUCTURE.md            # This file
└── start.bat                       # Quick start script
```

## 🔧 Key Components

### Backend (Flask)
- **API Endpoints**: `/api/predict`, `/api/health`, `/api/report`
- **ML Integration**: Diabetes risk prediction model
- **Food Recommendations**: Indian food dataset with 200+ items
- **PDF Reports**: Downloadable assessment reports

### Frontend (React)
- **Modern UI**: Glass morphism design with animations
- **Interactive Forms**: Animated health metrics input
- **Real-time Analysis**: Instant risk assessment
- **Daily Meal Plans**: Personalized food recommendations
- **Responsive Design**: Works on all devices

### Machine Learning
- **Prediction Model**: Random Forest classifier (95.2% accuracy)
- **Food Dataset**: Curated Indian foods with nutritional data
- **Risk Assessment**: Low/Moderate/High risk categorization

## 🚀 Quick Start

1. **Backend**: `cd backend && pip install -r requirements.txt && python run.py`
2. **Frontend**: `cd frontend && npm install && npm start`
3. **Access**: Frontend at http://localhost:3000, API at http://localhost:5000

## 📊 Features

- AI-powered diabetes risk assessment
- Personalized Indian food recommendations
- Interactive data visualizations
- PDF report generation
- Responsive design with animations
- Real-time health analysis