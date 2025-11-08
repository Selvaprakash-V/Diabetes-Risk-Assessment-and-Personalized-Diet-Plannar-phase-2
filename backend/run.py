from app import create_app

app = create_app()

if __name__ == '__main__':
    print("Starting Diabetes Prediction API...")
    print("Server will start at: http://localhost:5000")
    print("Available endpoints:")
    print("   - GET  /api/health")
    print("   - POST /api/predict")
    print("\nStarting server...\n")
    
    try:
        app.run(debug=True, port=5000, host='0.0.0.0')
    except Exception as e:
        print(f"❌ Server failed to start: {e}")
        input("Press Enter to exit...")