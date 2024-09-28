
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';
import './PropertyDetails.css';

const PropertyDetails = () => {
    const token = localStorage.getItem("token");
    const [auth] = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;

    const [showContactModal, setShowContactModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isPropertyAvailable, setIsPropertyAvailable] = useState(true);
    const [contactForm, setContactForm] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
        financingInfo: false,
    });

    const { id = '', propertyAddress = '', propertyCity = '', propertyPrice = '', propertyStatus = '', propertyZipCode = '', propertyState = '', userId = '' } = data;

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
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/order/create-order/property/${id}`, {
                name: auth?.username || "User name",
                email: auth?.email || "user@gmail.com",
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
            console.error("Error creating order", error.response ? error.response.data : error.message);
            alert("Failed to create order. Please try again.");
        }
    };

    const proceedOrder = (order) => {
        const options = {
            "key_id": "rzp_test_LForrv4px5KNlV",
            "amount": order.amount,
            "currency": "INR",
            "name": "LandMarket Payment",
            "description": "Payment for property purchase",
            "order_id": order.razorPayOrderID,
            "prefill": {
                "name": order.name,
                "email": order.email,
                "contact": order.phno
            },
            "theme": {
                "color": "#3399cc"
            },
            handler: async function (res) {
                setShowSuccessModal(true);

                // Update property status to "Not Available" after payment
                await axios.post(`http://localhost:8080/api/v1/order/handle-payment-callback/property/${id}/${res.razorpay_order_id}`, 
                { status: "Not Available" },
                {
                    headers: {
                        Authorization: token
                    }
                });

                // Update state to hide the property
                setIsPropertyAvailable(false);
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();

        rzp1.on('payment.failure', function (response) {
            alert("Payment failed. Please try again.");
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            buyerId: auth?.userId,
            ownerId: userId,
            emailId: contactForm.email,
            ...contactForm,
        };

        try {
            const response = await axios.post('http://localhost:8080/api/v1/contact-owners', payload, {
                headers: {
                    Authorization: token
                }
            });

            if (response) {
                alert('Your request has been sent to the property owner!');
                setShowContactModal(false);
            } else {
                alert('Failed to send your request. Please try again later.');
            }
        } catch (error) {
            alert('Failed to send your request. Please try again later.');
        }
    };

    const handleGoBack = () => {
        navigate('/buy-property');
    };

    return (
        <>
            <Header />
            {isPropertyAvailable ? (
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
                    </div>
                </div>
            ) : (
                <div className="alert alert-info text-center">
                    <h4>This property is no longer available.</h4>
                </div>
            )}

            {/* Contact Owner Modal */}
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

            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
                <Modal.Header closeButton style={{ backgroundColor: '#f0f8ff', borderBottom: 'none' }}>
                    <Modal.Title style={{ fontWeight: 'bold', fontSize: '24px', color: '#2f4f4f' }}>Payment Successful!</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: 'center', backgroundColor: '#f0f8ff' }}>
                    <div>
                        <img src="https://media.giphy.com/media/GyFAXobf5QvsuZMixB/giphy.gif?cid=ecf05e47c0ccb0gf86h64x7gv4107vvzof32n1ybzkecax51&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="Success Celebration" width="200px" />
                    </div>
                    <h5>Your property purchase was successful.</h5>
                    <p className="text-muted">
                        The property is now marked as "Not Available". You can go back to the property listing.
                    </p>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#f0f8ff', borderTop: 'none' }}>
                    <Button variant="primary" onClick={() => navigate('/buy-property')}>
                        Go Back to Properties
                    </Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </>
    );
};

export default PropertyDetails;
