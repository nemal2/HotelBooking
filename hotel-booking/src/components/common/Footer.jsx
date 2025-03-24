// src/components/common/Footer.jsx
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Hotel Booking</h3>
          <p>Your perfect stay is just a click away.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/my-bookings">My Bookings</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@hotelbooking.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 123 Hotel Street, City, Country</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Hotel Booking. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;