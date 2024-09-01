import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './LegalAgreements.css';
import Header from '../Component/Layout/Header'; 
import Footer from '../Component/Layout/Footer';  

const LegalAgreements = () => {
  const { section } = useParams();
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (section) {
      setActiveSection(section);
    }
  }, [section]);

  const handleSectionClick = (sectionName) => {
    setActiveSection(activeSection === sectionName ? '' : sectionName);
  };

  return (
    <div className="legal-agreements-wrapper">
      <Header />
      <div className="legal-agreements-container">
        <h1>Legal Agreements</h1>
        <p><strong>Last Updated: [Date]</strong></p>

        <button onClick={() => handleSectionClick('privacyPolicy')}>
          {activeSection === 'privacyPolicy' ? 'Hide Privacy Policy' : 'Read Full Privacy Policy'}
        </button>
        {activeSection === 'privacyPolicy' && (
          <div className="section-content section-content-active">
            <h2>Privacy Policy</h2>
            <p>
              We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services. By accessing or using LandMarket, you agree to the terms outlined in this Privacy Policy.
              <ul>
                <li><strong>Information We Collect</strong>: Personal information, usage data, cookies.</li>
                <li><strong>How We Use Your Information</strong>: To provide and improve services, communicate, personalize experience.</li>
                <li><strong>How We Protect Your Information</strong>: Security measures, limitations.</li>
                <li><strong>Sharing Your Information</strong>: Service providers, legal requirements.</li>
                <li><strong>Your Choices</strong>: Access, update, opt-out options.</li>
                <li><strong>Cookies and Tracking Technologies</strong>: Control options, impact.</li>
                <li><strong>Third-Party Links</strong>: Not responsible for third-party sites.</li>
                <li><strong>Children's Privacy</strong>: No collection from under 13s.</li>
                <li><strong>Changes to This Privacy Policy</strong>: Update procedures.</li>
                <li><strong>Contact Us</strong>: Contact details for inquiries.</li>
              </ul>
            </p>
          </div>
        )}

        <button onClick={() => handleSectionClick('termsOfService')}>
          {activeSection === 'termsOfService' ? 'Hide Terms of Service' : 'Read Full Terms of Service'}
        </button>
        {activeSection === 'termsOfService' && (
          <div className="section-content section-content-active">
            <h2>Terms of Service</h2>
            <p>
              These terms govern your use of LandMarket's services. By accessing or using our services, you agree to comply with these terms.
              <ul>
                <li><strong>Acceptance of Terms</strong>: Agreement to terms and conditions.</li>
                <li><strong>Service Access</strong>: Conditions for accessing and using the platform.</li>
                <li><strong>Modifications</strong>: Rights and procedures for changing services.</li>
                <li><strong>Termination</strong>: Conditions under which access may be terminated.</li>
                <li><strong>Limitation of Liability</strong>: Limitations on our liability for damages.</li>
                <li><strong>Governing Law</strong>: Applicable laws and jurisdiction.</li>
              </ul>
            </p>
          </div>
        )}

        <button onClick={() => handleSectionClick('otherLegalAgreements')}>
          {activeSection === 'otherLegalAgreements' ? 'Hide Other Legal Agreements' : 'Read Other Legal Agreements'}
        </button>
        {activeSection === 'otherLegalAgreements' && (
          <div className="section-content section-content-active">
            <h2>Other Legal Agreements</h2>
            <p>
              We have various legal agreements in place to ensure the proper functioning of LandMarket. These agreements cover aspects such as user conduct and dispute resolution.
              <ul>
                <li><strong>User Conduct Agreement</strong>: Standards for user behavior.</li>
                <li><strong>Dispute Resolution Agreement</strong>: Procedures for resolving disputes.</li>
                <li><strong>Terms of Service</strong>: Governs use of services.</li>
                <li><strong>Privacy Policy</strong>: Details on data collection and protection.</li>
                <li><strong>Cookie Policy</strong>: Information on cookies and user choices.</li>
              </ul>
              For a comprehensive understanding, please read the full agreements on our website.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LegalAgreements;
