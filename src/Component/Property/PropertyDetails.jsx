import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom';
import './PropertyDetails.css';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const PropertyDetails = () => {
    const location = useLocation();
    const data = location.state;

    const [showContactModal, setShowContactModal] = useState(false);
    const [contactForm, setContactForm] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
        financingInfo: false,
    });

    const { id = '', propertyAddress = '', propertyCity = '', propertyPrice = '', propertyStatus = '', propertyZipCode = '', propertyState = '' } = data;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setContactForm((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleContactOwner = () => {
        setShowContactModal(true);
    };

    const handleCloseContactModal = () => {
        setShowContactModal(false);
    };

    const handleBuyProperty = () => {
        console.log("Pending");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            buyerId: 1, // Replace with actual buyerId
            ownerId: 2, // Replace with actual ownerId
            ...contactForm,
        };

        try {
            const response = await fetch(`http://localhost:8080/api/v1/user-request/buyer-id/${payload.buyerId}/owner-id/${payload.ownerId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Your request has been sent to the property owner!');
                setShowContactModal(false);
            } else {
                const errorData = await response.json();
                console.error('Error sending contact request:', errorData);
                alert('Failed to send your request. Please try again later.');
            }
        } catch (error) {
            console.error('Error sending contact request:', error);
            alert('Failed to send your request. Please try again later.');
        }
    };

    return (
        <>
            <Header />
            <div className="property-details-container">
                <div className="property-card shadow-lg">
                    <div className="property-card-header">
                        <h5 className="property-card-title">{propertyAddress}</h5>
                    </div>
                    <div className="property-card-body">
                        <p><strong>City:</strong> {propertyCity}</p>
                        <p><strong>State:</strong> {propertyState}</p>
                        <p><strong>Zip Code:</strong> {propertyZipCode}</p>
                        <p><strong>Status:</strong> {propertyStatus}</p>
                        <p><strong>Price:</strong> ${propertyPrice ? propertyPrice.toLocaleString() : 'N/A'}</p>
                    </div>
                    <div className="property-card-footer d-flex justify-content-between mt-3">
                        <Button className="btn btn-primary" onClick={handleBuyProperty}>
                            Buy Property
                        </Button>
                        <Button className="btn btn-secondary" onClick={handleContactOwner}>
                            Contact Owner
                        </Button>
                    </div>
                </div>
            </div>

            <Modal show={showContactModal} onHide={handleCloseContactModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Contact Owner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={contactForm.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter your phone number"
                                name="phone"
                                value={contactForm.phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email address"
                                name="email"
                                value={contactForm.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formMessage">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter your message"
                                name="message"
                                value={contactForm.message}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFinancingInfo">
                            <Form.Check
                                type="checkbox"
                                label="I want financing information"
                                name="financingInfo"
                                checked={contactForm.financingInfo}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDisclaimer">
                            <Form.Text className="text-muted">
                                By pressing "Contact Agent", you agree that LandMarket and its affiliates, and real estate professionals may call/text you about your inquiry, which may involve use of automated means and prerecorded/artificial voices. You don’t need to consent as a condition of buying any property, goods, or services. Message/data rates may apply. You also agree to our Terms of Use. LandMarket does not endorse any real estate professionals. We may share information about your recent and future site activity with your agent to help them understand what you’re looking for in a home.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Contact Owner
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseContactModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </>
    );
};

export default React.memo(PropertyDetails);
