import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { getRoomById, getRoomTypeById } from "../../api/roomApi";
import "./RoomDetailPage.css";

const RoomDetailPage = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [roomType, setRoomType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchRoomAndType = async () => {
      try {
        // Fetch room data
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        
        // If room has a roomTypeId, fetch the room type details
        if (roomData.roomTypeId) {
          try {
            const typeData = await getRoomTypeById(roomData.roomTypeId);
            setRoomType(typeData);
          } catch (typeErr) {
            console.error("Failed to load room type details:", typeErr);
          }
        }
      } catch (err) {
        setError('Failed to load room details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRoomAndType();
  }, [roomId]);
  
  const nextImage = () => {
    if (room?.images?.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === room.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  const prevImage = () => {
    if (room?.images?.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? room.images.length - 1 : prevIndex - 1
      );
    }
  };
  
  const handleBookNow = () => {
    navigate(`/booking/${roomId}`);
  };
  
  if (loading) return <div className="loading">Loading room details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!room) return <div className="error">Room not found</div>;
  
  return (
    <div className="room-detail-page">
      <Navbar />
      
      <div className="room-detail-container">
        <div className="room-detail-header">
          <h1>{room.name}</h1>
          {roomType && <p className="room-type-badge">{roomType.name}</p>}
        </div>
        
        <div className="room-content">
          <div className="image-slider-container">
            <div className="image-slider">
              <button className="slider-btn prev" onClick={prevImage}>❮</button>
              <div className="image-container">
                {room.images && room.images.length > 0 ? (
                  <img
                    src={room.images[currentImageIndex]}
                    alt={`${room.name} view ${currentImageIndex + 1}`}
                  />
                ) : (
                  <img src="/assets/placeholder.jpg" alt="Room placeholder" />
                )}
              </div>
              <button className="slider-btn next" onClick={nextImage}>❯</button>
            </div>
            
            <div className="image-thumbnails">
              {room.images && room.images.map((image, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="room-details-sidebar">
            <div className="price-card">
              <h2>${room.price}</h2>
              <p>per night</p>
              <button 
                className="booking-btn"
                onClick={handleBookNow}
                disabled={!room.available}
              >
                {room.available ? 'Book Now' : 'Currently Unavailable'}
              </button>
              
              <div className="availability-status">
                <span className={room.available ? 'available' : 'unavailable'}>
                  {room.available ? 'Available' : 'Currently Booked'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="room-description-section">
          <h2>Room Details</h2>
          <p className="room-description">{room.description}</p>
          
          {room.facilities && room.facilities.length > 0 && (
            <div className="facilities-section">
              <h3>Amenities & Facilities</h3>
              <div className="facilities-grid">
                {room.facilities.map((facility, index) => (
                  <div key={index} className="facility-item">
                    <span className="facility-icon">✓</span>
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;