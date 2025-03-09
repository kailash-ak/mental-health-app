import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Activity, MessageSquare, User, LogOut,} from 'lucide-react';
import { useEffect } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  //const [assessmentHistory, setAssessmentHistory] = useState([]);

  /*useEffect(() => {
    fetch('http://localhost:5000/auth/history', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Authorization': `Bearer ${document.cookie.replace('access_token_cookie=', '')}` }
    })
    .then(res => res.json())
    .then(data => setAssessmentHistory(data.history || []))
    .catch(error => console.error('Error fetching history:', error));
  }, []);*/

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Header */}
      <header className="py-4 px-12 bg-white shadow-md">
        <div className="flex justify-between items-center max-w-8xl mx-auto">
          <div className="flex items-center gap-3 text-blue-600">
            <Activity size={32} />
            <span className="text-3xl font-bold">MindWell</span>
          </div>
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
          >
            <User size={24} />
          </button>
        </div>
      </header>

      {showProfile && (
        <div className="absolute right-12 top-16 w-64 bg-white shadow-xl rounded-lg p-6 z-10 border border-blue-100">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <span className="text-xl font-semibold">
                {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <p className="font-semibold text-lg text-gray-800">{user?.name || 'User'}</p>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>
          {/* *}
          /*<button onClick={() => navigate('/history')} className="w-full py-2 px-3 rounded-lg text-left flex items-center gap-2 hover:bg-gray-100">
            <Clock size={18} />
            <span>View History</span>
          </button>*/}
          <button 
            onClick={logout}
            className="w-full text-red-500 hover:bg-red-50 py-2 px-3 rounded-lg text-left flex items-center gap-2 transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center max-w-7xl mx-auto px-12 pt-12 pb-16">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          Welcome, {user?.name || 'Friend'}
        </h1>
        <p className="text-center text-gray-600 mb-16 text-2xl max-w-3xl">
          Take a moment to assess your mental well-being and receive personalized recommendations.
        </p>

        <div className="grid md:grid-cols-2 gap-16 w-full">
          {/* Assessment Card */}
          <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <Activity className="text-blue-600" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Mental Health Assessment
            </h2>
            <p className="text-gray-600 mb-8 text-xl leading-relaxed">
              Complete a comprehensive assessment to understand your current mental well-being and get personalized recommendations.
            </p>
            <button
              onClick={() => navigate('/problem')}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors text-xl font-semibold"
            >
              Start Diagnosis
            </button>
          </div>

          {/* Chatbot Card */}
          <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
              <MessageSquare className="text-green-600" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              AI Chatbot Support
            </h2>
            <p className="text-gray-600 mb-8 text-xl leading-relaxed">
              Get instant support and answers from our AI-powered mental health chatbot. Available 24/7 to help with your concerns.
            </p>
            <button
              onClick={() => window.open('http://localhost:8501', '_blank')}
              className="w-full bg-green-600 text-white py-4 px-6 rounded-xl hover:bg-green-700 transition-colors text-xl font-semibold flex items-center justify-center gap-3"
            >
              <MessageSquare size={24} />
              <span>Open Chatbot</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-600 py-8 bg-white border-t border-gray-100">
        <p className="text-lg">MindWell © {new Date().getFullYear()}. All rights reserved.</p>
      </footer>
    </div>
  );
}

