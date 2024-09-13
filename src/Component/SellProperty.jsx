import React, { useState } from 'react';
import axios from 'axios';
import './SellProperty.css';
import Layout from './Layout/Layout';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../Firebase';

const SellProperty = () => {
  const [formData, setFormData] = useState({
    propertyAddress: '',
    propertyCity: '',
    propertySize: '',
    propertyStatus: '',
    propertyState: '',
    propertyPrice: '',
    propertyZipCode: '',
    propertyImages: []
  });

  const [info, setInfo] = useState('');
  const [indicator, setIndicator] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleZipCodeChange = (e) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      propertyZipCode: value
    }));

    // ZIP code validation for 6 digits
    const codelength = /^\d{6}$/;
    if (value.match(codelength)) {
      axios.get(`https://api.postalpincode.in/pincode/${value}`)
        .then(response => {
          if (response.data[0].Status === 'Success' && response.data[0].PostOffice.length > 0) {
            const postOffice = response.data[0].PostOffice[0];
            setFormData(prevState => ({
              ...prevState,
              propertyState: postOffice.State,
              propertyCity: postOffice.District
            }));
            setInfo(`Area: ${postOffice.Name}`);
            setIndicator('ri-checkbox-circle-fill');
          } else {
            setInfo('Invalid ZIP Code');
            setIndicator('ri-close-circle-fill');
          }
        })
        .catch(error => {
          console.error("Error fetching ZIP code data:", error);
          setInfo('Error occurred');
          setIndicator('ri-close-circle-fill');
        });
    } else {
      setInfo('Type valid ZIP Code');
      setIndicator('ri-close-circle-fill');
    }
  };

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setFormData(prevState => ({
  //     ...prevState,
  //     propertyImages: files
  //   }));

  //   const previews = files.map(file => URL.createObjectURL(file));
  //   setImagePreviews(previews);
  // };
  const handleImageChange = async (e) => {
    try {
      const files = Array.from(e.target.files);
      const images = [];

      for(let i=0;i<files.length;i++){
        const obj = {}
        obj.url = await uploadProfilePicture(files[i]);
        images.push(obj);
      }
      setFormData({ ...formData, propertyImages: images });
    } catch (error) {
      console.log(error);
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
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data submitted:", formData);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://localhost:8080/api/v1/property/user-id/1553', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',Authorization:token },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Property registered successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error in registration: ${errorData.message || 'Unknown error occurred'}`);
      }
    } catch (error) {
      alert('Network error. Please try again later.');
    }
  };

  return (
    <Layout showFooter={true}>
      <div className="sell-property-container">
        <div className="sell-property-form-container">
          <h1 className="sell-property-header">Register your property for sale</h1>
          <form className="sell-property-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="propertyZipCode">Zip Code</label>
              <input
                type="text"
                name="propertyZipCode"
                value={formData.propertyZipCode}
                onChange={handleZipCodeChange}
                className="form-control"
                id="propertyZipCode"
                required
                placeholder="Enter your Zipcode"
              />
              <div className="info">{info}</div>
              <div className={`indicator ${indicator}`}></div>
            </div>

            <div className="form-group">
              <label htmlFor="propertyCity">City</label>
              <input
                type="text"
                name="propertyCity"
                className="form-control"
                value={formData.propertyCity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="propertyState">State</label>
              <input
                type="text"
                name="propertyState"
                className="form-control"
                value={formData.propertyState}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="propertyAddress">Address</label>
              <input
                type="text"
                name="propertyAddress"
                className="form-control"
                value={formData.propertyAddress}
                onChange={handleChange}
                required
                placeholder="Enter property address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="propertySize">Size</label>
              <input
                type="number"
                name="propertySize"
                className="form-control"
                value={formData.propertySize}
                onChange={handleChange}
                required
                placeholder="Enter property size (in sqft)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="propertyPrice">Price</label>
              <input
                type="number"
                name="propertyPrice"
                className="form-control"
                value={formData.propertyPrice}
                onChange={handleChange}
                required
                placeholder="Enter property price"
              />
            </div>

            <div className="form-group">
              <label htmlFor="propertyStatus">Status</label>
              <select
                name="propertyStatus"
                className="form-control"
                value={formData.propertyStatus}
                onChange={handleChange}
                required
              >
                <option value="">Select status</option>
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="propertyImages">Upload Property Images</label>
              <input
                type="file"
                name="propertyImages"
                className="form-control"
                multiple
                onChange={handleImageChange}
              />
              <div className="image-previews">
                {imagePreviews.map((preview, index) => (
                  <img key={index} src={preview} alt={`Preview ${index + 1}`} className="preview-image" />
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SellProperty;
