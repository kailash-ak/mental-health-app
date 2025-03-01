import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|ac|org|net|edu)$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format. Use .com, .in, .ac, .org, .net, or .edu domains.');
      return;
    }

    const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'rediffmail.com'];
    const emailParts = email.split('@');
    if (emailParts.length === 2) {
      const enteredDomain = emailParts[1];
      const closestDomain = commonDomains.find((d) => d.includes(enteredDomain));
      if (closestDomain && enteredDomain !== closestDomain) {
        const confirmFix = window.confirm(`Did you mean \"${emailParts[0]}@${closestDomain}\"?`);
        if (confirmFix) {
          setEmail(`${emailParts[0]}@${closestDomain}`);
          return;
        }
      }
    }
    try {
      await login(email, password);
      navigate('/home');
    } catch (err) {
      setError(err.toString());
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600 mb-8">Enter your credentials to continue</p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Sign In
            </button>
            <p className="text-center mt-2">
              <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</a>
            </p>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>

      {/* Right side - MindCare AI Assistant */}
      <div className="w-1/2 bg-blue-50 flex flex-col items-center justify-center p-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">MindCare AI Assistant</h2>
        <p className="text-gray-600 text-center max-w-md">
          Your personal mental health companion powered by advanced AI technology. Get support, guidance, and understanding whenever you need it.
        </p>
      </div>
    </div>
  );
};

export default Login;
