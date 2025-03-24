import { useEffect, useState } from "react";
import { getAllRooms } from "../../api/roomApi"; // Adjust this path based on your project structure
import RoomCard from "../../components/common/RoomCard";
import Navbar from "../../components/common/Navbar";
import "./RoomPage.css";

const RoomPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllRooms();
        
        // Process room data to ensure it has the properties expected by RoomCard
        const processedRooms = data.map(room => ({
          id: room.id,
          name: room.name || `Room ${room.roomNumber}`,
          imageUrl: room.imageUrl,
          images: room.images || [],
          price: room.price || room.nightlyRate || 0,
          available: room.status === "AVAILABLE"
        }));
        
        setRooms(processedRooms);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("Failed to load rooms. Please try again later.");
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="room-page">
      <Navbar />
      <div className="room-page-container">
        <div className="room-page-header">
          <h1>Our Rooms</h1>
          <p>Explore our selection of comfortable and luxurious accommodations</p>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading rooms...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="room-grid">
            {rooms.length > 0 ? (
              rooms.map((room) => <RoomCard key={room.id} room={room} isRoomType={false} />)
            ) : (
              <p className="no-rooms-message">No rooms available at the moment.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomPage;