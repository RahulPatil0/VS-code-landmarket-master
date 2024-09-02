import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import './Header.css';

const Header = () => {
  const { keycloak } = useKeycloak();

  const socialMediaSignup = (keycloakData) => {
    console.log(keycloakData.tokenParsed.email);
  };

  useEffect(() => {
    if (keycloak.authenticated) {
      socialMediaSignup(keycloak);
    }
  }, [keycloak.authenticated]);

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
            <li className="header-nav-item">
              <Link className="header-nav-link" aria-current="page" to="/signin">
                <span className="header-nav-text" style={{ color: 'black' }}>Sign In</span>
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
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
