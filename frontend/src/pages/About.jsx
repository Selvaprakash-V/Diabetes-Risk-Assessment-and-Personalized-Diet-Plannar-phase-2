import React from 'react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">About Diabetes Diet Planner</h1>
      <p className="text-gray-700 mb-6">This project provides a simple UI to assess diabetes risk and suggests diet recommendations. It's a demo app combining a Flask backend with a React + Tailwind frontend.</p>

      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">How to enter your data</h2>
        <p className="text-gray-600 mb-4">Provide the following health metrics so the model can produce a risk assessment and personalized dietary suggestions. If you don't know a value, leave the field empty or consult your healthcare provider.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Pregnancies</h3>
            <p className="text-sm text-gray-600">Enter how many times you’ve been pregnant.</p>
            <p className="text-sm text-gray-500 italic">Example: If never pregnant, enter 0.</p>
          </div>

          <div>
            <h3 className="font-semibold">Glucose Level (mg/dL)</h3>
            <p className="text-sm text-gray-600">Enter your fasting blood sugar level.</p>
            <p className="text-sm text-gray-500 italic">Normal: 70–99 mg/dL. A fasting value ≥126 mg/dL is commonly used to indicate diabetes.</p>
          </div>

          <div>
            <h3 className="font-semibold">Blood Pressure (mmHg)</h3>
            <p className="text-sm text-gray-600">Enter your diastolic (lower) blood pressure value.</p>
            <p className="text-sm text-gray-500 italic">Typical normal diastolic: 60–80 mmHg.</p>
          </div>

          <div>
            <h3 className="font-semibold">Skin Thickness (mm)</h3>
            <p className="text-sm text-gray-600">Enter triceps skin fold thickness, used to estimate body fat.</p>
            <p className="text-sm text-gray-500 italic">Typical values: 10–50 mm.</p>
          </div>

          <div>
            <h3 className="font-semibold">Insulin Level (µU/mL)</h3>
            <p className="text-sm text-gray-600">Enter your fasting insulin level.</p>
            <p className="text-sm text-gray-500 italic">Normal range: about 16–166 µU/mL (lab ranges vary).</p>
          </div>

          <div>
            <h3 className="font-semibold">BMI (kg/m²)</h3>
            <p className="text-sm text-gray-600">Enter your Body Mass Index.</p>
            <p className="text-sm text-gray-500 italic">Normal: 18.5–24.9 | Overweight: 25–29.9 | Obese: 30+.</p>
          </div>

          <div>
            <h3 className="font-semibold">Diabetes Pedigree Function</h3>
            <p className="text-sm text-gray-600">A numerical value representing family history risk for diabetes.</p>
            <p className="text-sm text-gray-500 italic">If no diabetic relatives → ~0.2–0.4. One diabetic parent/sibling → ~0.5–0.7. Both parents diabetic → above 0.8.</p>
          </div>

          <div>
            <h3 className="font-semibold">Age (years)</h3>
            <p className="text-sm text-gray-600">Enter your current age in years.</p>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-600">This guidance is for convenience only and does not replace professional medical advice. If you're concerned about your health, speak with a qualified healthcare professional.</p>
      </section>
    </div>
  );
}
