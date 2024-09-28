import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SailedProperties.css'; // Create a CSS file for styling
import { Card, Button } from 'react-bootstrap';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const SailedProperties = () => {
    const [sailedProperties, setSailedProperties] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchSailedProperties = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/properties/sailed', {
                    headers: {
                        Authorization: token
                    }
                });
                setSailedProperties(response.data);
            } catch (error) {
                console.error("Error fetching sailed properties:", error);
            }
        };

        fetchSailedProperties();
    }, [token]);

    return (
        <>
            <Header />
            <div className="sailed-properties-container">
                <h2 className="text-center">Sailed Properties</h2>
                <div className="properties-grid">
                    {sailedProperties.length > 0 ? (
                        sailedProperties.map((property) => (
                            <Card key={property.id} className="property-card">
                                <Card.Body>
                                    <Card.Title>{property.propertyAddress}</Card.Title>
                                    <Card.Text>
                                        <strong>Price:</strong> ₹{property.propertyPrice.toLocaleString()}<br />
                                        <strong>Status:</strong> {property.propertyStatus}<br />
                                        <strong>City:</strong> {property.propertyCity}<br />
                                        <strong>State:</strong> {property.propertyState}
                                    </Card.Text>
                                    <Button variant="primary">View Details</Button>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p>No sailed properties available.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SailedProperties;
