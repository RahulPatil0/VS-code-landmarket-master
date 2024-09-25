import React, { useState, useContext, createContext, useEffect } from "react";
import parseJwt from "./ParseJwt";
import axios from "axios";


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
          const {userId, email, username, authorities } = data;
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

const  useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };