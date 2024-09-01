import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, showFooter = true }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;
