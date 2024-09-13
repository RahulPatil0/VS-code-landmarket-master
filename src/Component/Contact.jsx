import React, { useRef, useState } from 'react';
import Header from './Layout/Header'; // Import the Header component
import Footer from './Layout/Footer'; // Import the Footer component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Contact.css'; // Import your CSS for the contact page
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';

const Contact = () => {
  const captchaRef = useRef(null);
  const [disableSubmit, setSubmitbutton] = useState(true);

  // Updated state variables based on the names in your request
  const [contact, setContact] = useState({
    name: "",
    emailId: "",
    subject: "",
    comment: "",
    token: ""
  });

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setContact((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tokenValue = captchaRef.current.getValue();
    setContact((prevData) => ({ ...prevData, token: tokenValue }));
    console.log(contact);

    try {
      const response = await axios.post(`http://localhost:8080/api/v1/contact`, contact);
      console.log(response);
    captchaRef.current.reset();
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>
      <Header /> {/* Header component */}
      <div className="contact-container">
        <div className="contact-left">
          {/* Image Section */}
          <div className="contact-image">
            <img src="contact.jpg" alt="Contact Us" /> {/* Add your image path */}
          </div>
        </div>

        <div className="contact-right">
          {/* Contact Form */}
          <div className="contact-header">
            <h2>Contact Us</h2>
            <p>If you have any questions, feel free to reach out to us!</p>
          </div>

          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Your Name" 
                value={contact.name} 
                required 
                name="name" 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="emailId" 
                placeholder="Your Email" 
                value={contact.emailId} 
                required 
                name="emailId" 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                placeholder="Your Subject" 
                value={contact.subject} 
                required 
                name="subject" 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="comment" 
                rows="4" 
                placeholder="Your Message" 
                value={contact.comment} 
                required 
                name="comment" 
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-group">
              <ReCAPTCHA
                sitekey="6Lfosz4qAAAAAGP60bEdZeS498puSsCyZoX0PUrP"
                ref={captchaRef}
                onChange={() => setSubmitbutton(false)}
              />
            </div>

            <button className="btn btn-primary" onClick={handleSubmit} disabled={disableSubmit}>Send Message</button>
          </form>
        </div>
      </div>
      <Footer /> {/* Footer component */}
    </>
  );
};

export default Contact;
