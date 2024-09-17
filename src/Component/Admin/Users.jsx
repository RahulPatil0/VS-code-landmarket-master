import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Users.css'; // Custom styles if needed

const Users = () => {
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        // Replace with your API endpoint for getting user count
const response = await axios.get('http://localhost:8080/api/v1/users');
        if (response.status === 200) {
          setUserCount(response.data.count); // Adjust based on your API response
        } else {
          setError('Failed to fetch user count.');
        }
      } catch (error) {
        setError('Error fetching user count.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  if (loading) {
    return <div className="users-container">Loading...</div>;
  }

  if (error) {
    return <div className="users-container">Error: {error}</div>;
  }

  return (
    <div className="users-container">
      <h1>Registered Users</h1>
      <div className="users-count">
        <p>Total Registered Users:</p>
        <h2>{userCount}</h2>
      </div>
    </div>
  );
};

export default Users;
