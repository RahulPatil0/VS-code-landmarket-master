import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PropertyDetails.css'; // Custom CSS file

const PropertyDetails = () => {
  
  const token = localStorage.getItem("token");

  const { id } = useParams();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    financingInfo: false,
  });

  // Mocking buyerId from a session or similar source
  const buyerId = 1655; // Replace this with the actual buyerId from the authenticated user session

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/property');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const propertiesData = data.body || [];
        
        // Filter properties added within the last day
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        
        const recentProperties = propertiesData.filter((property) => {
          const createdAt = new Date(property.createdAt); // Assumes property has a createdAt field
          return createdAt >= oneDayAgo;
        });

        setProperties(recentProperties);
        setFilteredProperties(recentProperties); // Initialize filteredProperties
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Error fetching properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    // Apply filtering based on city, state, and zipcode
    const filtered = properties.filter((property) => {
      return (
        (city === '' || property.propertyCity.toLowerCase() === city.toLowerCase()) &&
        (state === '' || property.propertyState.toLowerCase() === state.toLowerCase()) &&
        (zipcode === '' || property.propertyZipCode === zipcode)
      );
    });
    setFilteredProperties(filtered);
  }, [city, state, zipcode, properties]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'city':
        setCity(value);
        break;
      case 'state':
        setState(value);
        break;
      case 'zipcode':
        setZipcode(value);
        break;
      default:
        break;
    }
  };

  const handleContactOwner = () => {
    setShowContactModal(true);
  };

  const handleCloseContactModal = () => {
    setShowContactModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContactForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const property = properties.find((prop) => prop.id === Number(id));

    if (!property) return;

    const payload = {
      buyerId,
      ownerId: property.userId, // Assuming the property object contains userId as the ownerId
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
        const errorData = await response.json();
        console.error('Error sending contact request:', errorData);
        alert('Failed to send your request. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending contact request:', error);
      alert('Failed to send your request. Please try again later.');
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Loading properties...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-4">{error}</div>;
  }

  if (filteredProperties.length === 0 && !loading && !error) {
    return <div className="text-center mt-4">No properties found</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Property Listings</h1>

      {/* Filter Form */}
      <div className="filter-form">
        <input
          type="text"
          name="city"
          placeholder="City"
          value={city}
          onChange={handleFilterChange}
          className="form-control"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={state}
          onChange={handleFilterChange}
          className="form-control"
        />
        <input
          type="text"
          name="zipcode"
          placeholder="Zip Code"
          value={zipcode}
          onChange={handleFilterChange}
          className="form-control"
        />
      </div>

      {/* Property List */}
      <div className="property-list">
        {filteredProperties.map((property) => (
          <div key={property.id} className="property-card shadow-lg">
            <div className="property-card-body">
              <h5 className="property-card-title">{property.propertyAddress}</h5>
              <p><strong>City:</strong> {property.propertyCity}</p>
              <p><strong>State:</strong> {property.propertyState}</p>
              <p><strong>Zip Code:</strong> {property.propertyZipCode}</p>
              <p><strong>Status:</strong> {property.propertyStatus}</p>
              <p><strong>Price:</strong> ${property.propertyPrice ? property.propertyPrice.toLocaleString() : 'N/A'}</p>    
                <Button className="btn btn-secondary" onClick={handleContactOwner}>
                  Contact Owner
                </Button>
              </div>
            </div>
        ))}
      </div>

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
                By pressing "Contact Agent", you agree that LandMarket Group and its affiliates, and LandMarket professionals may call/text you about your inquiry, which may involve use of automated means and prerecorded/artificial voices. You dont need to consent as a condition of buying any property, goods or services. Message/data rates may apply. You also agree to our Terms of Use. Zillow does not endorse any real estate professionals. We may share information about your recent and future site activity with your agent to help them understand what you’re looking for in a home.
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
    </div>
  );
};

export default PropertyDetails;
