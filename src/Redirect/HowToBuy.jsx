import React from 'react';
import Header from '../Component/Layout/Header'; // Import the Header component
import Card3D from './Card3D';
import './HowToBuy.css';

const HowToBuy = () => {
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
      title: "Step 2: Browse Available Properties",
      content: (
        <p>
          Navigate to the Buy section of the website. Use the search filters to browse through available properties based on location, price, type, and other criteria. You can view property details and images to find options that suit your needs.
        </p>
      )
    },
    {
      title: "Step 3: Review Property Details",
      content: (
        <>
          <p>
            Click on a property listing to see more details. Review the property description, images, price, and any other relevant information provided by the seller.
          </p>
          <p>
            If you have questions or need more information, you can contact the seller using the messaging system provided on the platform.
          </p>
        </>
      )
    },
    {
      title: "Step 4: Shortlist and Compare Properties",
      content: (
        <p>
          Shortlist properties that interest you and compare them based on their features, prices, and locations. This will help you make an informed decision.
        </p>
      )
    },
    {
      title: "Step 5: Make an Inquiry or Offer",
      content: (
        <>
          <p>
            If you want to proceed with a property, use the inquiry form or contact the seller to express your interest. You may also be able to make an offer or negotiate the price through the platform.
          </p>
          <p>
            The seller will respond with further details or arrange a viewing if necessary.
          </p>
        </>
      )
    },
    {
      title: "Step 6: Arrange Property Viewing",
      content: (
        <p>
          If possible, schedule a viewing of the property to see it in person. This will help you confirm that it meets your expectations and make any necessary assessments.
        </p>
      )
    },
    {
      title: "Step 7: Finalize the Purchase",
      content: (
        <>
          <p>
            Once you’ve decided to purchase a property, finalize the transaction according to the platform's procedures. This may involve signing agreements, making payments, and transferring ownership.
          </p>
          <p>
            Ensure that all legal and financial aspects of the purchase are handled properly. Consult a legal professional if needed.
          </p>
        </>
      )
    },
    {
      title: "Step 8: Complete the Transaction",
      content: (
        <p>
          After the purchase is complete, ensure that all necessary documentation is finalized and that you receive ownership of the property. Update your account status on LandMarket as required.
        </p>
      )
    },
    {
      title: "Additional Tips",
      content: (
        <>
          <p>
            <strong>Verify Property Details:</strong> Ensure all information about the property is accurate and up-to-date.
          </p>
          <p>
            <strong>Conduct Due Diligence:</strong> Perform thorough research and due diligence before making a purchase.
          </p>
          <p>
            <strong>Seek Professional Advice:</strong> Consider consulting with a real estate agent or legal advisor for assistance with the purchase process.
          </p>
        </>
      )
    }
  ];

  return (
    <div className="how-to-buy">
      <Header /> {/* Add the Header component here */}
      <h1>How to Buy Property on LandMarket</h1>
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

export default HowToBuy;
