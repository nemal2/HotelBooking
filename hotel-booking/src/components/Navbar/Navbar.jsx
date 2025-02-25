import { Navigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <img src="src/assets/logo.png" alt="Hotel Logo" className="logo-image" />
          <span className="brand-name">Luxury Stays</span>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          <a href="#help" className="nav-link">Help</a>
          <a href="#contact" className="nav-link">Contact</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#career" className="nav-link">Career</a>
        </div>

        {/* Authentication Buttons */}
        <div className="navbar-actions">
          <a href="/login" onClick={() => Navigate("/login")} className="btn login-btn">Login</a>
          <a href="/signup" className="btn signup-btn" onClick={() => Navigate("/signup")}>Signup</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
