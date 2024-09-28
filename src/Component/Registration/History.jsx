import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { useAuth } from "../../Context/Auth";
import Layout from "../Layout/Layout";
import './History.css'; // Import your CSS file here
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const History = () => {
  const [auth] = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const url = import.meta.env.VITE_LANDMARKET_URL;

  useEffect(() => {
    // Fetch the user's properties from the backend
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${url}/property/owner/${auth?.userId}`, {
          headers: {
            Authorization: auth?.token,
          },
        });
        setProperties(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [auth?.userId, auth?.token, url]);

  const handleDelete = async (propertyId) => {
    try {
      await axios.delete(`${url}/property/${propertyId}`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setProperties(properties.filter(property => property._id !== propertyId));
      alert('Property deleted successfully.');
    } catch (error) {
      console.error("Error deleting property:", error);
      alert('Failed to delete the property.');
    }
  };

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedProperty(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`${url}/property/${selectedProperty._id}`, selectedProperty, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setProperties(properties.map(property => 
        property._id === selectedProperty._id ? selectedProperty : property
      ));
      setEditModalOpen(false);
      alert('Property updated successfully.');
    } catch (error) {
      console.error("Error updating property:", error);
      alert('Failed to update the property.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="history-page-container">
        <h2>Your Property History</h2>
        {properties.length === 0 ? (
          // Replacing the 'No properties found' message with the Lottie animation
          <div className="no-properties-animation">
            <iframe 
              src="https://lottie.host/embed/c815ef24-d4d3-40ef-a8b2-87138d9bd331/czxWqjEpbY.json"
              style={{ width: "100%", height: "400px", border: "none" }}
              title="No Properties Found Animation"
            ></iframe>
          </div>
        ) : (
          <div className="history-card-container">
            {properties.map((property, index) => (
              <div className="property-card" key={index}>
                <h4 className="property-title">{property.propertyAddress}, {property.propertyCity}, {property.propertyState}</h4>
                {property.propertyImages && property.propertyImages.length > 0 ? (
                  <div className="property-images">
                    {property.propertyImages.map((img, imgIndex) => (
                      <div key={imgIndex} className="image-wrapper" onClick={() => handleImageClick(img.url)}>
                        <img src={img.url} alt={`Property image ${imgIndex + 1}`} className="property-image" />
                        <FaEye className="view-icon" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No images available</p>
                )}
                <div className="property-details">
                  <p className="property-info"><strong>Size:</strong> {property.propertySize} sq. ft.</p>
                  <p className="property-info"><strong>Price:</strong> ${property.propertyPrice}</p>
                  <p className="property-info"><strong>Status:</strong> {property.propertyStatus}</p>
                  <p className="property-info"><strong>Zip Code:</strong> {property.propertyZipCode}</p>
                </div>
                <div className="property-actions">
                  <FaEdit className="edit-icon" onClick={() => handleEditClick(property)} />
                  <FaTrash className="delete-icon" onClick={() => handleDelete(property._id)} />
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedImage && (
          <div className="modal" onClick={handleCloseModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <img src={selectedImage} alt="Selected property" className="modal-image" />
              <button className="close-modal" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        )}
        {editModalOpen && (
          <div className="modal" onClick={() => setEditModalOpen(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h3>Edit Property</h3>
              <label>
                Size (sq. ft.):
                <input 
                  type="number" 
                  name="propertySize" 
                  value={selectedProperty.propertySize} 
                  onChange={handleEditChange} 
                />
              </label>
              <label>
                Price:
                <input 
                  type="number" 
                  name="propertyPrice" 
                  value={selectedProperty.propertyPrice} 
                  onChange={handleEditChange} 
                />
              </label>
              <label>
                Status:
                <select 
                  name="propertyStatus" 
                  value={selectedProperty.propertyStatus} 
                  onChange={handleEditChange}
                >
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                  <option value="Pending">Pending</option>
                </select>
              </label>
              <label>
                Zip Code:
                <input 
                  type="text" 
                  name="propertyZipCode" 
                  value={selectedProperty.propertyZipCode} 
                  onChange={handleEditChange} 
                />
              </label>
              <button onClick={handleSaveEdit}>Save Changes</button>
              <button onClick={() => setEditModalOpen(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default History;
