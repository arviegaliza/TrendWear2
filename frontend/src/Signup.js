import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Login.css';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:8081/signup', formData);

      if (response.status === 200) {
        alert('Signup successful');
        navigate('/'); // Redirect to login
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up:', error);

      if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred. Please check your connection and try again.');
      }
    }
  };

  return (
    <div className="wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3 className="signup-title">Sign Up</h3>

        {/* Error message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* Name */}
        <div className="mb-3 input-group">
          <span className="input-group-text">
            <i className="fas fa-user"></i>
          </span>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder=" "
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="name" className="floating-label">Enter Name</label>
        </div>

        {/* Email */}
        <div className="mb-3 input-group">
          <span className="input-group-text">
            <i className="fas fa-envelope"></i>
          </span>
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

        {/* Password */}
        <div className="mb-3 input-group">
          <span className="input-group-text">
            <i className="fas fa-lock"></i>
          </span>
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

        {/* Submit */}
        <button type="submit" className="custom-btn">
          <i className="fas fa-user-plus"></i> <strong>Sign Up</strong>
        </button>

        {/* Login link */}
        <Link to="/" className="btn btn-default text-decoration-none">
          <i className="fas fa-sign-in-alt"></i> Login
        </Link>
      </form>
    </div>
  );
}

export default Signup;
