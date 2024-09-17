import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../Context/Auth';

const Header = () => {
  const [auth] = useAuth();
  const [showSignInDropdown, setShowSignInDropdown] = useState(false);

  const toggleSignInDropdown = () => {
    setShowSignInDropdown(!showSignInDropdown);
  };

  return (
    <header className="header-navbar" style={{ backgroundColor: 'white' }}>
      <div className="header-container">
        {/* Left side links */}
        <div className="header-navbar-left">
          <ul className="header-navbar-nav">
            <li className="header-nav-item">
              <Link className="header-nav-link" aria-current="page" to="/">
                <span className="header-nav-text" style={{ color: 'black' }}>Home</span>
              </Link>
            </li>
            <li className="header-nav-item">
              <Link className="header-nav-link" aria-current="page" to="/about">
                <span className="header-nav-text" style={{ color: 'black' }}>About</span>
              </Link>
            </li>
            <li className="header-nav-item">
              <Link className="header-nav-link" aria-current="page" to="/contact">
                <span className="header-nav-text" style={{ color: 'black' }}>Contact</span>
              </Link>
            </li>
            <li className="header-nav-item">
              <Link className="header-nav-link" aria-current="page" to="/help-center">
                <span className="header-nav-text" style={{ color: 'black' }}>Help Center</span>
              </Link>
            </li>
            <li className="header-nav-item">
              <Link className="header-nav-link" aria-current="page" to="/livenews">
                <span className="header-nav-text" style={{ color: 'black' }}>Live News</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Centered brand with image */}
        <div className="header-navbar-center">
          <Link className="header-navbar-brand" to="/">
            <img src="/land11.png" alt="LandMarket Logo" className="header-landmarket-logo" />
          </Link>
        </div>

        {/* Right side links */}
        <div className="header-navbar-right">
          <ul className="header-navbar-nav">
            <li className="header-nav-item">
              <Link className="header-nav-link" aria-current="page" to="/signup">
                <span className="header-nav-text" style={{ color: 'black' }}>Sign Up</span>
              </Link>
            </li>

            {/* Sign In dropdown */}
            <li
              className="header-nav-item header-dropdown"
              onMouseEnter={toggleSignInDropdown}
              onMouseLeave={toggleSignInDropdown}
            >
              <div className="header-nav-link">
                <span className="header-nav-text" style={{ color: 'black' }}>Sign In</span>
              </div>
              {showSignInDropdown && (
                <ul className="header-dropdown-menu">
                  <li className="header-dropdown-item">
                    <Link className="header-dropdown-link" to="/signin">Sign In</Link>
                  </li>
                  <li className="header-dropdown-item">
                    <Link className="header-dropdown-link" to="/forgot-password">Forgot Password</Link>
                  </li>
                  <li className="header-dropdown-item">
                    <Link className="header-dropdown-link" to="/signout">Sign Out</Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Notification Button */}
            <li className="header-nav-item">
              <Link className="header-nav-link" aria-current="page" to="/notifications">
                <span className="header-nav-text" style={{ color: 'black' }}>
                  <i className="notification-icon">🔔</i> {/* Add your notification icon here */}
                  Notifications
                </span>
              </Link>
            </li>

            <li className="header-nav-item">
              <Link className="header-nav-link" aria-current="page" to="/sell-property">
                <span className="header-nav-text" style={{ color: 'black' }}>Sell Property</span>
              </Link>
            </li>
            <li className="header-nav-item">
              <Link className="header-nav-link" aria-current="page" to="/buy-property">
                <span className="header-nav-text" style={{ color: 'black' }}>Buy Property</span>
              </Link>
            </li>
            <li className="header-nav-item">
              <Link className="header-nav-link" aria-current="page" to="/profile">
                <span className="header-nav-text" style={{ color: 'black' }}>Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
