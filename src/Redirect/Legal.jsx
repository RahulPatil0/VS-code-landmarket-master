import React from 'react';
import './Legal.css'; 
import Header from '../Component/Layout/Header';

const Legal = () => {
  return (
    <div>
      <Header /> {/* Use the Header component here */}
      <div className="legal-container">
        <header className="legal-header">
          <h1>LandMarket Legal & Compliance</h1>
        </header>

        <section className="legal-section">
          <h2>User Agreements</h2>
          
          <div className="legal-card">
            <h3>Terms of Service</h3>
            <p>
              By using LandMarket, you agree to our Terms of Service, which outline the rules and guidelines for using our platform. These terms ensure that all users engage with the platform in a fair and legal manner.
            </p>
            <a href="/legalAgreements" className="legal-link">Read Full Terms of Service</a>
          </div>

          <div className="legal-card">
            <h3>Privacy Policy</h3>
            <p>
              Our Privacy Policy explains how we collect, use, and protect your personal information. We are committed to safeguarding your privacy and ensuring that your data is handled responsibly.
            </p>
            <a href="/legalAgreements" className="legal-link">Read Full Privacy Policy</a>
          </div>

          <div className="legal-card">
            <h3>Other Legal Agreements</h3>
            <p>
              We have various legal agreements in place to ensure the proper functioning of LandMarket. These agreements cover aspects such as user conduct and dispute resolution.
            </p>
            <a href="/legalAgreements" className="legal-link">Read Other Legal Agreements</a>
          </div>
        </section>

        <section className="legal-section">
          <h2>Property Ownership</h2>
          
          <div className="legal-card">
            <h3>Property Rights</h3>
            <p>
              LandMarket provides information about property rights, including how to establish and prove ownership of land. It's essential to understand these rights to avoid legal issues when buying or selling property.
            </p>
          </div>

          <div className="legal-card">
            <h3>Title Transfers</h3>
            <p>
              Title transfers are crucial in property transactions. This section provides guidance on how to legally transfer ownership of property, ensuring that all legal requirements are met.
            </p>
          </div>

          <div className="legal-card">
            <h3>Legal Requirements</h3>
            <p>
              Learn about the legal requirements involved in buying and selling land, including necessary documentation and procedures to ensure a smooth transaction.
            </p>
          </div>
        </section>

        <section className="legal-section">
          <h2>Regulatory Compliance</h2>
          
          <div className="legal-card">
            <h3>Local Laws</h3>
            <p>
              Compliance with local laws and regulations is critical for property transactions. This section covers the essential local laws that impact buying and selling land, ensuring all parties adhere to legal standards.
            </p>
          </div>

          <div className="legal-card">
            <h3>Regulatory Guidelines</h3>
            <p>
              Understand the regulatory guidelines that LandMarket follows to maintain legal compliance and ensure the integrity of property transactions on our platform.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Legal;
