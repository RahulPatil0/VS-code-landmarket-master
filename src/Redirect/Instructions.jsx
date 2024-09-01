import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from '../Component/Layout/Header';// Adjust the import path as needed
import './Instructions.css';

const Instructions = () => {
  return (
    <div>
      <Header /> {/* Add the Header component here */}
      <div className="instructions-container">
        <h1>LandMarket Instructions</h1>

        <section className="instructions-section">
          <h2>1. Getting Started</h2>

          <div className="instructions-card">
            <div className="instructions-card-content">
              <h3>Introduction to LandMarket <FaArrowRight /></h3>
              <p>
                LandMarket is an online platform that connects buyers and sellers of land and property. It offers a streamlined experience to make property transactions easy, transparent, and secure.
              </p>
            </div>
          </div>

          <div className="instructions-card">
            <div className="instructions-card-content">
              <h3>How LandMarket Works <FaArrowRight /></h3>
              <p>
                Users can list properties for sale or browse available listings. Once a property is found, buyers can contact sellers directly to negotiate and complete transactions, all facilitated securely by LandMarket.
              </p>
            </div>
          </div>

          <div className="instructions-card">
            <div className="instructions-card-content">
              <h3>Account Setup <FaArrowRight /></h3>
              <ol>
                <li>
                  Click the <Link to="/signup">"Sign Up"</Link> button on the homepage.
                </li>
                <li>Enter your email, create a password, and fill in your details.</li>
                <li>Agree to the terms and click "Create Account."</li>
                <li>Verify your account via the email link.</li>
                <li>Log in and complete your profile.</li>
              </ol>
            </div>
          </div>

          <div className="instructions-card">
            <div className="instructions-card-content">
              <h3>Navigating the Platform <FaArrowRight /></h3>
              <ul>
                <li><strong>Dashboard:</strong> Overview of your listings and activity.</li>
                <li><strong>Search:</strong> Find properties using the search bar.</li>
                <li><strong>Listings:</strong> Browse properties with filters.</li>
                <li><strong>Messages:</strong> Communicate with buyers/sellers.</li>
                <li><strong>Profile:</strong> Manage your account settings.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Instructions;
