// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // Use axios for fetching data
// import { useNavigate } from 'react-router-dom';
// // import './PropertiesPage.css'; // Ensure this CSS file exists and is correctly applied
// import Header from '../Component/Layout/Header'; 
// import Footer from '../Component/Layout/Footer'; 

// const PropertiesPage = () => {
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // State for filter inputs
//   const [filters, setFilters] = useState({
//     zipcode: '',
//     city: '',
//     state: '',
//     area: '',
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/v1/property');

//         if (response.status === 200) {
//           const data = response.data;
//           console.log('Fetched data:', data);

//           if (Array.isArray(data)) {
//             // Sort properties by date_added in descending order
//             const sortedProperties = data.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
//             setProperties(sortedProperties);
//             setFilteredProperties(sortedProperties);
//           } else {
//             throw new Error('Data format is incorrect');
//           }
//         } else {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//       } catch (error) {
//         console.error('Error fetching properties:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   // Handle filter input changes
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({
//       ...filters,
//       [name]: value
//     });
//   };

//   // Apply filters to the properties list
//   useEffect(() => {
//     const { zipcode, city, state, area } = filters;
//     const filtered = properties.filter(property =>
//       (zipcode ? property.propertyZipCode.includes(zipcode) : true) &&
//       (city ? property.propertyCity.toLowerCase().includes(city.toLowerCase()) : true) &&
//       (state ? property.propertyState.toLowerCase().includes(state.toLowerCase()) : true) &&
//       (area ? property.propertySize.includes(area) : true)
//     );
//     setFilteredProperties(filtered);
//   }, [filters, properties]);

//   // Handle view details button click
//   const handleViewDetails = (data) => {
//     console.log(data);
//     navigate(`/property/${data.id}`, { state: data });
//   };

//   if (loading) {
//     return <div>Loading properties...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <>
//       <Header />
//       <div className="container mt-4">
//         <h1 className="text-center">Properties for Sale</h1>

//         {/* Filter form */}
//         <div className="filter-form-container mb-4 p-3 rounded shadow-sm">
//           <h3 className="text-center">Filter Properties</h3>
//           <form>
//             <div className="form-row">
//               <div className="form-group col-md-3">
//                 <input
//                   type="text"
//                   id="state"
//                   name="state"
//                   className="form-control form-control-sm"
//                   placeholder="State"
//                   value={filters.state}
//                   onChange={handleFilterChange}
//                 />
//               </div>
//               <div className="form-group col-md-3">
//                 <input
//                   type="text"
//                   id="city"
//                   name="city"
//                   className="form-control form-control-sm"
//                   placeholder="City"
//                   value={filters.city}
//                   onChange={handleFilterChange}
//                 />
//               </div>
//               <div className="form-group col-md-3">
//                 <input
//                   type="text"
//                   id="zipcode"
//                   name="zipcode"
//                   className="form-control form-control-sm"
//                   placeholder="Zipcode"
//                   value={filters.zipcode}
//                   onChange={handleFilterChange}
//                 />
//               </div>
//               <div className="form-group col-md-3">
//                 <input
//                   type="text"
//                   id="area"
//                   name="area"
//                   className="form-control form-control-sm"
//                   placeholder="Size (sq ft)"
//                   value={filters.area}
//                   onChange={handleFilterChange}
//                 />
//               </div>
//             </div>
//           </form>
//         </div>

//         <div className="row">
//           {filteredProperties.length > 0 ? (
//             filteredProperties.map((item, index) => (
//               <div className="col-md-4" key={index}>
//                 <div className="card mb-4 shadow-sm">
//                   <div className="card-body">
//                     <h5 className="card-title">{item.propertyCity}, {item.propertyState}</h5>
//                     <p className="card-text"><strong>Zip Code:</strong> {item.propertyZipCode}</p>
//                     <p className="card-text"><strong>Size:</strong> {item.propertySize} sq ft</p>
//                     <p className="card-text"><strong>Status:</strong> {item.propertyStatus}</p>
//                     <button
//                       className="btn btn-primary"
//                       onClick={() => handleViewDetails(item)}
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No properties available</p>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default PropertiesPage;
import React from 'react';
import { useLocation } from 'react-router-dom';

const PropertiesPage = () => {
  const location = useLocation();
  const { filteredProperties } = location.state || {};

  return (
    <div className="container mt-4">
      <h1 className="text-center">Filtered Properties</h1>
      <div className="row">
        {filteredProperties && filteredProperties.length > 0 ? (
          filteredProperties.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{item.propertyCity}, {item.propertyState}</h5>
                  <p className="card-text"><strong>Zip Code:</strong> {item.propertyZipCode}</p>
                  <p className="card-text"><strong>Size:</strong> {item.propertySize} sq ft</p>
                  <p className="card-text"><strong>Status:</strong> {item.propertyStatus}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewDetails(item)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No properties available</p>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;
