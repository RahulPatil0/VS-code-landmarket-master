// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Updated hook
// import './UniqueSearchbar.css'; // Ensure this CSS file includes the necessary styles

// const Searchbar = () => {
//   const [state, setState] = useState('');
//   const [city, setCity] = useState('');
//   const [zipcode, setZipcode] = useState('');
//   const navigate = useNavigate(); // Updated hook for navigation

//   const handleSearch = () => {
//     // Redirect to the properties page with search parameters
//     navigate(`/properties-page?state=${state}&city=${city}&zipcode=${zipcode}`);
//   };

//   return (
//     <div className="unique-searchbar-container1 d-flex vh-100">
//       <div className="unique-searchbar-inner-container1 container">
//         <div className="unique-searchbar-card card p-4">
//           <h5 className="unique-searchbar-title text-center">Find Your Perfect Property</h5>
//           <div className="row g-3 mt-3">
//             <div className="col-md-4">
//               <input
//                 type="text"
//                 className="unique-searchbar-input form-control"
//                 placeholder="State"
//                 value={state}
//                 onChange={(e) => setState(e.target.value)}
//               />
//             </div>
//             <div className="col-md-4">
//               <input
//                 type="text"
//                 className="unique-searchbar-input form-control"
//                 placeholder="City"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//               />
//             </div>
//             <div className="col-md-4">
//               <input
//                 type="text"
//                 className="unique-searchbar-input form-control"
//                 placeholder="Zipcode"
//                 value={zipcode}
//                 onChange={(e) => setZipcode(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="d-flex justify-content-center mt-4">
//             <button className="unique-searchbar-button btn btn-primary" onClick={handleSearch}>
//               Search
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Searchbar;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const [properties, setProperties] = useState([]);
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
        } else {
          throw new Error('Data format is incorrect');
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSearch = () => {
    const { zipcode, city, state, area } = filters;
    const filtered = properties.filter(property =>
      (zipcode ? property.propertyZipCode?.includes(zipcode) : true) &&
      (city ? property.propertyCity?.toLowerCase().includes(city.toLowerCase()) : true) &&
      (state ? property.propertyState?.toLowerCase().includes(state.toLowerCase()) : true) &&
      (area ? property.propertySize?.includes(area) : true)
    );

    // Navigate to the FilteredPropertiesPage and pass filtered properties as state
    navigate('/filtered-properties', { state: { filteredProperties: filtered } });
  };

  return (
    <>
      <div className="container mt-4">
        <h1 className="text-center">Properties for Sale</h1>

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
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
