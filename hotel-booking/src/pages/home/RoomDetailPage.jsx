import { useParams } from "react-router-dom";
import "./RoomDetailPage.css";

const RoomDetailPage = () => {
  const { roomId } = useParams();

  // Mock room data
  const roomDetails = {
    1: {
      name: "Deluxe Room",
      images: ["src/assets/room2.jpg", "src/assets/room2.jpg"],
      facilities: ["Wi-Fi", "Air Conditioning", "Room Service"],
      price: "$100 per night",
    },
    2: {
      name: "Standard Room",
      images: ["src/assets/room2.jpg", "src/assets/room2.jpg"],
      facilities: ["Wi-Fi", "TV"],
      price: "$80 per night",
    },
    3: {
      name: "Suite",
      images: ["src/assets/room2.jpg", "src/assets/room2.jpg"],
      facilities: ["Wi-Fi", "Jacuzzi", "Room Service", "Kitchen"],
      price: "$150 per night",
    },
  };

  const room = roomDetails[roomId];

  return (
    <div className="room-detail-page">
      <h1>{room.name}</h1>
      <div className="images">
        {room.images.map((image, index) => (
          <img key={index} src={image} alt={room.name} />
        ))}
      </div>
      <p><strong>Facilities:</strong> {room.facilities.join(", ")}</p>
      <p><strong>Price:</strong> {room.price}</p>
    </div>
  );
};

export default RoomDetailPage;
