import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import pickle
import os

def train_diabetes_model():
    """Train and save diabetes prediction model"""
    
    # Load data
    data_path = os.path.join('data', 'diabetes.csv')
    if not os.path.exists(data_path):
        print("❌ diabetes.csv not found in data folder")
        return
    
    df = pd.read_csv(data_path)
    print(f"📊 Loaded dataset with {len(df)} samples")
    
    # Prepare features and target
    X = df.drop('Outcome', axis=1)
    y = df['Outcome']
    
    # Split data
    # For very small datasets, stratified split can fail. Adjust test_size and stratify accordingly.
    n_samples = len(y)
    test_size = 0.2
    stratify_param = y
    try:
        # If there aren't enough samples per class, disable stratify
        class_counts = y.value_counts()
        if (class_counts.min() < 2) or (n_samples * test_size < class_counts.nunique()):
            stratify_param = None
        # If dataset is tiny, increase test_size to get a meaningful test set
        if n_samples < 20:
            test_size = 0.4

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=42, stratify=stratify_param
        )
    except Exception:
        # Fallback to a simple non-stratified split
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.3, random_state=42
        )
    
    # Train model
    print("🤖 Training Random Forest model...")
    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42,
        max_depth=10,
        min_samples_split=5,
        min_samples_leaf=2
    )
    
    model.fit(X_train, y_train)
    
    # Evaluate model
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"✅ Model trained successfully!")
    print(f"📈 Accuracy: {accuracy:.3f}")
    print("\n📋 Classification Report:")
    print(classification_report(y_test, y_pred))
    
    # Feature importance
    feature_importance = pd.DataFrame({
        'feature': X.columns,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print("\n🎯 Feature Importance:")
    print(feature_importance)
    
    # Save model
    model_dir = '../backend/model'
    os.makedirs(model_dir, exist_ok=True)
    model_path = os.path.join(model_dir, 'model.pkl')
    
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    
    print(f"💾 Model saved to: {model_path}")
    
    return model, accuracy

if __name__ == "__main__":
    print("🩺 Diabetes Model Training Script")
    print("=" * 40)
    
    model, accuracy = train_diabetes_model()
    
    print(f"\n🎉 Training completed with {accuracy:.1%} accuracy!")