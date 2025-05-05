import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Login.css';

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/forgot-password', formData);

      if (response.status === 200) {
        alert('Password reset successful');
      } else {
        alert('Password reset failed. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('An error occurred. Please check your connection and try again.');
    }
  };

  return (
    <div className="wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3 className="signup-title">Reset Password</h3>

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
          <label htmlFor="email" className="floating-label">Enter Your Email</label>
        </div>

        {/* Current Password */}
        <div className="mb-3 input-group">
          <span className="input-group-text">
            <i className="fas fa-lock"></i>
          </span>
          <input
            type="password"
            id="currentPassword"
            className="form-control"
            placeholder=" "
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
          <label htmlFor="currentPassword" className="floating-label">Enter Current Password</label>
        </div>

        {/* New Password */}
        <div className="mb-3 input-group">
          <span className="input-group-text">
            <i className="fas fa-key"></i>
          </span>
          <input
            type="password"
            id="newPassword"
            className="form-control"
            placeholder=" "
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
          <label htmlFor="newPassword" className="floating-label">Enter New Password</label>
        </div>

        {/* Submit */}
        <button type="submit" className="custom-btn">
          <i className="fas fa-paper-plane"></i> Reset Password
        </button>

        {/* Back to Login */}
        <div className="text-center mt-2">
          <Link to="/" className="forgot-password-btn">
            <i className="fas fa-arrow-left"></i> Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
