import React from 'react';
import Card3D from './Card3D';
import './HowToSell.css';

const HowToSell = () => {
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
            <strong>Upload Images:</strong> Upload high-quality images of your property. Make sure to include images of both the interior and exterior to give buyers a comprehensive view.
          </p>
          <p>
            <strong>Upload Documents:</strong> Attach any necessary documents like the property deed, land registry, or any legal documentation required to facilitate the sale.
          </p>
        </>
      )
    },
    {
      title: "Step 4: Review Your Listing",
      content: (
        <p>
          After filling out all the details, review your listing to ensure all the information is accurate. Make sure the images are properly uploaded and the description is clear and informative.
        </p>
      )
    },
    {
      title: "Step 5: Submit Your Listing",
      content: (
        <p>
          Once you’re satisfied with the listing, click on the Submit or Post Property button. Your property will then be listed on LandMarket, where potential buyers can view it.
        </p>
      )
    },
    {
      title: "Step 6: Respond to Inquiries",
      content: (
        <p>
          After your property is listed, interested buyers may contact you via the LandMarket messaging system. Respond promptly to any inquiries to facilitate the sale process.
        </p>
      )
    },
    {
      title: "Step 7: Finalize the Sale",
      content: (
        <p>
          Once you’ve found a buyer, you can negotiate the terms of the sale. When both parties agree, complete the sale according to local laws and regulations. After the sale is finalized, update the status of your listing on LandMarket to indicate that the property has been sold.
        </p>
      )
    },
    {
      title: "Step 8: Remove the Listing (Optional)",
      content: (
        <p>
          If for any reason you decide not to sell your property, you can go back to the Sell Property section. Locate your listing and select the option to remove or deactivate it from the marketplace.
        </p>
      )
    },
    {
      title: "Additional Tips",
      content: (
        <>
          <p>
            <strong>Provide Accurate Information:</strong> Ensure all details provided about the property are accurate to avoid any legal issues.
          </p>
          <p>
            <strong>Stay Responsive:</strong> Being responsive to buyer inquiries can help speed up the selling process.
          </p>
          <p>
            <strong>Consider Professional Help:</strong> If you’re unfamiliar with the selling process, consider hiring a real estate agent or legal professional to assist you.
          </p>
        </>
      )
    }
  ];

  return (
    <div className="how-to-sell">
      <h1>How to Sell Your Property on LandMarket</h1>
      <div className="card-container">
        {steps.map((step, index) => (
          <Card3D key={index} stepTitle={step.title}>
            {step.content}
          </Card3D>
        ))}
      </div>
    </div>
  );
};

export default HowToSell;
