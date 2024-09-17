import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/Auth';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token); // Debug log
        if (!token) throw new Error("No authentication token found");

        const response = await axios.get('http://localhost:8080/api/v1/property', {
          headers: { Authorization:
             token } // Ensure correct header format
        });

        setProperties(response.data.body || []);
      } catch (error) {
        console.error('Error details:', error);
        setError('Error fetching properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div className="text-center mt-4">Loading properties...</div>;
  if (error) return <div className="text-center text-danger mt-4">{error}</div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Property Listings</h1>
      {/* Render properties here */}
    </div>
  );
};

export default Properties;
