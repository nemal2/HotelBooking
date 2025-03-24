import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import { getAllRoomTypes } from "../../api/roomTypeApi";
import "./RoomTypePage.css";

const RoomTypePage = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageStatus, setImageStatus] = useState({});

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        setLoading(true);
        const data = await getAllRoomTypes();
        console.log("Fetched room types:", data);
        setRoomTypes(data);
        
        // Pre-check if images are loadable
        if (data && data.length > 0) {
          data.forEach(room => {
            if (room.imageUrl) {
              const img = new Image();
              img.onload = () => setImageStatus(prev => ({ ...prev, [room.id]: 'loaded' }));
              img.onerror = () => setImageStatus(prev => ({ ...prev, [room.id]: 'error' }));
              img.src = room.imageUrl;
            }
          });
        }
      } catch (err) {
        setError("Failed to load room types. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomTypes();
  }, []);

  // Test the Cloudinary URL directly
  useEffect(() => {
    const testCloudinaryUrl = "https://res.cloudinary.com/dnqsbugv9/image/upload/v1742570533/room2_dkafoz.jpg";
    const img = new Image();
    img.onload = () => console.log("Cloudinary test image loaded successfully");
    img.onerror = (e) => console.error("Cloudinary test image failed to load", e);
    img.src = testCloudinaryUrl;
  }, []);

  if (loading) return <div className="loading">Loading room types...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="room-type-page">
      <Navbar />
      <div className="room-type-list">
        {roomTypes.length > 0 ? (
          roomTypes.map((roomType) => (
            <div key={roomType.id} className="room-type-card">
              {/* Display the image with detailed debugging */}
              <div className="image-debug-container">
                <p>Image URL: {roomType.imageUrl}</p>
                <p>Status: {imageStatus[roomType.id] || 'pending'}</p>
                
                {/* Try direct image tag */}
                <div style={{ border: '2px solid blue', padding: '5px', marginBottom: '10px' }}>
                  <p>Method 1: Direct IMG tag</p>
                  <img
                    src={roomType.imageUrl}
                    alt={`${roomType.name} - direct`}
                    style={{ maxWidth: '100%', height: '150px' }}
                    onLoad={() => console.log("Direct image loaded")}
                    onError={(e) => {
                      console.error("Direct image failed to load", e);
                      e.target.src = "https://via.placeholder.com/300x200?text=Error";
                    }}
                  />
                </div>
                
                {/* Try image with CORS attributes */}
                <div style={{ border: '2px solid green', padding: '5px', marginBottom: '10px' }}>
                  <p>Method 2: IMG with CORS attributes</p>
                  <img
                    src={roomType.imageUrl}
                    alt={`${roomType.name} - cors`}
                    style={{ maxWidth: '100%', height: '150px' }}
                    crossOrigin="anonymous"
                    onLoad={() => console.log("CORS image loaded")}
                    onError={(e) => {
                      console.error("CORS image failed to load", e);
                      e.target.src = "https://via.placeholder.com/300x200?text=CORS+Error";
                    }}
                  />
                </div>
                
                {/* Try a div with background-image */}
                <div style={{ border: '2px solid red', padding: '5px' }}>
                  <p>Method 3: CSS background-image</p>
                  <div 
                    style={{ 
                      backgroundImage: `url(${roomType.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '150px',
                      width: '100%'
                    }}
                  ></div>
                </div>
              </div>
              
              <h3>{roomType.name}</h3>
              <p>{roomType.phrase}</p>
              
              {/* Test with a known working image */}
              <div style={{ marginTop: '20px', border: '2px solid purple', padding: '5px' }}>
                <p>Control: Public placeholder image</p>
                <img 
                  src="https://via.placeholder.com/300x200?text=Control" 
                  alt="Control"
                  style={{ maxWidth: '100%', height: '150px' }}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No room types available.</p>
        )}
      </div>
    </div>
  );
};

export default RoomTypePage;