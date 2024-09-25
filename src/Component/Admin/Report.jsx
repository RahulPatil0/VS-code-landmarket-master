import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';

import './Report.css';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const Report = () => {
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data function
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch properties
      const propertiesResponse = await axios.get('http://localhost:8080/api/v1/property', {
        headers: { Authorization: token },
      });
      setProperties(propertiesResponse.data);

      // Fetch users
      const usersResponse = await axios.get('http://localhost:8080/api/v1/user', {
        headers: { Authorization: token },
      });
      setUsers(usersResponse.data);
    } catch (error) {
      setError('Error fetching report data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 10 seconds (or your preferred interval)
    }, 10000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  if (loading) return <div className="text-center mt-4">Loading report...</div>;
  if (error) return <div className="text-center text-danger mt-4">{error}</div>;

  // Data for pie chart
  const propertyStatusCount = properties.reduce((acc, property) => {
    acc[property.propertyStatus] = (acc[property.propertyStatus] || 0) + 1;
    return acc;
  }, {});

  const userRoleCount = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  // Updated colors for better visibility
  const propertyColors = ['#4BC0C0', '#FFCE56', '#36A2EB', '#FF9F40', '#9966FF', '#FF6384'];
  const userColors = ['#FFA07A', '#20B2AA', '#FFD700', '#B0E0E6', '#9370DB', '#FF6347'];

  const propertyData = {
    labels: Object.keys(propertyStatusCount),
    datasets: [{
      data: Object.values(propertyStatusCount),
      backgroundColor: propertyColors,
      hoverBackgroundColor: propertyColors
    }]
  };

  const userData = {
    labels: Object.keys(userRoleCount),
    datasets: [{
      data: Object.values(userRoleCount),
      backgroundColor: userColors,
      hoverBackgroundColor: userColors
    }]
  };

  return (
    <div className="report-container mt-4">
      <h1 className="report-title text-center mb-4">Report Summary</h1>

      <div className="summary-section d-flex justify-content-around">
        <div className="properties-summary">
          <h2>Properties Summary</h2>
          <Pie data={propertyData} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false, // Hide built-in legend
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`
                }
              }
            }
          }} height={300} />
          
          {/* Custom Legend for Property Status */}
          <div className="custom-legend">
            <h3>Property Status Legend:</h3>
            {Object.keys(propertyStatusCount).map((status, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 20, height: 20, backgroundColor: propertyColors[index], marginRight: 10 }}></div>
                <span>{status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="users-summary">
          <h2>Users Summary</h2>
          <Pie data={userData} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false, // Hide built-in legend
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`
                }
              }
            }
          }} height={300} />
          
          {/* Custom Legend for User Roles */}
          <div className="custom-legend">
            <h3>User Roles Legend:</h3>
            {Object.keys(userRoleCount).map((role, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 20, height: 20, backgroundColor: userColors[index], marginRight: 10 }}></div>
                <span>{role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
