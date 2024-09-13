import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './Component/Home';
import About from './Component/About';
import Contact from './Component/Contact';
import Signup from './Component/Registration/Signup';
import Signin from './Component/Registration/Signin';
import SellProperty from './Component/SellProperty';
import BuyProperty from './Component/BuyProperty';
import PostHomeForSale from './Component/PostHomeForSale';
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
import Dashboard from './Component/Registration/Dashboard.jsx';
import PropertyDetails from './Component/Property/PropertyDetails.jsx';

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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<Signup onRegister={handleLogin} />} />
      <Route path="/signin" element={<Signin onLogin={handleLogin} />} />
      <Route path="/livenews" element={<LiveNews />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route
        path="/sell-property"
        element={isAuthenticated ? <SellProperty /> : <Navigate to="/signin" />}
      />
      <Route path="/buy-property" element={<BuyProperty />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/post-home-for-sale" element={<PostHomeForSale />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/how-to-sell" element={<HowToSell />} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/legalAgreements" element={<LegalAgreements />} />
      <Route path="/properties-page" element={<PropertiesPage />} />
      <Route path="/filtered-properties" element={<FilteredPropertiesPage />} />
      <Route path="/how-to-buy" element={<HowToBuy />} />
      <Route path="/chatbox" element={<Chatbox />} />
      <Route path="/order" element={<Order />} />
    </Routes>
  );
};

export default App;
