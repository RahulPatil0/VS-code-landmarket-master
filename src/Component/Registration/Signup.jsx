import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import './Signup.css'; // Assuming you'll use this for custom styling

const Signup = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    country: '',
    state: '',
    city: '',
    area: '',
    zipCode: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerResponse = await fetch('http://localhost:8080/api/v1/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (registerResponse.ok) {
        console.log('Registration successful:', registerResponse);
        
        const loginResponse = await fetch('http://localhost:8080/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          localStorage.setItem('authToken', loginData.token);
          localStorage.setItem('userId', loginData.user.id);

          onRegister(true);

          navigate('/sell-property');
        } else {
          const loginErrorData = await loginResponse.json();
          setError('Error in login: ' + loginErrorData.message);
        }
      } else {
        const registerErrorData = await registerResponse.json();
        console.error('Error in registration:', registerErrorData);
        setError('Error in registration: ' + registerErrorData.message);
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('Network error. Please try again later.');
    }
  };

  return (
    <Layout>
      <div className="signup-container-wide">
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
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                id="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="form-control"
                id="phoneNumber"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-control"
                id="country"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-control"
                id="state"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-control"
                id="city"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="area">Area</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="form-control"
                id="area"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="form-control"
                id="zipCode"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                id="password"
                required
              />
            </div>
            {error && (
              <div className="form-group">
                <div className="alert alert-danger">{error}</div>
              </div>
            )}
            <button type="submit" className="btn btn-primary mt-2 signup-button">
              Register
            </button>
          </form>
          <div className="signin-link">
            Already have an account? <a href="/signin">Sign In</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
