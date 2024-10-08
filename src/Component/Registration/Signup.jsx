// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Layout from '../Layout/Layout';
// import './Signup.css'; // Custom styling

// import axios from 'axios';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [error, setError] = useState('');
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [passwordError, setPasswordError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8080/api/v1/user/signUp", 
//         formData, 
//         {
//           headers: {
//             "Content-Type": "application/json",
//           }
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         setShowSuccess(true); // Show the success card and hide form
//       } else {
//         setError("Error in registration");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setError("Error occurred while creating user");
//     }
//   };

//   return (
//     <Layout>
//       <div className="signup-container-wide">
//         {showSuccess ? (
//           <div className="success-card">
//             <h1>Registration Successful!</h1>
//             <p>Welcome to LandMarket! Your account has been successfully created. You can now explore, buy, and sell land with ease.</p>
//             <button className="back-to-home-button" onClick={() => navigate('/')}>
//               Back to Home
//             </button>
//           </div>
//         ) : (
//           <div className="signup-form-container">
//             <h1 className="signup-title">Register</h1>
//             <form onSubmit={handleSubmit} className="signup-form-grid">
//               {/* Form fields */}
//               <div className="form-group">
//                 <label htmlFor="firstName">First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   className="form-control"
//                   id="firstName"
//                   required
//                   placeholder="Enter Firstname"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="lastName">Last Name</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   className="form-control"
//                   id="lastName"
//                   required
//                   placeholder="Enter Lastname"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">E-mail</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="form-control"
//                   id="email"
//                   required
//                   placeholder="Enter your email address"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="phoneNumber">Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     if (!value.startsWith('+91')) {
//                       handleChange({
//                         target: { name: 'phoneNumber', value: '+91' + value.replace(/^\+91/, '') }
//                       });
//                     } else {
//                       handleChange(e);
//                     }
//                   }}
//                   className="form-control"
//                   id="phoneNumber"
//                   pattern="^\+91[0-9]{10}$"
//                   required
//                   placeholder="Enter your phone number (e.g., +91 9876543210)"
//                   maxLength="13"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={(e) => {
//                     const { value } = e.target;
//                     setFormData({ ...formData, password: value });

//                     const hasUpperCase = /[A-Z]/.test(value);
//                     const hasLowerCase = /[a-z]/.test(value);
//                     const hasNumbers = /\d/.test(value);
//                     const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value);
//                     const isValidPassword = hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars && value.length >= 8;

//                     if (!isValidPassword) {
//                       setPasswordError("Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.");
//                     } else {
//                       setPasswordError("");
//                     }
//                   }}
//                   className="form-control"
//                   id="password"
//                   required
//                   placeholder="Enter your password"
//                 />
//                 {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="confirmPassword">Confirm Password</label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="form-control"
//                   id="confirmPassword"
//                   required
//                   placeholder="Confirm your password"
//                 />
//               </div>
//               <div className="button-container">
//                 <button type="submit" className="signup-button">
//                   Sign Up
//                 </button>
//               </div>
//               {error && <p className="error-message">{error}</p>}
//             </form>
//             <div className="signin-link">
//               Already a user? <a href="/signin">Sign In</a>
//             </div>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import './Signup.css'; // Custom styling
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase"; // Adjusting the path to reach Firebase.js
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    ProfilePic: '', // Added profilePic state
  });
  
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    await uploadProfilePicture(file); // Call the function to upload the file
  };

  const uploadProfilePicture = async (file) => {
    if (!file) return;

    const storageRef = ref(storage, `profile_pics/${file.name}`);
    try {
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);
      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      console.log("File available at", downloadURL);
      setFormData((prevData) => ({ ...prevData, profilePic: downloadURL })); // Update the profilePic in formData
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/v1/user/signUp", 
        formData, 
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        setShowSuccess(true); // Show the success card and hide form
      } else {
        setError("Error in registration");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error occurred while creating user");
    }
  };

  return (
    <Layout>
      <div className="signup-container-wide">
        {showSuccess ? (
          <div className="success-card">
            <h1>Registration Successful!</h1>
            <p>Welcome to LandMarket! Your account has been successfully created. You can now explore, buy, and sell land with ease.</p>
            <button className="back-to-home-button" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        ) : (
          <div className="signup-form-container">
            <h1 className="signup-title">Register</h1>
            <form onSubmit={handleSubmit} className="signup-form-grid">
              {/* Form fields */}
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-control"
                  id="firstName"
                  required
                  placeholder="Enter Firstname"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-control"
                  id="lastName"
                  required
                  placeholder="Enter Lastname"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  id="email"
                  required
                  placeholder="Enter your email address"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!value.startsWith('+91')) {
                      handleChange({
                        target: { name: 'phoneNumber', value: '+91' + value.replace(/^\+91/, '') }
                      });
                    } else {
                      handleChange(e);
                    }
                  }}
                  className="form-control"
                  id="phoneNumber"
                  pattern="^\+91[0-9]{10}$"
                  required
                  placeholder="Enter your phone number (e.g., +91 9876543210)"
                  maxLength="13"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    const { value } = e.target;
                    setFormData({ ...formData, password: value });

                    const hasUpperCase = /[A-Z]/.test(value);
                    const hasLowerCase = /[a-z]/.test(value);
                    const hasNumbers = /\d/.test(value);
                    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value);
                    const isValidPassword = hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars && value.length >= 8;

                    if (!isValidPassword) {
                      setPasswordError("Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.");
                    } else {
                      setPasswordError("");
                    }
                  }}
                  className="form-control"
                  id="password"
                  required
                  placeholder="Enter your password"
                />
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  id="confirmPassword"
                  required
                  placeholder="Confirm your password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="profilePic">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*" // Accept only image files
                  onChange={handleFileChange} // Call handleFileChange
                  className="form-control"
                  id="profilePic"
                />
              </div>
              <div className="button-container">
                <button type="submit" className="signup-button">
                  Sign Up
                </button>
              </div>
              {error && <p className="error-message">{error}</p>}
            </form>
            <div className="signin-link">
              Already a user? <a href="/signin">Sign In</a>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Signup;
