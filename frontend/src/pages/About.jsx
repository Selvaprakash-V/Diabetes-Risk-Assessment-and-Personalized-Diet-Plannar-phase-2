import React from 'react';
import { motion } from 'framer-motion';
import DoctorAnimation from '../components/DoctorAnimation';
import HandshakeAnimation from '../components/HandshakeAnimation';

const fieldList = [
  {
    title: 'Pregnancies',
    desc: "Enter how many times you’ve been pregnant.",
    hint: 'Example: If never pregnant, enter 0.'
  },
  {
    title: 'Glucose Level (mg/dL)',
    desc: 'Enter your fasting blood sugar level.',
    hint: 'Normal: 70–99 mg/dL. A fasting value ≥126 mg/dL may indicate diabetes.'
  },
  {
    title: 'Blood Pressure (mmHg)',
    desc: 'Enter your diastolic (lower) blood pressure value.',
    hint: 'Typical normal diastolic: 60–80 mmHg.'
  },
  {
    title: 'Skin Thickness (mm)',
    desc: 'Enter triceps skin fold thickness, used to estimate body fat.',
    hint: 'Typical values: 10–50 mm.'
  },
  {
    title: 'Insulin Level (µU/mL)',
    desc: 'Enter your fasting insulin level.',
    hint: 'Normal range: about 16–166 µU/mL (lab ranges vary).'
  },
  {
    title: 'BMI (kg/m²)',
    desc: 'Enter your Body Mass Index.',
    hint: 'Normal: 18.5–24.9 | Overweight: 25–29.9 | Obese: 30+.'
  },
  {
    title: 'Diabetes Pedigree Function',
    desc: 'A numerical value representing family history risk for diabetes.',
    hint: 'No diabetic relatives → ~0.2–0.4. One diabetic relative → ~0.5–0.7. Both parents diabetic → above 0.8.'
  },
  {
    title: 'Age (years)',
    desc: 'Enter your current age in years.',
    hint: ''
  }
];

export default function About() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-white to-slate-50 rounded-xl p-6 shadow-md"
      >
        <div className="w-36 h-36">
          <DoctorAnimation width={144} height={144} />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">Diabetes Diet Planner</h1>
          <p className="text-gray-700 mb-3">A lightweight demo that assesses diabetes risk and provides personalized dietary suggestions. Enter accurate measurements for better recommendations.</p>
          <div className="flex items-center gap-3">
            <HandshakeAnimation />
            <span className="text-sm text-gray-500">Friendly clinical-style guidance — for information only.</span>
          </div>
        </div>
      </motion.div>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.5 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {fieldList.map((f, idx) => (
          <motion.article
            key={f.title}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-indigo-200"
          >
            <h3 className="text-lg font-semibold mb-1">{f.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{f.desc}</p>
            {f.hint && <p className="text-sm text-gray-500 italic">{f.hint}</p>}
          </motion.article>
        ))}
      </motion.section>

      <p className="mt-6 text-sm text-gray-600">This guidance is educational only and does not replace professional medical advice. Consult a healthcare provider for diagnosis or treatment.</p>
    </div>
  );
}
