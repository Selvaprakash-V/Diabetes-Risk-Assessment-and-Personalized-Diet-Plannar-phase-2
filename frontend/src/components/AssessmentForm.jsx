import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AssessmentForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    pregnancies: 3,
    glucose: 120,
    bloodPressure: 70,
    skinThickness: 20,
    insulin: 79,
    bmi: 24.0,
    diabetesPedigreeFunction: 0.47,
    age: 33
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputFields = [
    { name: 'pregnancies', label: '🤰 Pregnancies', type: 'number', min: 0, max: 17, step: 1 },
    { name: 'glucose', label: '🍬 Glucose Level (mg/dL)', type: 'range', min: 0, max: 200, step: 1 },
    { name: 'bloodPressure', label: '💓 Blood Pressure (mmHg)', type: 'range', min: 0, max: 122, step: 1 },
    { name: 'skinThickness', label: '📏 Skin Thickness (mm)', type: 'range', min: 0, max: 100, step: 1 },
    { name: 'insulin', label: '💉 Insulin Level (μU/mL)', type: 'range', min: 0, max: 846, step: 1 },
    { name: 'bmi', label: '⚖️ BMI (kg/m²)', type: 'number', min: 0, max: 67, step: 0.1 },
    { name: 'diabetesPedigreeFunction', label: '🧬 Diabetes Pedigree Function', type: 'number', min: 0, max: 2.4, step: 0.01 },
    { name: 'age', label: '🎂 Age (years)', type: 'number', min: 21, max: 88, step: 1 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-8 mb-8"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-center mb-8 gradient-text"
      >
        Health Metrics Input
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inputFields.map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              
              {field.type === 'range' ? (
                <div className="space-y-2">
                  <input
                    type="range"
                    name={field.name}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{field.min}</span>
                    <span className="font-semibold text-blue-600">{formData[field.name]}</span>
                    <span>{field.max}</span>
                  </div>
                </div>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="input-field"
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center pt-6"
        >
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Analyzing...</span>
              </div>
            ) : (
              '🔍 Analyze Risk Profile'
            )}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default AssessmentForm;