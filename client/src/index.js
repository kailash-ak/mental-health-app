/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import the CSS file for styling

import App from './App.jsx'; // This is your main component, ensure App.js exists

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Ensures the app is rendered to the 'root' element in your HTML
);*/

import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client'
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
//import reportWebVitals from './reportWebVitals';

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));  // Create a root
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

//reportWebVitals();

