import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom'; // Add useNavigate to redirect
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import axios from 'axios';
import './PropertyDetails.css';

const PropertyDetails = () => {
    const token = localStorage.getItem("token");
    const location = useLocation();
    const navigate = useNavigate(); // For navigation
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

    const handleBuyProperty = async () => {
        // Create order and then initiate payment with Razorpay
        try {
            const response = await axios.post("http://localhost:8080/api/v1/order/create-order", {
                name: contactForm.name || "John Doe",
                email: contactForm.email || "johndoe@gmail.com",
                phno: contactForm.phone || "1234567890",
                course: "Property Purchase",
                amount: propertyPrice,
                currency: 'INR'
            }, {
                headers: {
                    Authorization: token
                }
            });

            const order = response.data;
            proceedOrder(order);
        } catch (error) {
            console.error("Error creating order", error);
            alert("Failed to create order. Please try again.");
        }
    };

    const proceedOrder = (order) => {
        const options = {
            "key_id": "rzp_test_LForrv4px5KNlV",  // Replace with your Razorpay key_id
            "amount": order.amount,  // Amount in paise
            "currency": "INR",
            "name": "LandMarket Payment",
            "description": "Payment for property purchase",
            "order_id": order.razorPayOrderID,
            "callback_url": "http://localhost:8080/order/handle-payment-callback",
            "prefill": {
                "name": order.name,
                "email": order.email,
                "contact": order.phno
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let buyerId = 1552;
        const payload = {
            buyerId,
            ownerId: 1655,
            ...contactForm,
        };

        try {
            const response = await axios.get('http://localhost:8080/api/v1/contact-owners', payload, {
                headers: {
                    Authorization: token
                }
            });

            if (response.ok) {
                alert('Your request has been sent to the property owner!');
                setShowContactModal(false);
            } else {
                alert('Failed to send your request. Please try again later.');
            }
        } catch (error) {
            alert('Failed to send your request. Please try again later.');
        }
    };

    // Navigate back to BuyProperty page
    const handleGoBack = () => {
        navigate('/buy-property');
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
                        <p><strong>Price:</strong> ₹{propertyPrice ? propertyPrice.toLocaleString() : 'N/A'}</p>
                    </div>
                    <div className="property-card-footer d-flex justify-content-between mt-3">
                        <Button className="btn btn-primary" onClick={handleBuyProperty}>
                            Buy Property
                        </Button>
                        <Button className="btn btn-secondary" onClick={handleContactOwner}>
                            Contact Owner
                        </Button>
                        <Button className="btn btn-secondary" onClick={handleGoBack}>
                            Go Back
                        </Button>
                    </div>
                    {/* Go Back Button */}
                    {/* <div className="go-back-container mt-4">
                        <Button variant="outline-secondary" onClick={handleGoBack}>
                            Go Back
                        </Button>
                    </div> */}
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
                                By pressing "Contact Agent", you agree that LandMarket and its affiliates, and real estate professionals may call/text you about your inquiry.
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
