import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col">
      {/* Header */}
      <header className="py-4 bg-white shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-blue-600">MindWell</h1>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center relative p-4">
        {/* Profile Section */}
        <div className="absolute top-5 right-5">
          <div className="relative">
            <button 
              onClick={() => setShowProfile(!showProfile)} 
              className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center focus:outline-none shadow-md"
            >
              <span className="text-xl">
                {user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : user?.email?.charAt(0).toUpperCase() || 'U'}
              </span>
            </button>
            
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
                <p className="text-gray-700 mb-2 text-sm">{user?.email}</p>
                <button 
                  onClick={logout} 
                  className="w-full text-red-500 hover:underline text-sm text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Main White Box */}
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 text-center">
          {/* Greeting */}
          <h1 className="text-2xl font-semibold text-blue-600">
            Hi, {user?.name || user?.email?.split('@')[0]} welcome
          </h1>
          
          {/* Instruction */}
          <p className="text-gray-700 mt-4">
            Click below to start your assessment.
          </p>
          
          {/* Start Assessment Button */}
          <button
            onClick={() => navigate('/problem')}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg mt-6"
          >
            Start Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
