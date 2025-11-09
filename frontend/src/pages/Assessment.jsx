import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AssessmentForm from '../components/AssessmentForm';
import ResultCard from '../components/ResultCard';
import ChartVisualization from '../components/ChartVisualization';
import FoodRecommendation from '../components/FoodRecommendation';
import { api } from '../services/api';

const Assessment = () => {
  const [prediction, setPrediction] = useState(null);
  const [inputData, setInputData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePrediction = async (data) => {
    setLoading(true);
    setInputData(data);
    
    try {
      const result = await api.predictDiabetes(data);
      setPrediction(result);
    } catch (error) {
      console.error('Prediction failed:', error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Diabetes Risk Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your health information below to get an AI-powered diabetes risk assessment
            with personalized recommendations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AssessmentForm onSubmit={handlePrediction} loading={loading} />
        </motion.div>

        {prediction && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ResultCard prediction={prediction} inputData={inputData} />
          </motion.div>
        )}

        {prediction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-center mt-4"
          >
            <button
              onClick={async () => {
                try {
                  if (!inputData) return alert('No input data available');
                  const resp = await fetch('/api/report', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(inputData)
                  });
                  if (!resp.ok) throw new Error('Report generation failed');
                  const blob = await resp.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'diabetes_report.pdf';
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  window.URL.revokeObjectURL(url);
                } catch (err) {
                  console.error(err);
                  alert('Failed to download PDF: ' + err.message);
                }
              }}
              className="mt-6 inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              📄 Download PDF Report
            </button>
          </motion.div>
        )}

        {prediction && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ChartVisualization prediction={prediction} inputData={inputData} />
          </motion.div>
        )}

        {prediction && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <FoodRecommendation prediction={prediction} inputData={inputData} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Assessment;