// src/components/common/Navbar.jsx - Improved
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => navigate('/home')}>
          <h1 className="brand-name">Hotel Booking</h1>
        </div>
        
        <div className="navbar-links">
          <a className="nav-link" onClick={() => navigate("/home")}>Home</a>
          <a className="nav-link" onClick={() => navigate("/rooms")}>Rooms</a>
          <a className="nav-link" onClick={() => navigate("/about")}>About</a>
          <a className="nav-link" onClick={() => navigate("/contact")}>Contact</a>
        </div>
        
        <div className="navbar-actions">
          {currentUser ? (
            <>
              <a className="btn profile-btn" onClick={() => navigate("/my-bookings")}>My Bookings</a>
              <a className="btn profile-btn" onClick={() => navigate("/profile")}>Profile</a>
              <a className="btn logout-btn" onClick={handleLogout}>Logout</a>
            </>
          ) : (
            <>
              <a className="btn login-btn" onClick={() => navigate("/login")}>Login</a>
              <a className="btn signup-btn" onClick={() => navigate("/signup")}>Signup</a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;