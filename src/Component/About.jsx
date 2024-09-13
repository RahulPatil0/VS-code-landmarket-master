import React from 'react';
import Layout from './Layout/Layout';
import './about.css';
import aboutImage from '../../src/assets/nature2.jpg'; // Replace with the appropriate image path

const About = () => {
  return (
    <Layout>
      <div className="about">
        <section className="about-section">
          <div className="about-image">
            <img src={aboutImage} alt="LandMarket" />
          </div>

          <div className="about-content">
            <h2>About Us</h2>
            <p>
            At LandMarket, we are dedicated to revolutionizing the real estate experience. As your premier platform for buying and selling properties, we offer a comprehensive suite of tools designed to simplify and streamline the process for both buyers and sellers. Our vision is to create a transparent and accessible real estate market where every transaction is straightforward and efficient.
               We provide an extensive range of property listings with detailed profiles, including high-quality images and comprehensive descriptions, ensuring you have all the information you need to make informed decisions. Our commitment to transparency means clear and accurate pricing, with no hidden costs, allowing you to navigate the real estate market with confidence.
            </p>
            <p>
              Our dedicated team is passionate about real estate and committed to helping you make informed
              decisions. We leverage cutting-edge technology to deliver accurate property information and
              market insights, ensuring you get the best value for your investment.
            </p>
          </div>
        </section>
        <section className="cards-section">
          <div className="card card-3d">
            <h3>Our Mission</h3>
            <p>
              Our mission is to simplify the real estate process by providing easy access to property listings,
              expert advice, and the tools needed to make informed decisions.
            </p>
          </div>

          <div className="card card-3d">
            <h3>Our Services</h3>
            <p>
              We offer a range of services including property listings, detailed property profiles, price analysis,
              and customer support to ensure a seamless property buying and selling experience.
            </p>
          </div>

          <div className="card card-3d">
            <h3>Property Listings</h3>
            <p>
              Explore a wide range of property listings tailored to your needs. Create a detailed profile to
              showcase your property and connect with potential buyers who are looking for their ideal real estate investment.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
