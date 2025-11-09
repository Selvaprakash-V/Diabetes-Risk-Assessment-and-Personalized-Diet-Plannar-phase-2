import React, { useState } from 'react';
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
                  // Trigger test run and download the result file
                  const resp = await fetch('/api/run-tests', { method: 'GET' });
                  if (!resp.ok) throw new Error('Test run failed');
                  const blob = await resp.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'test_results.txt';
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  window.URL.revokeObjectURL(url);
                } catch (err) {
                  alert('Failed to run tests: ' + err.message);
                }
              }}
              className="mt-4 inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Run Backend Tests & Download Results
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;