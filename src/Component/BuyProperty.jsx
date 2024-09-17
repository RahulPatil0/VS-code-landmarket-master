
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BuyProperty.css'; // Import updated CSS file
import Header from '../Component/Layout/Header';
import Footer from '../Component/Layout/Footer';
import axios from 'axios';

const BuyProperty = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    zipcode: '',
    city: '',
    state: '',
    area: '',
  });

  const [showFullImage, setShowFullImage] = useState(false);
  const [currentFullImage, setCurrentFullImage] = useState('');
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8080/api/v1/property", {
          headers: {
            Authorization: token
          }
        });

        const data = response.data;
        console.log('Fetched data:', data);

        if (Array.isArray(data.body)) {
          const sortedProperties = data.body.map(property => ({
            ...property,
            currentImageIndex: 0 // Initialize image index
          })).sort(
            (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
          );
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

  useEffect(() => {
    const { zipcode, city, state, area } = filters;
    const filtered = properties.filter(
      (property) =>
        property.propertyStatus === 'Available' &&
        (zipcode ? property.propertyZipCode.includes(zipcode) : true) &&
        (city
          ? property.propertyCity.toLowerCase().includes(city.toLowerCase())
          : true) &&
        (state
          ? property.propertyState.toLowerCase().includes(state.toLowerCase())
          : true) &&
        (area ? property.propertySize.includes(area) : true)
    );
    setFilteredProperties(filtered);
  }, [filters, properties]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleViewDetails = (data) => {
    navigate(`/property/${data.id}`, { state: data });
  };

  const handleImageClick = (url) => {
    setCurrentFullImage(url);
    setShowFullImage(true);
  };

  const handleCloseFullImage = () => {
    setShowFullImage(false);
    setCurrentFullImage('');
  };

  const handlePrevImage = (index) => {
    setProperties(properties.map((property, i) => {
      if (i === index) {
        const newIndex = property.currentImageIndex === 0
          ? (property.propertyImages.length - 1)
          : property.currentImageIndex - 1;
        return {
          ...property,
          currentImageIndex: newIndex
        };
      }
      return property;
    }));
  };

  const handleNextImage = (index) => {
    setProperties(properties.map((property, i) => {
      if (i === index) {
        const newIndex = (property.currentImageIndex + 1) % property.propertyImages.length;
        return {
          ...property,
          currentImageIndex: newIndex
        };
      }
      return property;
    }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );
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

          <div className="filter-form-container mb-4 p-3 rounded shadow-sm">
            <h3 className="text-center">Filter Properties</h3>
            <form>
              <div className="form-row">
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
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
              <div
                className="col-md-4"
                key={index}
                onMouseEnter={() => setCurrentPropertyIndex(index)}
                onMouseLeave={() => setCurrentPropertyIndex(null)}
              >
                <div className="card mb-4 shadow-sm property-card">
                  <div className="image-container">
                    {item.propertyImages.length > 0 && (
                      <>
                        <button
                          className="carousel-button prev"
                          onClick={() => handlePrevImage(index)}
                        >
                          ❮
                        </button>
                        <img
                          src={item.propertyImages[item.currentImageIndex]?.url || ''}
                          alt={`Property Image ${item.currentImageIndex + 1}`}
                          className="property-image"
                          onClick={() => handleImageClick(item.propertyImages[item.currentImageIndex]?.url)}
                        />
                        <button
                          className="carousel-button next"
                          onClick={() => handleNextImage(index)}
                        >
                          ❯
                        </button>
                      </>
                    )}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.propertyCity}, {item.propertyState}
                    </h5>
                    <p className="card-text">
                      <strong>Zip Code:</strong> {item.propertyZipCode}
                    </p>
                    <p className="card-text">
                      <strong>Size:</strong> {item.propertySize} sq ft
                    </p>
                    <p className="card-text">
                      <strong>Status:</strong> {item.propertyStatus}
                    </p>
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
      {showFullImage && (
        <div className="image-modal" onClick={handleCloseFullImage}>
          <img src={currentFullImage} alt="Full Size" className="full-size-image" />
          <button className="back-button" onClick={handleCloseFullImage}>↩ Back</button>
        </div>
      )}
      <Footer />
    </>
  );
};

export default BuyProperty;
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './BuyProperty.css';
// import Header from '../Component/Layout/Header';
// import Footer from '../Component/Layout/Footer';
// import axios from 'axios';

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

//   const [showFullImage, setShowFullImage] = useState(false);
//   const [currentFullImage, setCurrentFullImage] = useState('');
//   const [currentPropertyIndex, setCurrentPropertyIndex] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProperties = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const response = await axios.get("http://localhost:8080/api/v1/property", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         const data = response.data;
//         console.log('Fetched data:', data);

//         if (Array.isArray(data.body)) {
//           const sortedProperties = data.body.map(property => ({
//             ...property,
//             currentImageIndex: 0 // Initialize image index
//           })).sort(
//             (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
//           );
//           setProperties(sortedProperties);
//           setFilteredProperties(sortedProperties);
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

//   useEffect(() => {
//     const { zipcode, city, state, area } = filters;
//     const filtered = properties.filter(
//       (property) =>
//         property.propertyStatus === 'Available' &&
//         (zipcode ? property.propertyZipCode.includes(zipcode) : true) &&
//         (city
//           ? property.propertyCity.toLowerCase().includes(city.toLowerCase())
//           : true) &&
//         (state
//           ? property.propertyState.toLowerCase().includes(state.toLowerCase())
//           : true) &&
//         (area ? property.propertySize.includes(area) : true)
//     );
//     setFilteredProperties(filtered);
//   }, [filters, properties]);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({
//       ...filters,
//       [name]: value,
//     });
//   };

//   const handleViewDetails = async (data) => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/v1/contact-owners', payload, {
//           headers: {
//               Authorization: token
//           }
//       });
      

//       if (response.status === 200) {
//         setProperties(properties.filter(property => property.id !== data.id));
//         setFilteredProperties(filteredProperties.filter(property => property.id !== data.id));
//         alert('Property purchased and removed from the list.');
//         navigate(`/property/${data.id}`, { state: data });
//       }
//     } catch (error) {
//       console.error('Error purchasing property:', error);
//       alert('Failed to purchase property.');
//     }
//   };

//   const handleImageClick = (url) => {
//     setCurrentFullImage(url);
//     setShowFullImage(true);
//   };

//   const handleCloseFullImage = () => {
//     setShowFullImage(false);
//     setCurrentFullImage('');
//   };

//   const handlePrevImage = (index) => {
//     setProperties(properties.map((property, i) => {
//       if (i === index) {
//         const newIndex = property.currentImageIndex === 0
//           ? (property.propertyImages.length - 1)
//           : property.currentImageIndex - 1;
//         return {
//           ...property,
//           currentImageIndex: newIndex
//         };
//       }
//       return property;
//     }));
//   };

//   const handleNextImage = (index) => {
//     setProperties(properties.map((property, i) => {
//       if (i === index) {
//         const newIndex = (property.currentImageIndex + 1) % property.propertyImages.length;
//         return {
//           ...property,
//           currentImageIndex: newIndex
//         };
//       }
//       return property;
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loader"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <>
//       <Header />
//       <div className="container mt-4">
//         <div className="row">
//           <h1 className="text-center">Properties for Sale</h1>

//           <div className="filter-form-container mb-4 p-3 rounded shadow-sm">
//             <h3 className="text-center">Filter Properties</h3>
//             <form>
//               <div className="form-row">
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     id="state"
//                     name="state"
//                     className="form-control form-control-sm"
//                     placeholder="State"
//                     value={filters.state}
//                     onChange={handleFilterChange}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     id="city"
//                     name="city"
//                     className="form-control form-control-sm"
//                     placeholder="City"
//                     value={filters.city}
//                     onChange={handleFilterChange}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     id="zipcode"
//                     name="zipcode"
//                     className="form-control form-control-sm"
//                     placeholder="Zipcode"
//                     value={filters.zipcode}
//                     onChange={handleFilterChange}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     id="area"
//                     name="area"
//                     className="form-control form-control-sm"
//                     placeholder="Size (sq ft)"
//                     value={filters.area}
//                     onChange={handleFilterChange}
//                   />
//                 </div>
//               </div>
//             </form>
//           </div>

//           {filteredProperties.length > 0 ? (
//             filteredProperties.map((item, index) => (
//               <div
//                 className="col-md-4"
//                 key={index}
//                 onMouseEnter={() => setCurrentPropertyIndex(index)}
//                 onMouseLeave={() => setCurrentPropertyIndex(null)}
//               >
//                 <div className="card mb-4 shadow-sm property-card">
//                   <div className="image-container">
//                     {item.propertyImages.length > 0 && (
//                       <>
//                         <button
//                           className="carousel-button prev"
//                           onClick={() => handlePrevImage(index)}
//                         >
//                           ❮
//                         </button>
//                         <img
//                           src={item.propertyImages[item.currentImageIndex]?.url || ''}
//                           alt={`Property Image ${item.currentImageIndex + 1}`}
//                           className="property-image"
//                           onClick={() => handleImageClick(item.propertyImages[item.currentImageIndex]?.url)}
//                         />
//                         <button
//                           className="carousel-button next"
//                           onClick={() => handleNextImage(index)}
//                         >
//                           ❯
//                         </button>
//                       </>
//                     )}
//                   </div>
//                   <div className="card-body">
//                     <h5 className="card-title">
//                       {item.propertyCity}, {item.propertyState}
//                     </h5>
//                     <p className="card-text">
//                       <strong>Zip Code:</strong> {item.propertyZipCode}
//                     </p>
//                     <p className="card-text">
//                       <strong>Size:</strong> {item.propertySize} sq ft
//                     </p>
//                     <p className="card-text">
//                       <strong>Status:</strong> {item.propertyStatus}
//                     </p>
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
//       {showFullImage && (
//         <div className="image-modal" onClick={handleCloseFullImage}>
//           <img src={currentFullImage} alt="Full Size" className="full-size-image" />
//           <button className="back-button" onClick={handleCloseFullImage}>↩ Back</button>
//         </div>
//       )}
//       <Footer />
//     </>
//   );
// };

// export default BuyProperty;
