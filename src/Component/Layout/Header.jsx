// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css';
// import { useAuth } from '../../Context/Auth';

// const Header = () => {
//   const [auth] = useAuth();
//   const [showSignInDropdown, setShowSignInDropdown] = useState(false);

//   const toggleSignInDropdown = () => {
//     setShowSignInDropdown(!showSignInDropdown);
//   };

//   return (
//     <header className="header-navbar" style={{ backgroundColor: 'white' }}>
//       <div className="header-container">
//         {/* Left side links */}
//         <div className="header-navbar-left">
//           <ul className="header-navbar-nav">
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/">
//                 <span className="header-nav-text" style={{ color: 'black' }}>Home</span>
//               </Link>
//             </li>
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/about">
//                 <span className="header-nav-text" style={{ color: 'black' }}>About</span>
//               </Link>
//             </li>
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/contact">
//                 <span className="header-nav-text" style={{ color: 'black' }}>Contact</span>
//               </Link>
//             </li>
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/help-center">
//                 <span className="header-nav-text" style={{ color: 'black' }}>Help Center</span>
//               </Link>
//             </li>
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/livenews">
//                 <span className="header-nav-text" style={{ color: 'black' }}>Live News</span>
//               </Link>
//             </li>
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
//                 <span className="header-nav-text" style={{ color: 'black' }}>Sign Up</span>
//               </Link>
//             </li>

//             {/* Sign In dropdown */}
//             <li
//               className="header-nav-item header-dropdown"
//               onMouseEnter={toggleSignInDropdown}
//               onMouseLeave={toggleSignInDropdown}
//             >
//               <div className="header-nav-link">
//                 <span className="header-nav-text" style={{ color: 'black' }}>Sign In</span>
//               </div>
//               {showSignInDropdown && (
//                 <ul className="header-dropdown-menu">
//                   <li className="header-dropdown-item">
//                     <Link className="header-dropdown-link" to="/signin">Sign In</Link>
//                   </li>
//                   <li className="header-dropdown-item">
//                     <Link className="header-dropdown-link" to="/forgot-password">Forgot Password</Link>
//                   </li>
//                   <li className="header-dropdown-item">
//                     <Link className="header-dropdown-link" to="/signout">Sign Out</Link>
//                   </li>
//                 </ul>
//               )}
//             </li>

//             {/* Notification Button */}
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/notifications">
//                 <span className="header-nav-text" style={{ color: 'black' }}>
//                   <i className="notification-icon">🔔</i> 
//                   Notifications
//                 </span>
//               </Link>
//             </li>

//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/sell-property">
//                 <span className="header-nav-text" style={{ color: 'black' }}>Sell Property</span>
//               </Link>
//             </li>
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/buy-property">
//                 <span className="header-nav-text" style={{ color: 'black' }}>Buy Property</span>
//               </Link>
//             </li>
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/profile">
//                 <span className="header-nav-text" style={{ color: 'black' }}>Profile</span>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css';
// import { useAuth } from '../../Context/Auth';

// const Header = () => {
//   const [auth] = useAuth(); // Get the authentication state
//   const [showSignInDropdown, setShowSignInDropdown] = useState(false);

//   const toggleSignInDropdown = () => {
//     setShowSignInDropdown(!showSignInDropdown);
//   };

//   return (
//     <header className="header-navbar" style={{ backgroundColor: 'white' }}>
//       <div className="header-container">
//         {/* Left side links */}
//         <div className="header-navbar-left">
//           <ul className="header-navbar-nav">
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/">
//                 <span className="header-nav-text" style={{ color: 'black' }}>Home</span>
//               </Link>
//             </li>
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/about">
//                 <span className="header-nav-text" style={{ color: 'black' }}>About</span>
//               </Link>
//             </li>
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/contact">
//                 <span className="header-nav-text" style={{ color: 'black' }}>Contact</span>
//               </Link>
//             </li>
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/help-center">
//                 <span className="header-nav-text" style={{ color: 'black' }}>Help Center</span>
//               </Link>
//             </li>
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/livenews">
//                 <span className="header-nav-text" style={{ color: 'black' }}>Live News</span>
//               </Link>
//             </li>
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
//             {!auth?.token && (
//               <>
//                 {/* Sign Up link */}
//                 <li className="header-nav-item">
//                   <Link className="header-nav-link" aria-current="page" to="/signup">
//                     <span className="header-nav-text" style={{ color: 'black' }}>Sign Up</span>
//                   </Link>
//                 </li>

