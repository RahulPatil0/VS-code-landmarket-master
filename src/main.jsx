
import React from 'react';
import ReactDOM from 'react-dom/client';  // Import the new 'react-dom/client'
import App from './App';
import './index.css';  // Assuming you have some global styles
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';

const rootElement = document.getElementById('root');  // Get the root element
const root = ReactDOM.createRoot(rootElement);  // Create a root using 'createRoot'

// Render the application
root.render(
  <>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <AuthProvider>
      <GoogleOAuthProvider clientId="644460565611-35m3nstu3qapb88jh7msiklb4vmsl6n8.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider> 
      </AuthProvider>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </>
);
