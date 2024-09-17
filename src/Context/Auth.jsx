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
          const { email, username, authorities } = data;
          return {
            userId: email || null,
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

  useEffect(() =>{
    const fetchUser = async () =>{
      const response = await axios.get(`http://localhost:8080/api/v1/user/${auth?.userId}`,{
        headers : {
          Authorization : auth?.token
        }
      });
      const data = response.data;
      setAuth({ ... auth, userId : data.id});
    }
    fetchUser();
  },[])

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