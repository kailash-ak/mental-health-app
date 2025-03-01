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
/*
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { Activity, MessageSquare, User, LogOut, Clock, BarChart, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [assessmentHistory, setAssessmentHistory] = useState([]);
  
  // Simulate fetching the user's assessment history
  useEffect(() => {
    // This would typically come from a database or API
    const mockHistory = [
      {
        id: '1',
        date: '2025-02-20',
        disorder: 'Anxiety',
        score: 82,
        symptoms: ['Excessive worry', 'Restlessness', 'Difficulty concentrating'],
        severity: 'moderate'
      },
      {
        id: '2',
        date: '2025-01-15',
        disorder: 'MDD',
        score: 65,
        symptoms: ['Low mood', 'Fatigue', 'Loss of interest'],
        severity: 'mild'
      },
      {
        id: '3',
        date: '2024-12-05',
        disorder: 'ADHD',
        score: 78,
        symptoms: ['Difficulty focusing', 'Impulsivity', 'Time management issues'],
        severity: 'moderate'
      }
    ];
    
    setAssessmentHistory(mockHistory);
  }, []);
  
  // Get severity color
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'mild': return 'bg-yellow-100 text-yellow-700';
      case 'moderate': return 'bg-orange-100 text-orange-700';
      case 'severe': return 'bg-red-100 text-red-700';
      default: return 'bg-green-100 text-green-700';
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate progress
  const calculateProgress = (history) => {
    if (history.length < 2) return null;
    
    const latestScore = history[0].score;
    const previousScore = history[1].score;
    const difference = latestScore - previousScore;
    
    return {
      difference,
      improved: difference < 0
    };
  };

  const progress = calculateProgress(assessmentHistory);
  
  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Header *}
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
        <div className="absolute right-12 top-16 w-96 bg-white shadow-xl rounded-lg z-10 border border-blue-100 overflow-hidden">
          {/* Profile Header *}
          <div className="flex items-center gap-3 p-6 pb-4 border-b border-gray-100">
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
          
          {/* Tab Navigation *}
          <div className="flex border-b border-gray-100">
            <button 
              className={`flex-1 py-3 px-4 font-medium text-sm ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button 
              className={`flex-1 py-3 px-4 font-medium text-sm flex items-center justify-center gap-2 ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('history')}
            >
              <Clock size={16} />
              Assessment History
            </button>
          </div>
          
          {/* Tab Content *}
          <div className="max-h-96 overflow-y-auto">
            {activeTab === 'profile' && (
              <div className="p-6">
                {/* User Stats Summary *}
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-blue-800">Mental Health Status</h4>
                    <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">Last 90 days</span>
                  </div>
                  
                  {assessmentHistory.length > 0 ? (
                    <>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-lg font-semibold">{assessmentHistory[0].disorder}</div>
                        <div className={`text-xs px-2 py-0.5 rounded-full ${getSeverityColor(assessmentHistory[0].severity)}`}>
                          {assessmentHistory[0].severity}
                        </div>
                      </div>
                      
                      {progress && (
                        <div className="flex items-center mt-2 text-sm">
                          {progress.improved ? (
                            <CheckCircle size={16} className="text-green-500 mr-1" />
                          ) : (
                            <AlertTriangle size={16} className="text-yellow-500 mr-1" />
                          )}
                          <span className={progress.improved ? "text-green-600" : "text-yellow-600"}>
                            {Math.abs(progress.difference)}% {progress.improved ? "improvement" : "increase"} since last assessment
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-gray-600">No assessments completed yet</p>
                  )}
                </div>
                
                {/* Actions *}
                <div className="space-y-2">
                  <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2">
                    <BarChart size={18} className="text-blue-500" />
                    <span>View Analytics Dashboard</span>
                  </button>
                  <button 
                    onClick={logout}
                    className="w-full text-left py-2 px-3 text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'history' && (
              <div className="py-4">
                <h3 className="px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Assessment Timeline
                </h3>
                
                {assessmentHistory.length > 0 ? (
                  <div className="space-y-1">
                    {assessmentHistory.map((assessment) => (
                      <div key={assessment.id} className="px-6 py-3 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between mb-1">
                          <div className="font-medium">{assessment.disorder}</div>
                          <div className="text-sm text-gray-500">{formatDate(assessment.date)}</div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <div className="text-sm font-medium">Confidence: {assessment.score}%</div>
                          <div className={`text-xs px-2 py-0.5 rounded-full ${getSeverityColor(assessment.severity)}`}>
                            {assessment.severity}
                          </div>
                        </div>
                        
                        <div className="mt-1">
                          <div className="text-xs text-gray-500 mb-1">Key Symptoms:</div>
                          <div className="flex flex-wrap gap-1">
                            {assessment.symptoms.map((symptom, index) => (
                              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                                {symptom}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-6 py-4 text-center text-gray-500">
                    No assessment history available
                  </div>
                )}
                
                <div className="px-6 pt-4 border-t border-gray-100 mt-2">
                  <button 
                    onClick={() => navigate('/problem')}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Take New Assessment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content *}
      <div className="flex-1 flex flex-col items-center max-w-7xl mx-auto px-12 pt-12 pb-16">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          Welcome, {user?.name || 'Friend'}
        </h1>
        <p className="text-center text-gray-600 mb-16 text-2xl max-w-3xl">
          Take a moment to assess your mental well-being and receive personalized recommendations.
        </p>

        <div className="grid md:grid-cols-2 gap-16 w-full">
          {/* Assessment Card *}
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

          {/* Chatbot Card *}
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

      {/* Footer *}
      <footer className="text-center text-gray-600 py-8 bg-white border-t border-gray-100">
        <p className="text-lg">MindWell © {new Date().getFullYear()}. All rights reserved.</p>
      </footer>
    </div>
  );
}*/
