import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import axios from "axios";
import { useAuth } from "../../Context/Auth";
import Layout from "../Layout/Layout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase";

const Profile = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const url = import.meta.env.VITE_LANDMARKET_URL;

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profilePic: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profilePic: null,
  });

  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null); // State to hold the uploaded file

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${url}/user/${auth?.email}`, {
          headers: {
            Authorization: auth?.token,
          },
        });
        const data = response.data;
        setUser(data);
        console.log(data);
        setFormData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth?.email, auth?.token, url]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(user);
    setFile(null); // Reset file input when canceling
  };

  const handleChange =async (e) => {
    if (e.target.name === "profilePic") {
      const file = e.target.files[0];
      await uploadProfilePicture(file);// Handle file input for profile picture
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response = await axios.put(`${url}/user/user-id/${auth?.userId}`, formData, {
        headers: {
          Authorization: auth?.token,
        },
      });

      if (response) {
        setUser(response.data); // Update the user state with new data
        setIsEditing(false);
        toast.success("Your profile has been updated successfully!");
        navigate("/profile");
      } else {
        console.error("Error updating user profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="profile-page-container">
        <div className="profile-card">
          <div className="profile-header">
            <h2>{isEditing ? "Edit Profile" : "Profile Overview"}</h2>
          </div>

          <div className="profile-content">
            <div className="profile-pic">
              <img
                src={
                  user.profilePic
                    ? user.profilePic
                    : "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"
                }
                alt="Profile"
              />
            </div>

            {!isEditing ? (
              <div className="profile-details">
                <h3>{user ? `${user.firstName} ${user.lastName}` : "User"}</h3>
                <p className="profile-email">
                  <strong>Email :</strong> {user.email || "N/A"}
                </p>
                <p className="profile-phoneNumber">
                  <strong>Mobile :</strong> {user.phoneNumber || "N/A"}
                </p>

                <button className="edit-btn" onClick={handleEdit}>
                  Edit Profile
                </button>

                {/* Add "View Your History" Button */}
                <button
                  className="history-btn"
                  onClick={() => navigate("/history")}
                >
                  View Your History
                </button>
              </div>
            ) : (
              <form className="edit-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="firstname">First Name:</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Last Name:</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number:</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="profilePic">Profile Picture:</label>
                  <input
                    type="file"
                    id="profilePic"
                    name="profilePic"
                    accept="image/*" // Restrict to image files
                    onChange={handleChange}
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="profile-save-btn">
                    Save
                  </button>

                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Profile;
