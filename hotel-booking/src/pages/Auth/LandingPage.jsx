import Navbar from "../../components/Navbar/Navbar";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1>Discover Your Perfect Stay</h1>
          <p>Explore world-class hotels, luxury stays, and exclusive offers tailored just for you.</p>
          <div className="hero-buttons">
            <button className="primary-btn">Explore Now</button>
            <button className="secondary-btn">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
