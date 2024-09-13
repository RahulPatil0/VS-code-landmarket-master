import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from '../Component/Layout/Header'; 
import Footer from '../Component/Layout/Footer'; 

import './Instructions.css';

const Instructions = () => {
  return (
    <div>
      <Header />
      
      <div className="instructions-container">
        <h1>LandMarket Instructions</h1>

        <section className="instructions-section">
          <h2>Getting Started</h2>

          <div className="instructions-card">
            <div className="instructions-card-content">
              <h3>Introduction to LandMarket <FaArrowRight /></h3>
              <p>
                LandMarket connects buyers and sellers of land and property, offering a streamlined, secure experience for property transactions.
              </p>
            </div>
          </div>

          <div className="instructions-card">
            <div className="instructions-card-content">
              <h3>How It Works <FaArrowRight /></h3>
              <p>
                List properties, browse listings, and negotiate transactions directly with sellers, all facilitated securely by LandMarket.
              </p>
            </div>
          </div>

          <div className="instructions-card">
            <div className="instructions-card-content">
              <h3>Account Setup <FaArrowRight /></h3>
              <ol>
                <li>Click <Link to="/signup">"Sign Up"</Link>.</li>
                <li>Enter your email and create a password.</li>
                <li>Agree to the terms and click "Create Account."</li>
                <li>Verify your account via email.</li>
                <li>Log in and complete your profile.</li>
              </ol>
            </div>
          </div>

          <div className="instructions-card">
            <div className="instructions-card-content">
              <h3>Navigating the Platform <FaArrowRight /></h3>
              <ul>
                <li><strong>Dashboard:</strong> View your listings and activity.</li>
                <li><strong>Search:</strong> Find properties using the search bar.</li>
                <li><strong>Listings:</strong> Browse properties with filters.</li>
                <li><strong>Messages:</strong> Communicate with buyers and sellers.</li>
                <li><strong>Profile:</strong> Manage your account settings.</li>
                
              </ul>
              
            </div>
          </div>
        </section>
        <Footer/>

      </div>
      
    </div>

    
  );
  
};

export default Instructions;
