
// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useKeycloak } from '@react-keycloak/web';
// import { FaHome, FaInfoCircle, FaPhone, FaUserPlus, FaSignInAlt, FaSellsy, FaShoppingCart, FaQuestionCircle, FaNewspaper } from 'react-icons/fa';
// import './Header.css';
// import Notification from '../Notification';


// const Header = () => {
//   const { keycloak } = useKeycloak();

//   const socialMediaSignup = (keycloakData) => {
//     console.log(keycloakData.tokenParsed.email);
//   };

//   useEffect(() => {
//     if (keycloak.authenticated) {
//       socialMediaSignup(keycloak);
//     }
//   }, [keycloak.authenticated]);

//   return (
//     <header className="header-navbar" style={{backgroundColor:'white'}}>
//       <div className="header-container" >
//         {/* Left side links */}
//         <div className="header-navbar-left" >
//           <ul className="header-navbar-nav">
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/">
//                 <FaHome className="header-nav-icon" /> <span className="header-nav-text" style={{ color: 'black' }}>Home</span>
//               </Link>
//             </li>
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/about">
//                 <FaInfoCircle className="header-nav-icon" /> <span className="header-nav-text" style={{ color: 'black' }}>About</span>
//               </Link>
//             </li>
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/contact">
//                 <FaPhone className="header-nav-icon" /> <span className="header-nav-text" style={{ color: 'black' }}>Contact</span>
//               </Link>
//             </li>
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/help-center">
//                 <FaQuestionCircle className="header-nav-icon" /> <span className="header-nav-text" style={{ color: 'black' }}>Help Center</span>
//               </Link>
//             </li>
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/livenews">
//                 <FaNewspaper className="header-nav-icon" /> <span className="header-nav-text" style={{ color: 'black' }}>Live News</span>
//               </Link>
//             </li>
//             <FaBell className="header-nav-icon" /> 
// <span className="header-nav-text" style={{ color: 'black' }}>Notifications</span>

//           </ul>
//         </div>

//         {/* Centered brand with image */}
//         <div className="header-navbar-center">
//           <Link className="header-navbar-brand" to="/">
//             <img src="/land11.png" alt="LandMarket Logo" className="header-landmarket-logo" />
//           </Link>
//         </div>

//         {/* Right side links */}
//         <div className="header-navbar-right">
//           <ul className="header-navbar-nav">
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/signup">
//                 <FaUserPlus className="header-nav-icon" /> <span className="header-nav-text" style={{ color: 'black' }}>Sign Up</span>
//               </Link>
//             </li>
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/signin">
//                 <FaSignInAlt className="header-nav-icon" /> <span className="header-nav-text" style={{ color: 'black' }}>Sign In</span>
//               </Link>
//             </li>
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/sell-property">
//                 <FaSellsy className="header-nav-icon" /> <span className="header-nav-text" style={{ color: 'black' }}>Sell Property</span>
//               </Link>
//             </li>
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/buy-property">
//                 <FaShoppingCart className="header-nav-icon" /> <span className="header-nav-text" style={{ color: 'black' }}>Buy Property</span>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { FaHome, FaInfoCircle, FaPhone, FaUserPlus, FaSignInAlt, FaSellsy, FaShoppingCart, FaQuestionCircle, FaNewspaper, FaBell } from 'react-icons/fa';
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
    <header className="header-navbar" style={{backgroundColor:'white'}}>
      <div className="header-container">
        {/* Left side links */}
        <div className="header-navbar-left">
          <ul className="header-navbar-nav">
            <li className="header-nav-item">
              <Link className="header-nav-link" aria-current="page" to="/">
                <FaHome className="header-nav-icon" /> <span className="header-nav-text" style={{ color: 'black' }}>Home</span>
              </Link>
            </li>
            <li className="header-nav-item">
              <Link className="header-nav-link" aria-current="page" to="/about">
                <FaInfoCircle className="header-nav-icon" /> <span className="header-nav-text" style={{ color: 'black' }}>About</span>
              </Link>
            </li>
            <li className="header-nav-item">
              <Link className="header-nav-link" aria-current="page" to="/contact">
                <FaPhone className="header-nav-icon" /> <span className="header-nav-text" style={{ color: 'black' }}>Contact</span>
              </Link>
            </li>
            <li className="header-nav-item">
              <Link className="header-nav-link" aria-current="page" to="/help-center">
                <FaQuestionCircle className="header-nav-icon" /> <span className="header-nav-text" style={{ color: 'black' }}>Help Center</span>
              </Link>
            </li>
            <li className="header-nav-item">
              <Link className="header-nav-link" aria-current="page" to="/livenews">
                <FaNewspaper className="header-nav-icon" /> <span className="header-nav-text" style={{ color: 'black' }}>Live News</span>
              </Link>
            </li>
            {/* <li className="header-nav-item">
              <NotificationComponent /> Add NotificationComponent here
              <span className="header-nav-text" style={{ color: 'black' }}>Notifications</span>
            </li> */}
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
                <FaUserPlus className="header-nav-icon" /> <span className="header-nav-text" style={{ color: 'black' }}>Sign Up</span>
              </Link>
            </li>
            <li className="header-nav-item">
              <Link className="header-nav-link" aria-current="page" to="/signin">
                <FaSignInAlt className="header-nav-icon" /> <span className="header-nav-text" style={{ color: 'black' }}>Sign In</span>
              </Link>
            </li>
            <li className="header-nav-item">
              <Link className="header-nav-link" aria-current="page" to="/sell-property">
                <FaSellsy className="header-nav-icon" /> <span className="header-nav-text" style={{ color: 'black' }}>Sell Property</span>
              </Link>
            </li>
            <li className="header-nav-item">
              <Link className="header-nav-link" aria-current="page" to="/buy-property">
                <FaShoppingCart className="header-nav-icon" /> <span className="header-nav-text" style={{ color: 'black' }}>Buy Property</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

