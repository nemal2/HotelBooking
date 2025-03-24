import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import RoomCard from "../../components/common/RoomCard";
import { getRoomsByType, getRoomTypeById } from "../../api/roomApi";
import "./RoomsByTypePage.css";

const RoomsByTypePage = () => {
  const { typeId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [roomType, setRoomType] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedType = await getRoomTypeById(typeId);
        setRoomType(fetchedType);

        const fetchedRooms = await getRoomsByType(typeId);
        setRooms(fetchedRooms);
      } catch (err) {
        setError("Failed to load rooms. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [typeId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="rooms-by-type-page">
      <Navbar />
      <div className="room-type-header">
        <h1>{roomType.name} Rooms</h1>
        <p>{roomType.phrase}</p>
      </div>

      <div className="rooms-grid">
        {rooms.length ? rooms.map(room => (
          <RoomCard key={room.id} room={room} />
        )) : <p>No rooms available for this type.</p>}
      </div>
    </div>
  );
};

export default RoomsByTypePage;
