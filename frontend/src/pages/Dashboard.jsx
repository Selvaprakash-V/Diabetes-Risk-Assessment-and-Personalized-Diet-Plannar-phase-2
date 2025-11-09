import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { motion } from 'framer-motion';

const Dashboard = () => {
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
            Health Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your health metrics and view your assessment history.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 text-center"
        >
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-600">
            The dashboard feature is under development. Check back soon for health tracking capabilities!
          </p>
          <div className="mt-6">
            <button
              onClick={async () => {
                try {
                  // Sample payload: you can replace this with real user data or wire to form
                  const payload = {
                    pregnancies: 2,
                    glucose: 120,
                    bloodPressure: 70,
                    skinThickness: 20,
                    insulin: 79,
                    bmi: 25.0,
                    diabetesPedigreeFunction: 0.5,
                    age: 45
                  };

                  const resp = await fetch('/api/report', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
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
                  alert('Failed to download PDF: ' + err.message);
                }
              }}
              className="mt-4 inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Download Server PDF Report
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;