
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './BuyProperty.css'; // Import updated CSS file
// import Header from '../Component/Layout/Header'; 
// import Footer from '../Component/Layout/Footer'; 

// const BuyProperty = () => {
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

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
//         const response = await fetch('http://localhost:8080/api/v1/property');

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('Fetched data:', data.body);

//         if (Array.isArray(data.body)) {
//           setProperties(data.body);
//           setFilteredProperties(data.body);
//         } else {
//           throw new Error('Data format is incorrect');
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

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({
//       ...filters,
//       [name]: value
//     });
//   };

//   useEffect(() => {
//     const { zipcode, city, state, area } = filters;
//     const filtered = properties
//       .filter(property =>
//         (zipcode ? property.propertyZipCode.includes(zipcode) : true) &&
//         (city ? property.propertyCity.toLowerCase().includes(city.toLowerCase()) : true) &&
//         (state ? property.propertyState.toLowerCase().includes(state.toLowerCase()) : true) &&
//         (area ? property.propertySize.includes(area) : true)
//       )
//       .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)); // Assuming dateAdded is the property to sort by

//     setFilteredProperties(filtered);
//   }, [filters, properties]);

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

// export default BuyProperty;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BuyProperty.css'; // Import updated CSS file
import Header from '../Component/Layout/Header';
import Footer from '../Component/Layout/Footer';

const BuyProperty = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filter inputs
  const [filters, setFilters] = useState({
    zipcode: '',
    city: '',
    state: '',
    area: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/property');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data.body);

        if (Array.isArray(data.body)) {
          // Sort properties by date_added in descending order
          const sortedProperties = data.body.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
          setProperties(sortedProperties);
          setFilteredProperties(sortedProperties);
        } else {
          throw new Error('Data format is incorrect');
        }

      } catch (error) {
        console.error('Error fetching properties:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Apply filters to the properties list
  useEffect(() => {
    const { zipcode, city, state, area } = filters;
    const filtered = properties.filter(property =>
      (zipcode ? property.propertyZipCode.includes(zipcode) : true) &&
      (city ? property.propertyCity.toLowerCase().includes(city.toLowerCase()) : true) &&
      (state ? property.propertyState.toLowerCase().includes(state.toLowerCase()) : true) &&
      (area ? property.propertySize.includes(area) : true)
    );
    setFilteredProperties(filtered);
  }, [filters, properties]);

  // Handle view details button click
  const handleViewDetails = (data) => {
    console.log(data);
    navigate(`/property/${data.id}`, { state: data });
  };

  if (loading) {
    return <div>Loading properties...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className="container mt-4">

        <div className="row">
          <h1 className="text-center">Properties for Sale</h1>

          {/* Filter form */}
          <div className="filter-form-container mb-4 p-3 rounded shadow-sm">
            <h3 className="text-center">Filter Properties</h3>
            <form>
              <div className="form-row">
                <div className="form-group col-md-3">
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="form-control form-control-sm"
                    placeholder="State"
                    value={filters.state}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="form-group col-md-3">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control form-control-sm"
                    placeholder="City"
                    value={filters.city}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="form-group col-md-3">
                  <input
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    className="form-control form-control-sm"
                    placeholder="Zipcode"
                    value={filters.zipcode}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="form-group col-md-3">
                  <input
                    type="text"
                    id="area"
                    name="area"
                    className="form-control form-control-sm"
                    placeholder="Size (sq ft)"
                    value={filters.area}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
            </form>
          </div>
          {filteredProperties.length > 0 ? (
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
      <Footer />
    </>
  );
};

export default BuyProperty;
