import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout/Layout';
import ImageModal from './ImageModal'; // Ensure this is the correct path to your modal component
import './Properties.css';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPropertyImages, setCurrentPropertyImages] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found");

        const response = await axios.get('http://localhost:8080/api/v1/property', {
          headers: { Authorization: token },
        });

        setProperties(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error details:', error);
        setError('Error fetching properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const openModal = (images, index) => {
    setCurrentPropertyImages(images);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    if (currentImageIndex < currentPropertyImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const deleteProperty = async (propertyId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/v1/property/delete-property/${propertyId}`, {
        headers: { Authorization: token },
      });

      // Update the state to remove the deleted property
      setProperties(properties.filter(property => property.id !== propertyId));
    } catch (error) {
      console.error('Error deleting property:', error);
      setError('Error deleting property. Please try again.');
    }
  };

  if (loading) return <div className="text-center mt-4">Loading properties...</div>;
  if (error) return <div className="text-center text-danger mt-4">{error}</div>;

  return (
    <Layout>
      <div className="properties-container mt-4">
        <h1 className="properties-title text-center mb-4">Property Listings</h1>
        <div className="properties-row">
          {properties.length > 0 ? (
            properties.map(property => (
              <div className="property-col" key={property.id}>
                <div className="property-card">
                  {property.propertyImages && property.propertyImages.length > 0 ? (
                    <div className="property-images">
                      {property.propertyImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt={`Property Image ${index + 1}`}
                          className="property-image"
                          onClick={() => openModal(property.propertyImages, index)} // Open modal on image click
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="property-image-placeholder">
                      <p className="text-center mt-4">No Image Available</p>
                    </div>
                  )}
                  <div className="property-header">
                    <h5 className="property-title">{property.propertyAddress}</h5>
                  </div>
                  <div className="property-body">
                    <p><strong>City:</strong> {property.propertyCity}</p>
                    <p><strong>State:</strong> {property.propertyState}</p>
                    <p><strong>Zip Code:</strong> {property.propertyZipCode}</p>
                    <p><strong>Status:</strong> {property.propertyStatus || 'N/A'}</p>
                    <p><strong>Price:</strong> ₹{property.propertyPrice ? property.propertyPrice.toLocaleString() : 'N/A'}</p>
                    <button 
                      className="btn btn-danger"
                      onClick={() => deleteProperty(property.id)} // Delete button
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center">No properties found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <ImageModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          images={currentPropertyImages} 
          currentIndex={currentImageIndex} 
          onNext={nextImage} 
          onPrev={prevImage} 
        />
      )}
    </Layout>
  );
};

export default Properties;
