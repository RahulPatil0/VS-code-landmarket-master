// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';

// import Home from './Component/Home';
// import About from './Component/About';
// import Contact from './Component/Contact';
// import Signup from './Component/Registration/Signup';
// import Signin from './Component/Registration/Signin';
// import SellProperty from './Component/SellProperty';
// import BuyProperty from './Component/BuyProperty';
// import HelpCenter from './Component/HelpCenter';
// import HowToSell from './Redirect/HowToSell';
// import HowToBuy from './Redirect/HowToBuy';
// import Chatbox from './Redirect/Chatbox';
// import LiveNews from './Component/LiveNews';
// import Instructions from './Redirect/Instructions.jsx';
// import Legal from './Redirect/Legal.jsx';
// import LegalAgreements from './Redirect/LegalAgreements';
// import PropertiesPage from './Redirect/PropertiesPage.jsx';
// import FilteredPropertiesPage from './Redirect/FilteredPropertiesPage';
// import Order from './Component/Order.jsx';
// import PropertyDetails from './Component/Property/PropertyDetails.jsx';
// import AdminDashboard from './Component/Admin/AdminDashboard.jsx';
// import Feedback from './Component/Admin/Feedback.jsx';
// import Users from './Component/Admin/Users.jsx';
// import Report from './Component/Admin/Report.jsx';
// import Properties from './Component/Admin/Properties.jsx';
// import AdminPrivateRoute from './Context/AdminRoute.jsx';
// import Profile from './Component/Registration/Profile.jsx';
// import Notifications from './Component/Layout/Notifications';


// const App = () => {
//   useEffect(() => {
//     if (window.opener) {
//       window.focus();
//       window.opener.location.href = "/";
//       window.close();
//     }
//   }, []);

//   const [isAuthenticated, setIsAuthenticated] = useState(true);

//   const handleLogin = (authStatus) => {
//     setIsAuthenticated(authStatus);
//   };

//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/contact" element={<Contact />} />
//       <Route path="/signup" element={<Signup onRegister={handleLogin} />} />
//       <Route path="/signin" element={<Signin onLogin={handleLogin} />} />
//       <Route path="/livenews" element={<LiveNews />} />
//       <Route path='/profile' element={<Profile />} />
//       <Route path="/notifications" element={<Notifications />} />


//       <Route
//         path="/sell-property"
//         element={isAuthenticated ? <SellProperty /> : <Navigate to="/signin" />}
//       />
//       <Route path="/buy-property" element={<BuyProperty />} />
//       <Route path="/property/:id" element={<PropertyDetails />} />
//       <Route path="/help-center" element={<HelpCenter />} />
//       <Route path="*" element={<Navigate to="/" />} />
//       <Route path="/how-to-sell" element={<HowToSell />} />
//       <Route path="/instructions" element={<Instructions />} />
//       <Route path="/legal" element={<Legal />} />
//       <Route path="/properties" element={<Properties />} />
//       <Route path="/legalAgreements" element={<LegalAgreements />} />
//       <Route path="/properties-page" element={<PropertiesPage />} />
//       <Route path="/filtered-properties" element={<FilteredPropertiesPage />} />
//       <Route path="/how-to-buy" element={<HowToBuy />} />
//       <Route path="/chatbox" element={<Chatbox />} />
//       <Route path="/order" element={<Order />} />
//       <Route path='/admin' element={<AdminPrivateRoute/>}>
//         <Route index element={<Report />}/>
//         <Route path='feedback' element={<Feedback/>}/>
//         <Route path='users' element={<Users/>}/>
//       </Route>

//     </Routes>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Component/Home';
import About from './Component/About';
import Contact from './Component/Contact';
import Signup from './Component/Registration/Signup';
import Signin from './Component/Registration/Signin';
import SellProperty from './Component/SellProperty';
import BuyProperty from './Component/BuyProperty';
import HelpCenter from './Component/HelpCenter';
import HowToSell from './Redirect/HowToSell';
import HowToBuy from './Redirect/HowToBuy';
import Chatbox from './Redirect/Chatbox';
import LiveNews from './Component/LiveNews';
import Instructions from './Redirect/Instructions.jsx';
import Legal from './Redirect/Legal.jsx';
import LegalAgreements from './Redirect/LegalAgreements';
import PropertiesPage from './Redirect/PropertiesPage.jsx';
import FilteredPropertiesPage from './Redirect/FilteredPropertiesPage';
import Order from './Component/Order.jsx';
import PropertyDetails from './Component/Property/PropertyDetails.jsx';
import AdminDashboard from './Component/Admin/AdminDashboard.jsx';
import Feedback from './Component/Admin/Feedback.jsx';
import Users from './Component/Admin/Users.jsx';
import Report from './Component/Admin/Report.jsx';
import Properties from './Component/Admin/Properties.jsx';
import ImageModal from './Component/Admin/ImageModal.jsx';
import History from './Component/Registration/History.jsx';


import AdminPrivateRoute from './Context/AdminRoute.jsx';
import Profile from './Component/Registration/Profile.jsx';
import SailedProperties from './Component/Admin/SailedProperties.jsx';

const App = () => {
  useEffect(() => {
    if (window.opener) {
      window.focus();
      window.opener.location.href = "/";
      window.close();
    }
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogin = (authStatus) => {
    setIsAuthenticated(authStatus);
  };

  return (
    <>
      <ToastContainer /> {/* Toast notifications */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup onRegister={handleLogin} />} />
        <Route path="/signin" element={<Signin onLogin={handleLogin} />} />
        <Route path="/livenews" element={<LiveNews />} />
        <Route path='/profile' element={<Profile />} />

        <Route
          path="/sell-property"
          element={isAuthenticated ? <SellProperty /> : <Navigate to="/signin" />}
        />
        <Route path="/buy-property" element={<BuyProperty />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/how-to-sell" element={<HowToSell />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/legalAgreements" element={<LegalAgreements />} />
        <Route path="/properties-page" element={<PropertiesPage />} />
        <Route path="/filtered-properties" element={<FilteredPropertiesPage />} />
        <Route path="/how-to-buy" element={<HowToBuy />} />
        <Route path="/chatbox" element={<Chatbox />} />
        <Route path="/order" element={<Order />} />
        <Route path="/history" element={<History />} />
        <Route path='/admin' element={<AdminPrivateRoute />}>
          <Route index element={<Report />} />
          <Route path='feedback' element={<Feedback />} />
          <Route path='users' element={<Users />} />
          <Route path='imagemodel' element={<ImageModal />} />
          <Route path="properties" element={<Properties />} />
          <Route path="sailedproperties" element={<SailedProperties />} />


        </Route>
      </Routes>
    </>
  );
};

export default App;
