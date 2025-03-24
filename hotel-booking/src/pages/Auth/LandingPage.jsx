import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Luxury Hotel</h1>
          <p>Experience the ultimate comfort and luxury during your stay</p>
          <div className="hero-buttons">
            <Link to="/login">
              <button className="primary-btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="secondary-btn">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;