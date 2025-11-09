import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full bg-white/60 backdrop-blur-md py-4 px-6 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">Diabetes Planner</Link>

        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          <Link to="/assessment" className="text-gray-700 hover:text-gray-900">Assessment</Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-gray-900">Dashboard</Link>
          <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
        </div>
      </div>
    </nav>
  );
}
