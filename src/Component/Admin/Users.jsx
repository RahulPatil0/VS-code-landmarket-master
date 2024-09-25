// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../../Context/Auth';
// // import './Users.css'; // Custom styles if needed

// const Users = () => {
//   const [userCount, setUserCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const[auth]=useAuth();

//   useEffect(() => {
//     const fetchUserCount = async () => {
//       try {
//         const token=localStorage.getItem("token");
//         // Replace with your API endpoint for getting user count
//         const response = await axios.get('http://localhost:8080/api/v1/user',{
//           headers : {
//             Authorization : auth?.token
//           }
//         });
        
//         if (response.status === 200) {
//           console.log(response.data);
//           setUserCount(response.data.length); // Adjust based on your API response
//         } else {
//           setError('Failed to fetch user count.');
//         }
//       } catch (error) {
//         setError('Error fetching user count.');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserCount();
//   }, []);

//   if (loading) {
//     return <div className="users-container">Loading...</div>;
//   }

//   if (error) {
//     return <div className="users-container">Error: {error}</div>;
//   }

//   return (
//     <div className="users-container">
//       <h1>Registered Users</h1>
//       <div className="users-count">
//         <p>Total Registered Users:</p>
//         <h2>{userCount}</h2>
//       </div>
//     </div>
//   );
// };

// export default Users;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome Icons
import './Users.css'; // Your custom styles

const Users = () => {
  const [users, setUsers] = useState([]); // Store user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useAuth();

  // Function to fetch all users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token") || auth?.token; // Get the token from local storage or auth context
      const response = await axios.get('http://localhost:8080/api/v1/user', {
        headers: {
          Authorization: token, // Add token as a Bearer token in the header
        },
      });

      if (response.status === 200) {
        setUsers(response.data); // Set the response data to the users state
      } else {
        setError('Failed to fetch user data.');
      }
    } catch (error) {
      setError('Error fetching user data.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  // Function to delete a user
  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token") || auth?.token; // Get the token
      if (window.confirm('Are you sure you want to delete this user?')) {
        await axios.delete(`http://localhost:8080/api/v1/user/${userId}`, {
          headers: {
            Authorization: token, // Add token as a Bearer token in the header
          },
        });
        alert('User deleted successfully');
        fetchUsers(); // Refresh the users list after deletion
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) {
    return <div className="users-container">Loading...</div>;
  }

  if (error) {
    return <div className="users-container">Error: {error}</div>;
  }

  return (
    <div className="container my-5 container-box">
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    <button 
                      className="btn icon-btn" 
                      onClick={() => deleteUser(user.id)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