//                 {/* Sign In dropdown */}
//                 <li
//                   className="header-nav-item header-dropdown"
//                   onMouseEnter={toggleSignInDropdown}
//                   onMouseLeave={toggleSignInDropdown}
//                 >
//                   <div className="header-nav-link">
//                     <span className="header-nav-text" style={{ color: 'black' }}>Sign In</span>
//                   </div>
//                   {showSignInDropdown && (
//                     <ul className="header-dropdown-menu">
//                       <li className="header-dropdown-item">
//                         <Link className="header-dropdown-link" to="/signin">Sign In</Link>
//                       </li>
//                       <li className="header-dropdown-item">
//                         <Link className="header-dropdown-link" to="/forgot-password">Forgot Password</Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>
//               </>
//             )}

//             {auth?.token && (
//               <>
//                 {/* Notification Button */}
//                 <li className="header-nav-item">
//                   <Link className="header-nav-link" aria-current="page" to="/notifications">
//                     <span className="header-nav-text" style={{ color: 'black' }}>
//                       <i className="notification-icon">🔔</i> Notifications
//                     </span>
//                   </Link>
//                 </li>

//                 {/* Profile link */}
//                 <li className="header-nav-item">
//                   <Link className="header-nav-link" aria-current="page" to="/profile">
//                     <span className="header-nav-text" style={{ color: 'black' }}>Profile</span>
//                   </Link>
//                 </li>

//                 {/* Sign Out link */}
//                 <li className="header-nav-item">
//                   <Link className="header-nav-link" aria-current="page" to="/signout">
//                     <span className="header-nav-text" style={{ color: 'black' }}>Sign Out</span>
//                   </Link>
//                 </li>
//               </>
//             )}

//             {/* Sell and Buy links */}
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/sell-property">
//                 <span className="header-nav-text" style={{ color: 'black' }}>Sell Property</span>
//               </Link>
//             </li>
//             <li className="header-nav-item">
//               <Link className="header-nav-link" aria-current="page" to="/buy-property">
//                 <span className="header-nav-text" style={{ color: 'black' }}>Buy Property</span>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../Context/Auth';
import { toast } from 'react-toastify'; // Import toast

const Header = () => {
  const [auth, updateAuth] = useAuth(); // Get the authentication state
  console.log(auth);
  const [showSignInDropdown, setShowSignInDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleSignInDropdown = () => {
    setShowSignInDropdown(!showSignInDropdown);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from local storage
    updateAuth({
      username: null,
      token: null,
      userId: null,
      role: null,
    });
    toast.success("Successfully logged out!"); // Show toast message
    navigate('/'); // Redirect to home after logout
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

            {/* Sell and Buy links - moved before Sign Up and Sign In */}
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

            {!auth?.token && (
              <>
                {/* Sign Up link */}
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
                    </ul>
                  )}
                </li>
              </>
            )}

            {auth?.token && (
              <>
           
                {/* Profile link */}
                <li className="header-nav-item">
                  <Link className="header-nav-link" aria-current="page" to="/profile">
                    <span className="header-nav-text" style={{ color: 'black' }}>Profile</span>
                  </Link>
                </li>

                {/* Sign Out button */}
                <li className="header-nav-item">
                  <Link className="header-nav-link" onClick={handleLogout}>
                    <span className="header-nav-text" style={{ color: 'black' }}>Sign Out</span>
                  </Link>
                </li>

              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
