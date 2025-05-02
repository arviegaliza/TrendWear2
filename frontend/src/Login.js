import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Login.css';
import trendImage from './assets/trend.jpeg';
import wallpaper from './assets/background.jpeg';


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Apply fade-out effect before redirecting
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
      loginContainer.classList.add('fade-out');
    }

    try {
      const response = await axios.post('http://localhost:8081/login', formData);
      console.log('Login Response:', response);

      if (response.status === 200) {
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response) {
        if (error.response.status === 404) {
          setError('You need to sign up first!');
        } else if (error.response.status === 400) {
          setError('Incorrect email or password.');
        } else {
          setError('An error occurred. Please try again later.');
        }
      } else {
        setError('Server is unreachable.');
      }

      // Remove fade-out effect if login fails
      if (loginContainer) {
        loginContainer.classList.remove('fade-out');
      }
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
      {/* Left side: T-shirt animation */}
      <div className="left-side">
        <table className="tshirt-animation-table">
          <h2 className="trendwear-title">TrendWear Outfit Recommendation</h2>
          <p className="tagline">Where Style Meets Comfort, Curated Just for You!</p>
          <tr>
            <td>
              <img className="tshirt-animation" src={trendImage} alt="T-shirt Animation" />
            </td>
          </tr>
        </table>
      </div>

      {/* Right side: Login Form */}
      <div className="right-side">
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Email Field with Floating Label */}
          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="fas fa-envelope"></i></span>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email" className="floating-label">Enter Email</label>
          </div>

          {/* Password Field with Floating Label */}
          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="fas fa-lock"></i></span>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder=" "
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password" className="floating-label">Enter Password</label>
          </div>

          {/* Forgot Password Link */}
          <div className="mb-3 text-end">
            <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
          </div>

          {/* Display Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Login Button */}
          <button type="submit" className="custom-btn">
            <i className="fas fa-sign-in-alt"></i> <strong>Log in</strong>
          </button>

          {/* Create Account Button */}
          <Link to="/signup" className="btn btn-default w-100 text-decoration-none">
            <i className="fas fa-user-plus"></i> Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
