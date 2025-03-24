// Alternative version of HomePage.jsx without the hero section
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import RoomCard from "../../components/common/RoomCard";
import { getAllRoomTypes } from "../../api/roomTypeApi";
import "./HomePage.css";

const HomePage = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const data = await getAllRoomTypes();
        setRoomTypes(data);
      } catch (err) {
        setError('Failed to load room types. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomTypes();
  }, []);

  const filteredRoomTypes = roomTypes.filter(roomType => 
    roomType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (roomType.phrase && roomType.phrase.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div className="loading-container"><div className="loading">Loading room types...</div></div>;
  if (error) return <div className="error-container"><div className="error">{error}</div></div>;

  return (
    <div className="home-page">
      <Navbar />
      <div className="content-section">
        <div className="header-with-search">
          <h2>Browse Our Room Types</h2>
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search room types..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        <div className="room-list">
          {filteredRoomTypes.length > 0 ? (
            filteredRoomTypes.map((roomType) => (
              <RoomCard key={roomType.id} room={roomType} isRoomType={true} />
            ))
          ) : (
            <p className="no-results">No room types found matching your search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;