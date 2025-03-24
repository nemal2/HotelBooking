import { useNavigate } from "react-router-dom";
import "./RoomCard.css";

const RoomCard = ({ room, isRoomType = false }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (isRoomType) {
      navigate(`/rooms/type/${room.id}`);
    } else {
      navigate(`/rooms/${room.id}`);
    }
  };

  return (
    <div className="room-card" onClick={handleCardClick}>
      <div className="card-image">
        <img 
          src={room.imageUrl || (room.images && room.images.length > 0 ? room.images[0] : "/assets/placeholder.jpg")}
          alt={room.name}
          onError={(e) => e.target.src = "/assets/placeholder.jpg"}
        />
      </div>
      <div className="card-content">
        <h3>{room.name}</h3>
        {isRoomType ? (
          <p className="room-phrase">{room.phrase}</p>
        ) : (
          <>
            <p className="room-price">${room.price} per night</p>
            <p className="room-availability">
              {room.available ? "Available" : "Currently Booked"}
            </p>
          </>
        )}
      </div>
      <button className="card-action-btn" onClick={(e) => { e.stopPropagation(); handleCardClick(); }}>
        {isRoomType ? "Browse Rooms" : "View Details"}
      </button>
    </div>
  );
};

export default RoomCard;
