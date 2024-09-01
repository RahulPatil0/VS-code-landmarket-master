
import React from 'react';
import ReactDOM from 'react-dom/client';  // Import the new 'react-dom/client'
import App from './App';
import './index.css';  // Assuming you have some global styles
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');  // Get the root element
const root = ReactDOM.createRoot(rootElement);  // Create a root using 'createRoot'

// Render the application
root.render(
  <>
  {/* <React.StrictMode> */}
 <BrowserRouter>
    <App />
    </BrowserRouter>
  {/* </React.StrictMode> */}
  </>
);
