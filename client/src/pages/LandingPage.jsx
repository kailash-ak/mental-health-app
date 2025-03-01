import React from 'react';
import { Brain, MessageCircle, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="py-6 px-12 flex justify-between items-center bg-blue-50 shadow-sm">
        <div className="text-3xl font-bold text-blue-600">MindCare AI</div>
        <button
          onClick={handleGetStarted}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 text-xl"
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center px-12 py-16">
        <h1 className="text-6xl font-bold text-blue-600 mb-6 text-center">
          Your Mental Health Companion
        </h1>
        <p className="text-gray-600 text-2xl mb-16 max-w-3xl mx-auto text-center">
          An AI-powered chatbot that helps identify potential mental health concerns
          and provides guidance for your wellbeing.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 w-full max-w-6xl">
          {/* Smart Analysis */}
          <div className="p-8 text-center bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-4 text-2xl">Smart Analysis</h3>
            <p className="text-gray-600 text-lg">
              Advanced AI technology to understand your symptoms
            </p>
          </div>

          {/* 24/7 Support */}
          <div className="p-8 text-center bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-4 text-2xl">24/7 Support</h3>
            <p className="text-gray-600 text-lg">
              Available anytime to listen and provide guidance
            </p>
          </div>

          {/* Personalized Care */}
          <div className="p-8 text-center bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-4 text-2xl">Personalized Care</h3>
            <p className="text-gray-600 text-lg">
              Tailored recommendations for your wellbeing
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleGetStarted}
          className="bg-blue-600 text-white px-12 py-5 rounded-lg text-2xl font-semibold hover:bg-blue-700 transition duration-300 shadow-lg"
        >
          Start Your Journey
        </button>
      </main>
    </div>
  );
};

export default LandingPage;
