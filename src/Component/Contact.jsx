import React from 'react';
import Header from './Layout/Header'; // Import the Header component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHeadset, faEnvelopeOpenText, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import './Contact.css';
import contactImage from '../assets/nature2.jpg'; // Replace with the correct path

const Contact = () => {
  return (
    <>
      <Header /> {/* Add the Header component */}

      <section className="bg-light py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
              <h3 className="fs-6 text-secondary mb-2 text-uppercase text-center">Get in Touch</h3>
              {/* <h2 className="display-5 mb-4 mb-md-5 text-center">
                We're always on the lookout to work with new clients.
              </h2> */}
              <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
            </div>
          </div>
        </div>

        <div className="container1">
          <div className="row gy-3 gy-md-4 gy-lg-0 align-items-xl-center">
            <div className="col-12 col-lg-6">
            <img className="contact-image" loading="lazy" src={contactImage} alt="Get in Touch" />

            </div>
            <div className="col-12 col-lg-6">
              <div className="row justify-content-xl-center">
                <div className="col-12 col-xl-11">
                  <div className="bg-white border rounded shadow-sm overflow-hidden">
                    <form action="#!">
                      <div className="row gy-4 gy-xl-5 p-4 p-xl-5">
                        <div className="col-12">
                          <label htmlFor="fullname" className="form-label">
                            Full Name <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" id="fullname" name="fullname" required />
                        </div>
                        <div className="col-12 col-md-6">
                          <label htmlFor="email" className="form-label">
                            Email <span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <FontAwesomeIcon icon={faEnvelopeOpenText} />
                            </span>
                            <input type="email" className="form-control" id="email" name="email" required />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <label htmlFor="phone" className="form-label">
                            Phone Number
                          </label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <FontAwesomeIcon icon={faHeadset} />
                            </span>
                            <input type="tel" className="form-control" id="phone" name="phone" />
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="subject" className="form-label">
                            Subject <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" id="subject" name="subject" required />
                        </div>
                        <div className="col-12">
                          <label htmlFor="message" className="form-label">
                            Message <span className="text-danger">*</span>
                          </label>
                          <textarea className="form-control" id="message" name="message" rows="3" required />
                        </div>
                        <div className="col-12">
                          <div className="d-grid">
                            <button className="btn btn-primary btn-lg" type="submit">
                              Send Message
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="right_contact_social_icon d-flex align-items-end mt-4">
                <div className="social_item_inner d-flex">
                  <li><a href="#"><FontAwesomeIcon icon={faFacebookSquare} /></a></li>
                  <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                  <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact_info_sec bg-light py-3 py-md-5">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <h4>Contact Info</h4>
              <div className="d-flex info_single align-items-center">
                <FontAwesomeIcon icon={faHeadset} />
                <span>+91 8009 054294</span>
              </div>
              <div className="d-flex info_single align-items-center">
                <FontAwesomeIcon icon={faEnvelopeOpenText} />
                <span>info@flightmantra.com</span>
              </div>
              <div className="d-flex info_single align-items-center">
                <FontAwesomeIcon icon={faMapMarkedAlt} />
                <span>1000+ Travel partners and 65+ Service cities across India, USA, Canada & UAE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="map_sec bg-light py-3 py-md-5">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="map_inner">
                <h4>Find Us on Google Map</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quo beatae quasi assumenda, expedita aliquam minima tenetur maiores neque incidunt repellat aut voluptas hic dolorem sequi ab porro, quia error.</p>
                <div className="map_bind">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471220.5631094339!2d88.04952462217592!3d22.6757520733225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1596988408134!5m2!1sen!2sin"
                    width="100%" 
                    height="450" 
                    frameBorder="0" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    aria-hidden="false" 
                    tabIndex="0">
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
