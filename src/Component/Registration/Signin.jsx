// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Layout from '../Layout/Layout';
// import './Signin.css'; // Add your custom styles
// import { useAuth } from '../../Context/Auth';
// import { useGoogleLogin } from '@react-oauth/google';
// import { toast, ToastContainer } from 'react-toastify';

// const Signin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const [auth,updateAuth]=useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8080/api/v1/user/signIn', { email, password });
//       if (response.status === 200) {
//         console.log(response);
//        window.alert("Logged in Successfully.");
//         const token = response.headers["access_token"];
//         localStorage.setItem("token", token);
//               // Update auth context state
//         updateAuth({
//           token: token,
//           username: "", 
//           role: "", 
//         });
//         setTimeout(() => {
//           setEmail(null);
//           setPassword(null);

//           navigate("/");
//         }, 3000);
//       } else if (response.status === 401) {
//        window.alert("Enter valid Credentials...!");

//       } else {
//         setError('Login failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setError('Invalid email or password. Please try again.');
//     }
//   };
  
//   const googleLogin = useGoogleLogin({
//     onSuccess: (codeResponse) => signWithGoogle(codeResponse),
//     onError: (error) => toast.error("Google login failed. Please try again."),
//   });

//   const signWithGoogle = async (codeResponse) => {
//     try {
//       const requestBody = {
//         accessToken: codeResponse?.access_token,
//       };
//       const response = await axios
//         .post(`http://localhost:8081/api/v1/user/signInWithGoogle`, requestBody)
//         .catch((err) => {
//           console.error(err);
//           toast.error("An error occurred during login. Please try again.");
//         });

//       if (response?.status === 200) {
//         console.log(response);
//         toast.success("Logged in Successfully.", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//         const token = response.headers["access_token"];
//         localStorage.setItem("token", token);
//         // Update auth context state
//         updateAuth({
//           token: token,
//           username: "",
//           role: "",
//         });
//         setTimeout(() => {
//           setUser(null);
//           navigate("/");
//         }, 3000);
//       } else if (response?.status === 401) {
//         toast.warning("Enter valid Credentials...!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }
//     } catch (error) {
//       toast.error("An error occurred during login. Please try again.");
//     }
//   };
//   const navigateToSignup = () => {
//     navigate('/signup');
//   };

//   return (
//     <Layout>
//       <section className="signin-section">
//         <div className="container d-flex justify-content-center align-items-center min-vh-100">
//           <div className="card shadow-lg rounded w-100 w-md-75 w-lg-50">
//             <div className="card-body p-4 p-md-5">
//               <h3 className="text-center mb-4">Log In</h3>
//               <form onSubmit={handleLogin}>
//                 <div className="form-group mb-3">
//                   <label htmlFor="email">Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     placeholder="name@example.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="form-group mb-3">
//                   <label htmlFor="password">Password</label>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     className="form-control"
//                     id="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 {error && (
//                   <div className="alert alert-danger mb-3">{error}</div>
//                 )}
//                 <button className="btn btn-primary w-100" type="submit">Log In</button>
//               </form>
//               <div className="d-flex justify-content-between mt-3">
//                 <a onClick={navigateToSignup} className="text-primary cursor-pointer">Create new account</a>
//                 <a href="#!" className="text-primary">Forgot password?</a>
//               </div>
//               <div className="text-center mt-4">
//                 <p>Or continue with</p>
//                 <button className="btn btn-outline-danger d-flex align-items-center justify-content-center w-100" onClick={() => googleLogin()}>
//                   <img src="/ggl.svg" className="google-logo me-2" width={20} alt="Google Logo" />
//                   Sign In with Google
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../Layout/Layout';
import './Signin.css'; // Add your custom styles
import { useAuth } from '../../Context/Auth';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Add toast styles

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showErrorImage, setShowErrorImage] = useState(false);
  const navigate = useNavigate();
  const [auth, updateAuth] = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/signIn', { email, password });
      if (response.status === 200) {
        console.log(response);
        // Show a success toast notification
        toast.success('Logged in Successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });

        const token = response.headers['access_token'];
        localStorage.setItem('token', token);

        // Update auth context state
        updateAuth({
          token: token,
          username: '',
          role: '',
        });

        setTimeout(() => {
          setEmail('');
          setPassword('');
          navigate('/');
        }, 3000);
      } else if (response.status === 401) {
        setShowErrorImage(true);
        toast.error('Login failed. Please check your credentials.');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setShowErrorImage(true); // Show error image instead of text
      toast.error('An error occurred during login.');
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => signWithGoogle(codeResponse),
    onError: () => toast.error('Google login failed. Please try again.'),
  });

  const signWithGoogle = async (codeResponse) => {
    try {
      const requestBody = {
        accessToken: codeResponse?.access_token,
      };
      const response = await axios.post(`http://localhost:8081/api/v1/user/signInWithGoogle`, requestBody).catch((err) => {
        console.error(err);
        toast.error('An error occurred during Google login. Please try again.');
      });

      if (response?.status === 200) {
        toast.success('Logged in Successfully via Google!', {
          position: 'top-right',
          autoClose: 3000,
        });

        const token = response.headers['access_token'];
        localStorage.setItem('token', token);

        // Update auth context state
        updateAuth({
          token: token,
          username: '',
          role: '',
        });

        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else if (response?.status === 401) {
        toast.warning('Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred during Google login.');
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
                {/* Show error image when login fails */}
                {showErrorImage && (
                  <div className="text-center mb-3">
                    <img
                      src="https://cdn.vectorstock.com/i/1000x1000/87/75/website-error-401-authorization-required-artwork-vector-23988775.jpg"
                      alt="401 Authorization Required"
                      className="img-fluid"
                    />
                  </div>
                )}
                <button className="btn btn-primary w-100" type="submit">
                  Log In
                </button>
              </form>
              <div className="d-flex justify-content-between mt-3">
                <a onClick={navigateToSignup} className="text-primary cursor-pointer">
                  Create new account
                </a>
                <a href="#!" className="text-primary">
                  Forgot password?
                </a>
              </div>
              <div className="text-center mt-4">
                <p>Or continue with</p>
                <button
                  className="btn btn-outline-danger d-flex align-items-center justify-content-center w-100"
                  onClick={() => googleLogin()}
                >
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
