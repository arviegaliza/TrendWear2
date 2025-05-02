import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import './Login.css'; // Ensure CSS is linked
import logoImage from './assets/logo.png'; // Ensure the correct path
import { Link } from 'react-router-dom';
function Home() {
  const [showPopup, setShowPopup] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigateToPreferences, setNavigateToPreferences] = useState(false);
  const navigate = useNavigate(); // React Router navigation

  const handleLogout = () => {
 
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="home-page">
     
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          <i className="fas fa-times"></i> {/* Close Icon */}
        </button>
        <ul>
          <li>
              <Link to="/home"><i className="fas fa-home"></i> Home</Link>
            </li>
              <li>
               <Link to="/outfit"><i className="fas fa-tshirt"></i> Categories</Link>
              </li>
          </ul>


        {/* Logout Button at the Bottom */}
        <div className="logout-container">
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      {/* Menu Button */}
      <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
        <i className="fas fa-bars"></i>
      </button>

      {/* Logo */}
      <div className={`logo ${navigateToPreferences ? 'move-top-right' : ''}`}>
        <img src={logoImage} alt="TrendWear Logo" />
      </div>

      {/* Welcome Popup */}
      {showPopup && !navigateToPreferences && <div className="popup">Step into Style!</div>}

      
    </div>
  );
} 
export default Home;