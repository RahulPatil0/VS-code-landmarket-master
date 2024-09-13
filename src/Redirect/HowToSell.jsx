import React, { useState } from 'react';
import './HowToSell.css';
import Header from '../Component/Layout/Header';
// import Footer from '../Component/Layout/Footer';

const HowToSell = () => {
  const [openStep, setOpenStep] = useState(null);

  const steps = [
    {
      title: "Step 1: Sign In or Register",
      content: (
        <>
          <p>
            <strong>Sign In:</strong> If you already have an account, click on the Sign In button in the header of the LandMarket website. Enter your credentials (email and password) to log in.
          </p>
          <p>
            <strong>Register:</strong> If you’re new to LandMarket, click on the Sign Up button. Fill in the required details such as your name, email address, and password, then submit the form to create a new account.
          </p>
        </>
      )
    },
    {
      title: "Step 2: Navigate to the Sell Property Section",
      content: (
        <p>
          After signing in, look for the Sell Property option in the website's header or sidebar. Click on the Sell Property button to go to the property selling page.
        </p>
      )
    },
    {
      title: "Step 3: Provide Property Details",
      content: (
        <>
          <p>
            <strong>Basic Information:</strong> Fill in the basic details of your property, including:
            <ul>
              <li>Property Title: A brief title describing your property.</li>
              <li>Location: The exact location or address of your property.</li>
              <li>Price: The selling price you are asking for.</li>
              <li>Property Type: Choose whether it’s residential, commercial, agricultural, etc.</li>
            </ul>
          </p>
          <p>
            <strong>Property Description:</strong> Write a detailed description of your property, highlighting its features, benefits, and any unique aspects that make it appealing to potential buyers.
          </p>
          <p>
            <strong>Upload Images:</strong> Upload high-quality images of your property, both interior and exterior, for a comprehensive view.
          </p>
          <p>
            <strong>Upload Documents:</strong> Attach any necessary legal documents such as the property deed, land registry, or other documentation required for the sale.
          </p>
        </>
      )
    }
  ];

  const toggleStep = (index) => {
    setOpenStep(openStep === index ? null : index);
  };

  return (
    <>
      <Header />
      <div className="how-to-sell">
        <h1>How to Sell Your Property on LandMarket</h1>
        <div className="accordion-container">
          {steps.map((step, index) => (
            <div key={index} className="accordion-item">
              <div className="accordion-title" onClick={() => toggleStep(index)}>
                <h3>{step.title}</h3>
                <span className={`accordion-icon ${openStep === index ? 'open' : ''}`}>▼</span>
              </div>
              {openStep === index && (
                <div className="accordion-content">
                  {step.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HowToSell;
