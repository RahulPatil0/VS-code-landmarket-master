import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../Layout/Layout';
import './Signin.css'; // Add your custom styles

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Google sign in
  const signInWithGoogle = () => {
    window.open(
      "http://localhost:8080/realms/LANDMARKET/protocol/openid-connect/auth?response_type=code&client_id=LMFE&kc_idp_hint=google",
      "google login",
      "toolbar=no, menubar=no, width=700, height=700, top=100, left=300"
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userId', response.data.user.id);
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <Layout>
      <section className="signin-section">
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className="card shadow-lg rounded w-100 w-md-75 w-lg-50">
            <div className="card-body p-4 p-md-5">
              <h3 className="text-center mb-4">Log In</h3>
              <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
              
                </div>
                {error && (
                  <div className="alert alert-danger mb-3">{error}</div>
                )}
                <button className="btn btn-primary w-100" type="submit">Log In</button>
              </form>
              <div className="d-flex justify-content-between mt-3">
                <a onClick={navigateToSignup} className="text-primary cursor-pointer">Create new account</a>
                <a href="#!" className="text-primary">Forgot password?</a>
              </div>
              <div className="text-center mt-4">
                <p>Or continue with</p>
                <button className="btn btn-outline-danger d-flex align-items-center justify-content-center w-100" onClick={signInWithGoogle}>
                  <i className="bi bi-google me-2"></i> Sign In with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Signin;
