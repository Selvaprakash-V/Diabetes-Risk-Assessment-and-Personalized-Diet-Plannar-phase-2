import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const ChartVisualization = ({ prediction, inputData }) => {
  const probabilityData = [
    { name: 'Healthy', value: prediction.probability[0] * 100, color: '#10B981' },
    { name: 'Diabetic', value: prediction.probability[1] * 100, color: '#EF4444' }
  ];

  const featureData = [
    { name: 'Glucose', value: inputData.glucose, max: 200, risk: inputData.glucose > 140 },
    { name: 'BMI', value: inputData.bmi, max: 50, risk: inputData.bmi > 30 },
    { name: 'Age', value: inputData.age, max: 100, risk: inputData.age > 60 },
    { name: 'Blood Pressure', value: inputData.bloodPressure, max: 150, risk: inputData.bloodPressure > 90 },
    { name: 'Insulin', value: inputData.insulin, max: 300, risk: inputData.insulin > 200 },
    { name: 'Pregnancies', value: inputData.pregnancies, max: 15, risk: inputData.pregnancies > 5 }
  ];

  const radarData = [
    { subject: 'Glucose', A: (inputData.glucose / 200) * 100, fullMark: 100 },
    { subject: 'BMI', A: (inputData.bmi / 50) * 100, fullMark: 100 },
    { subject: 'Age', A: (inputData.age / 100) * 100, fullMark: 100 },
    { subject: 'BP', A: (inputData.bloodPressure / 150) * 100, fullMark: 100 },
    { subject: 'Insulin', A: (inputData.insulin / 300) * 100, fullMark: 100 },
    { subject: 'Pedigree', A: (inputData.diabetesPedigreeFunction / 2.5) * 100, fullMark: 100 }
  ];

  const COLORS = ['#10B981', '#EF4444'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-8"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-center mb-8 gradient-text"
      >
        📊 Data Visualization
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Probability Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/60 p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4 text-center">Risk Probability</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={probabilityData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                animationBegin={500}
                animationDuration={1000}
              >
                {probabilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Probability']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {probabilityData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Health Metrics Radar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/60 p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4 text-center">Health Profile</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Your Profile"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
                animationBegin={800}
                animationDuration={1200}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Feature Comparison Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/60 p-6 rounded-xl lg:col-span-2"
        >
          <h3 className="text-lg font-semibold mb-4 text-center">Health Metrics Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={featureData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="value" 
                fill="#8884d8"
                animationBegin={1000}
                animationDuration={1500}
              >
                {featureData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.risk ? '#EF4444' : '#10B981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Risk Factors Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-white/60 p-6 rounded-xl"
      >
        <h3 className="text-lg font-semibold mb-4">🎯 Risk Factor Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureData.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className={`p-4 rounded-lg border-l-4 ${
                feature.risk 
                  ? 'bg-red-50 border-red-400' 
                  : 'bg-green-50 border-green-400'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{feature.name}</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  feature.risk 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  {feature.risk ? 'High' : 'Normal'}
                </span>
              </div>
              <div className="mt-2">
                <div className="text-lg font-bold">{feature.value}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(feature.value / feature.max) * 100}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
                    className={`h-2 rounded-full ${
                      feature.risk ? 'bg-red-500' : 'bg-green-500'
                    }`}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChartVisualization;