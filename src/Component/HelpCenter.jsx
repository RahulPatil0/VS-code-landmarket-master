// // import React from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import Header from './Layout/Header';
// // import Footer from './Layout/Footer';
// // import './HelpCenter.css';

// // const HelpCenter = () => {
// //   const navigate = useNavigate();

// //   const handleSeeAllArticlesClick = () => {
// //     navigate('/livenews');
// //   };

// //   return (
// //     <div className="help-center">
// //       <Header />
// //       <div className="help-content">
// //         <header className="help-header">
// //           <h1>LandMarket Help Center</h1>
// //         </header>

// //         <div className="help-section">
// //           <h3>Getting Started</h3>
// //           <ul>
// //             <li>
// //               <Link to="/instructions">
// //                 Introduction to LandMarket, Account Setup, Navigating the Platform
// //               </Link>
// //             </li>
// //             <li>
// //               <Link to="/Legal">Legal & Compliance</Link>
// //             </li>
// //           </ul>
// //           <button className="help-button" onClick={handleSeeAllArticlesClick}>
// //             See all articles
// //           </button>
// //         </div>

// //         <div className="help-section">
// //           <h3>📱 Using LandMarket</h3>
// //           <ul>
// //             <li><a href="#">How to search for property in LandMarket</a></li>
// //             <li><a href="#">Signing up with LandMarket</a></li>
// //             <li><Link to="/how-to-sell">How to sell a property in LandMarket</Link></li>
// //             <li><Link to="/how-to-buy">How to Buy property</Link></li>
// //           </ul>
// //           <button className="help-button" onClick={handleSeeAllArticlesClick}>
// //             See all articles
// //           </button>
// //         </div>
// //       </div>
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default HelpCenter;
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Header from './Layout/Header';
// import Footer from './Layout/Footer';
// import './HelpCenter.css';

// const HelpCenter = () => {
//   const navigate = useNavigate();

//   const handleSeeAllArticlesClick = () => {
//     navigate('/livenews');
//   };

//   return (
//     <div className="help-center">
//       <Header />
//       <div className="help-content">
//         <header className="help-header">
//           <h1>LandMarket Help Center</h1>
//         </header>

//         <div className="help-section-container">
//           <div className="help-card">
//             <h3>Getting Started</h3>
//             <ul>
//               <li>
//                 <Link to="/instructions">
//                   Introduction to LandMarket, Account Setup, Navigating the Platform
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/Legal">Legal & Compliance</Link>
//               </li>
//             </ul>
//             <button className="help-button" onClick={handleSeeAllArticlesClick}>
//               See all articles
//             </button>
//           </div>

//           <div className="help-card">
//             <h3>📱 Using LandMarket</h3>
//             <ul>
//               <li><a href="#">How to search for property in LandMarket</a></li>
//               <li><a href="#">Signing up with LandMarket</a></li>
//               <li><Link to="/how-to-sell">How to sell a property in LandMarket</Link></li>
//               <li><Link to="/how-to-buy">How to Buy property</Link></li>
//             </ul>
//             <button className="help-button" onClick={handleSeeAllArticlesClick}>
//               See all articles
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default HelpCenter;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import './HelpCenter.css';

const HelpCenter = () => {
  const navigate = useNavigate();

  const handleSeeAllArticlesClick = () => {
    navigate('/livenews');
  };

  return (
    <div className="help-center">
      <Header />
      <div className="help-content">
        <header className="help-header">
          <h1>LandMarket Help Center</h1>
        </header>

        <div className="help-section-container">
          <div className="help-card">
            <h3>Getting Started</h3>
            <ul>
              <li>
                <Link to="/instructions">
                  Introduction to LandMarket, Account Setup, Navigating the Platform
                </Link>
              </li>
              <li>
                <Link to="/Legal">Legal & Compliance</Link>
              </li>
            </ul>
            <button className="help-button" onClick={handleSeeAllArticlesClick}>
              See all articles
            </button>
          </div>

          <div className="help-card">
            <h3>📱 Using LandMarket</h3>
            <ul>
              <li><a href="#">How to search for property in LandMarket</a></li>
              <li><a href="#">Signing up with LandMarket</a></li>
              <li><Link to="/how-to-sell">How to sell a property in LandMarket</Link></li>
              <li><Link to="/how-to-buy">How to Buy property</Link></li>
            </ul>
            <button className="help-button" onClick={handleSeeAllArticlesClick}>
              See all articles
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HelpCenter;
