// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Check if user is authenticated based on token stored in localStorage
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Verify token or fetch user data
//       axios.get('http://localhost:8080/api/v1/user', {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(response => {
//         setIsAuthenticated(true);
//         setUser(response.data);
//       })
//       .catch(() => {
//         // Token invalid or user not authenticated
//         localStorage.removeItem('token');
//         setIsAuthenticated(false);
//         setUser(null);
//       });
//     }
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/v1/signIn', { email, password });
//       const { token, userData } = response.data;
      
//       localStorage.setItem('token', token);
//       setIsAuthenticated(true);
//       setUser(userData);
//     } catch (error) {
//       console.error('Login Error:', error);
//       throw new Error('Failed to login');
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import React, { useState, useContext, createContext } from "react";
import parseJwt from "../parseJwt";

const AuthContext = createContext();

// Move the isTokenExpired function above the AuthProvider
const isTokenExpired = (exp) => {
  if (!exp) return true;
  const currentTime = Math.floor(Date.now() / 1000);
  // console.log(exp < currentTime); 
  if(exp < currentTime){
    localStorage.setItem("token", "undefined");
  }
  return exp < currentTime;
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const token = localStorage.getItem("token");

      if (token && token !== "undefined") {
        const data = parseJwt(token);

        // console.log(data);
        if (data && !isTokenExpired(data.exp)) {
          const { userId, email, username, authorities } = data;
          return {
            userId: userId || null,
            email : email || null,
            token: token,
            username: username || null,
            role: authorities || null,
          };
        }
      }
      return null;
    } catch (error) {
      console.error("Error parsing JWT:", error);
      return null;
    }
  });

  const updateAuth = (newAuth) => {
    if (newAuth && newAuth.token) {
      try {
        localStorage.setItem("token", newAuth.token);
        setAuth(newAuth);
      } catch (error) {
        console.error("Error setting token in localStorage:", error);
      }
    } else {
      localStorage.removeItem("token");
      setAuth(null);
    }
  };

    return (
    <AuthContext.Provider value={[auth, updateAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

