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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/signIn', { email, password });
      if (response.status === 200) {
        console.log(response);
        localStorage.setItem('token', response.headers["access_token"]);
        navigate('/dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password. Please try again.');
    }
  };
  const handleGoogleSignIn = () => {
    try {
        const signInURL = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fv1%2Fuser%2FsignInWithGoogle&response_type=code&client_id=644460565611-35m3nstu3qapb88jh7msiklb4vmsl6n8.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&access_type=offline";
        const signInWindow = window.open(
            signInURL,
            "google login",
            "toolbar=no, menubar=no, width=700, height=700, top=100, left=300"
        );
  
        if (signInWindow) {
            const interval = setInterval(() => {
                if (signInWindow.closed) {
                    clearInterval(interval);
                    navigate('/about');
                }
            }, 1000);
        }
  
    } catch (error) {
        console.error('Error during Google sign-in:', error);
        window.alert('An error occurred during Google sign-in. Please try again.');
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
                <button className="btn btn-outline-danger d-flex align-items-center justify-content-center w-100" onClick={handleGoogleSignIn}>
                  <img src="/ggl.svg" className="google-logo me-2" width={20} alt="Google Logo" />
                  Sign In with Google
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
