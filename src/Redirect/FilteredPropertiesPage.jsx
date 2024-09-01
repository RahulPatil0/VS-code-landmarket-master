import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FilteredPropertiesPage = () => {
  const location = useLocation();
  const { filteredProperties } = location.state || { filteredProperties: [] };
  const navigate = useNavigate();

  const handleViewDetails = (property) => {
    navigate(`/property/${property.id}`, { state: property });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Filtered Properties</h1>
      <div className="row">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{property.propertyCity}, {property.propertyState}</h5>
                  <p className="card-text"><strong>Zip Code:</strong> {property.propertyZipCode}</p>
                  <p className="card-text"><strong>Size:</strong> {property.propertySize} sq ft</p>
                  <p className="card-text"><strong>Status:</strong> {property.propertyStatus}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewDetails(property)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No properties match your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default FilteredPropertiesPage;
