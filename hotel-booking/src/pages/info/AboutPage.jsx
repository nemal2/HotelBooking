// src/pages/info/AboutPage.jsx
import { Link } from "react-router-dom";
import "./InfoPages.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="info-container">
        <h1>About Our Hotel</h1>
        
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Welcome to our luxury hotel, where comfort meets elegance. Established in 2010, 
            we have been providing exceptional hospitality services to guests from around the world.
            Our commitment to excellence and attention to detail has made us a preferred 
            destination for both business and leisure travelers.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We strive to create memorable experiences for our guests by offering personalized
            services, comfortable accommodations, and world-class amenities. Our dedicated team
            works tirelessly to ensure that every stay exceeds expectations.
          </p>
        </section>

        <section className="about-section">
          <h2>Amenities & Services</h2>
          <div className="amenities-list">
            <div className="amenity-item">
              <h3>Premium Rooms</h3>
              <p>Luxurious rooms designed for ultimate comfort with modern amenities.</p>
            </div>
            <div className="amenity-item">
              <h3>Fine Dining</h3>
              <p>Exquisite culinary experiences with diverse menu options.</p>
            </div>
            <div className="amenity-item">
              <h3>Wellness Center</h3>
              <p>State-of-the-art fitness center and spa services.</p>
            </div>
            <div className="amenity-item">
              <h3>Conference Facilities</h3>
              <p>Modern meeting spaces equipped with advanced technology.</p>
            </div>
          </div>
        </section>

        <div className="info-actions">
          <Link to="/contact" className="info-link">Contact Us</Link>
          <Link to="/home" className="info-link">Explore Rooms</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;