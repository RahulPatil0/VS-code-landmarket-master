
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Searchbar.css';

const Searchbar = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    zipcode: '',
    city: '',
    state: ''
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
    navigate('/buy-property', { state: { filters } }); // Pass filters to the BuyProperty page
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar-title">Search Properties</div>
      <form className="searchbar-form">
        <input
          type="text"
          id="state"
          name="state"
          className="searchbar-input"
          placeholder="State"
          value={filters.state}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          id="city"
          name="city"
          className="searchbar-input"
          placeholder="City"
          value={filters.city}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          className="searchbar-input"
          placeholder="Zipcode"
          value={filters.zipcode}
          onChange={handleFilterChange}
        />
        <button
          type="button"
          className="searchbar-button"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
