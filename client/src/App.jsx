import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
//import Assessment from './pages/Assessment';
import Problem from './pages/problem'; 
import Results from './pages/Results'; // Import Results component
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/problem" element={<PrivateRoute><Problem /></PrivateRoute>} />
          <Route path="/Results" element={<PrivateRoute><Results /></PrivateRoute>} /> {/* Add Results route */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
