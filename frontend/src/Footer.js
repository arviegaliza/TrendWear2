import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import './Login.css'; 
function Footer() {
  return (
    <div className="footer">
      <table className="footer-table">
        <tbody>
          <tr>
            <td className="footer-item">
              <i className="fas fa-cogs"></i> Services
            </td>
            <td className="footer-item">
              <i className="fas fa-phone-alt"></i> Contact Number
            </td>
            <td className="footer-item">
              <i className="fas fa-envelope"></i> Email Address
            </td>
          </tr>
          <tr>
            <td className="footer-item">
              Web Development
            </td>
            <td className="footer-item">
              +639 5082 1323    
              </td>
            <td className="footer-item">
              trendwear@gmail.com
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Footer;
