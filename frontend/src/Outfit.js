import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Assets
import casualImage from './assets/casual/shirt1.png';
import casualShirt2 from './assets/casual/shirt2.png';
import casualShirt3 from './assets/casual/shirt3.png';
import casualShirt4 from './assets/casual/shirt4.png';
import formalImage1 from './assets/formal/formal1.png';
import formalImage2 from './assets/formal/formal2.png';
import formalImage3 from './assets/formal/formal3.png';
import formalImage4 from './assets/formal/formal4.png';
import summerImage1 from './assets/summer/summer1.png';
import summerImage2 from './assets/summer/summer2.png';
import summerImage3 from './assets/summer/summer3.png';
import summerImage4 from './assets/summer/summer4.png';

function Outfit() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [titleVisible, setTitleVisible] = useState(true); // NEW state
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleCategorySelect = (category) => {
    // First trigger fade-out
    setTitleVisible(false);
    // After fade-out completes, set the category
    setTimeout(() => {
      setSelectedCategory(category);
    }, 500); // Match the transition time in CSS
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setTimeout(() => {
      setTitleVisible(true); // Fade title back in
    }, 0); // Instant re-show; fade handled via CSS
  };

  return (
    <div className="outfit-page">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          <i className="fas fa-times"></i>
        </button>
        <ul>
          <li>
            <Link to="/home">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
        </ul>
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

      {/* Content */}
      <div className="container">
        <div className={`title ${!titleVisible ? 'fade-out' : ''}`}>Outfit</div>

        {/* Show categories if none selected */}
        {selectedCategory === null && (
          <div className="table-container">
            <table>
              <tbody>
                <tr>
                  <td>
                    <img src={casualImage} alt="Casual Outfit" className="category-image" />
                    <button className="casual" onClick={() => handleCategorySelect('casual')}>
                      CASUAL
                    </button>
                  </td>
                  <td>
                    <img src={formalImage1} alt="Formal Outfit" className="category-image" />
                    <button className="formal" onClick={() => handleCategorySelect('formal')}>
                      FORMAL
                    </button>
                  </td>
                  <td>
                    <img src={summerImage1} alt="Summer Outfit" className="category-image" />
                    <button className="summer" onClick={() => handleCategorySelect('summer')}>
                      SUMMER
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Back Button */}
        {selectedCategory && (
          <button className="back-btn" onClick={handleBack}>
            <i className="fas fa-arrow-left"></i>
          </button>
        )}

        {/* Casual Shirts */}
        {selectedCategory === 'casual' && (
          <div className="shirts-display">
            <h3>Casual Shirts</h3>
            <div className="shirt-images">
              <a href="https://shopee.ph" target="_blank" rel="noopener noreferrer">
                <img src={casualImage} alt="Casual Shirt 1" className="shirt-image" />
              </a>
              <a href="https://shopee.ph" target="_blank" rel="noopener noreferrer">
                <img src={casualShirt2} alt="Casual Shirt 2" className="shirt-image" />
              </a>
              <a href="https://shopee.ph" target="_blank" rel="noopener noreferrer">
                <img src={casualShirt3} alt="Casual Shirt 3" className="shirt-image" />
              </a>
              <a href="https://shopee.ph" target="_blank" rel="noopener noreferrer">
                <img src={casualShirt4} alt="Casual Shirt 4" className="shirt-image" />
              </a>
            </div>
          </div>
        )}

        {/* Formal Shirts */}
        {selectedCategory === 'formal' && (
          <div className="shirts-display">
            <h3>Formal Shirts</h3>
            <div className="shirt-images">
              <a href="https://shopee.ph" target="_blank" rel="noopener noreferrer">
                <img src={formalImage1} alt="Formal Shirt 1" className="shirt-image" />
              </a>
              <a href="https://shopee.ph" target="_blank" rel="noopener noreferrer">
                <img src={formalImage2} alt="Formal Shirt 2" className="shirt-image" />
              </a>
              <a href="https://shopee.ph" target="_blank" rel="noopener noreferrer">
                <img src={formalImage3} alt="Formal Shirt 3" className="shirt-image" />
              </a>
              <a href="https://shopee.ph" target="_blank" rel="noopener noreferrer">
                <img src={formalImage4} alt="Formal Shirt 4" className="shirt-image" />
              </a>
            </div>
          </div>
        )}

        {/* Summer Shirts */}
        {selectedCategory === 'summer' && (
          <div className="shirts-display">
            <h3>Summer Shirts</h3>
            <div className="shirt-images">
              <a href="https://shopee.ph" target="_blank" rel="noopener noreferrer">
                <img src={summerImage1} alt="Summer Shirt 1" className="shirt-image" />
              </a>
              <a href="https://shopee.ph" target="_blank" rel="noopener noreferrer">
                <img src={summerImage2} alt="Summer Shirt 2" className="shirt-image" />
              </a>
              <a href="https://shopee.ph" target="_blank" rel="noopener noreferrer">
                <img src={summerImage3} alt="Summer Shirt 3" className="shirt-image" />
              </a>
              <a href="https://shopee.ph" target="_blank" rel="noopener noreferrer">
                <img src={summerImage4} alt="Summer Shirt 4" className="shirt-image" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Outfit;
