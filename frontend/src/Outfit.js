import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

// Assets
import casualImage1 from './assets/Casual/shirt1.webp';
import casualImage2 from './assets/Casual/shirt2.webp';
import casualImage3 from './assets/Casual/shirt3.webp';
import casualImage4 from './assets/Casual/shirt4.webp';

import formalImage1 from './assets/Formal/formal1.webp';
import formalImage2 from './assets/Formal/formal2.webp';
import formalImage3 from './assets/Formal/formal3.webp';
import formalImage4 from './assets/Formal/formal4.webp';
import summerImage1 from './assets/Summer/summer1.webp';
import summerImage2 from './assets/Summer/summer2.webp';
import summerImage3 from './assets/Summer/summer3.webp';
import summerImage4 from './assets/Summer/summer4.webp';

function Outfit() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
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
        <div className="title">Outfit</div>

        {/* Show categories if none selected */}
        {selectedCategory === null && (
          <div className="table-container">
            <table>
              <tbody>
                <tr>
                  <td>
                    <img src={casualImage1} alt="Casual Outfit" className="category-image" />
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
          <button className="back-btn" onClick={() => setSelectedCategory(null)}>
            <i className="fas fa-arrow-left"></i>
          </button>
        )}

       {selectedCategory === 'casual' && (
  <div className="shirts-display">
    <h3>Casual Shirts</h3>
    <div className="shirt-images">
      <a href="https://ph.shp.ee/1fF53Fj" target="_blank" rel="noopener noreferrer">
        <img src={casualImage1} alt="Casual Shirt 1" className="shirt-image" />
        <p className="shirt-name">Women Casual Work Solid V-Neck Blouses</p>
      </a>
      <a href="https://ph.shp.ee/1fF53Fj" target="_blank" rel="noopener noreferrer">
        <img src={casualImage2} alt="Casual Shirt 2" className="shirt-image" />
        <p className="shirt-name">Women Vintage back waist Elastic Flared Pants  </p>
      </a>
      <a href="https://ph.shp.ee/1fF53Fj" target="_blank" rel="noopener noreferrer">
        <img src={casualImage3} alt="Casual Shirt 3" className="shirt-image" />
        <p className="shirt-name">Women Vintage Fashion Shrunken Pleats Lnatern Sleeves</p>
      </a>
      <a href="https://ph.shp.ee/1fF53Fj" target="_blank" rel="noopener noreferrer">
        <img src={casualImage4} alt="Casual Shirt 4" className="shirt-image" />
        <p className="shirt-name">Stylish V-Neck Summer Blouse</p>
      </a>
    </div>
  </div>
)}

{/* Formal Shirts */}
{selectedCategory === 'formal' && (
  <div className="shirts-display">
    <h3>Formal Shirts</h3>
    <div className="shirt-images">
      <a href="https://ph.shp.ee/VpUdgxX" target="_blank" rel="noopener noreferrer">
        <img src={formalImage1} alt="Formal Shirt 1" className="shirt-image" />
        <p className="shirt-name">Women Office Fashion Short Sleeve</p>
      </a>
      <a href="https://ph.shp.ee/VpUdgxX" target="_blank" rel="noopener noreferrer">
        <img src={formalImage2} alt="Formal Shirt 2" className="shirt-image" />
        <p className="shirt-name">Off-Shoulder Ruffle Midi Dress</p>
      </a>
      <a href="https://ph.shp.ee/VpUdgxX" target="_blank" rel="noopener noreferrer">
        <img src={formalImage3} alt="Formal Shirt 3" className="shirt-image" />
        <p className="shirt-name">Women's Long Sleeve Button Down Shirt</p>
      </a>
      <a
        href="https://ph.shp.ee/VpUdgxX" target="_blank" rel="noopener noreferrer">
        <img src={formalImage4} alt="Formal Shirt 4" className="shirt-image" />
        <p className="shirt-name">Women's Formal Solid Color Blouse</p>
      </a>
    </div>
  </div>
)}

        {/* Summer Shirts */}
        {selectedCategory === 'summer' && (
          <div className="shirts-display">
            <h3>Summer Shirts</h3>
            <div className="shirt-images">
              <a href="https://ph.shp.ee/VpUdgxX" target="_blank" rel="noopener noreferrer">
                <img src={summerImage1} alt="Summer Shirt 1" className="shirt-image" />
                  <p className="shirt-name">Women Boho Floral Flowers Dress</p>
              </a>
              <a href="https://ph.shp.ee/VpUdgxX" target="_blank" rel="noopener noreferrer">
                <img src={summerImage2} alt="Summer Shirt 2" className="shirt-image" />
                  <p className="shirt-name">Women Boho Tribal Print Smoked Tie Front Pattern Dress</p>

              </a>
              <a href="https://ph.shp.ee/VpUdgxX" target="_blank" rel="noopener noreferrer">
                <img src={summerImage3} alt="Summer Shirt 3" className="shirt-image" />
                  <p className="shirt-name">Women Modest Plain Tie Front Blouse </p>

              </a>
              <a href="https://ph.shp.ee/VpUdgxX" target="_blank" rel="noopener noreferrer">
                <img src={summerImage4} alt="Summer Shirt 4" className="shirt-image" />
                  <p className="shirt-name">Women Loose Summer O Neck Daily Sleeve</p>

              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Outfit;
