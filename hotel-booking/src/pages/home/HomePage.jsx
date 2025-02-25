import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const rooms = [
    { id: 1, name: "Deluxe Room", price: "$100", image: "src/assets/room1.jpeg" },
    { id: 2, name: "Standard Room", price: "$80", image: "src/assetsroom2.jpg" },
    { id: 3, name: "Suite", price: "$150", image: "src/assetsroom3.jpg" },
  ];

  const navigate = useNavigate();

  const handleRoomClick = (roomId) => {
    navigate(`/rooms/${roomId}`);
  };

  return (
    <div className="home-page">
      <h1>Welcome to Our Hotel</h1>
      <div className="room-list">
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <img
              src={room.image}
              alt={room.name}
              onClick={() => handleRoomClick(room.id)}
            />
            <h3>{room.name}</h3>
            <p>{room.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
