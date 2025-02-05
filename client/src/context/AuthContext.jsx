import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/auth/me', {
        withCredentials: true
      });
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/auth/login',
        { email, password },
        { withCredentials: true }
      );
      setUser(data.user);
      return data;
    } catch (error) {
      throw error.response?.data?.error || 'Login failed';
    }
  };

  const signup = async (name, email, password) => {
    try {
      await axios.post(
        'http://localhost:5000/auth/signup',
        { name, email, password },
        { withCredentials: true }
      );
    } catch (error) {
      throw error.response?.data?.error || 'Signup failed';
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        'http://localhost:5000/auth/logout',
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);