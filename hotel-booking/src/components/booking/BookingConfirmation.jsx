// src/components/booking/BookingConfirmation.jsx
import { useNavigate } from "react-router-dom";
import "./BookingConfirmation.css";

const BookingConfirmation = ({ booking, room }) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="booking-confirmation">
      <div className="confirmation-icon">
        <i className="fa fa-check-circle"></i>
      </div>
      
      <h2>Booking Confirmed!</h2>
      <p>Your reservation has been successfully confirmed.</p>
      
      <div className="confirmation-details">
        <div className="room-summary">
          <img 
            src={room.images && room.images.length > 0 ? room.images[0] : "/assets/placeholder.jpg"} 
            alt={room.name} 
          />
          <h3>{room.name}</h3>
        </div>
        
        <div className="booking-summary">
          <p><strong>Booking ID:</strong> {booking.id}</p>
          <p><strong>Check-in:</strong> {formatDate(booking.checkInDate)}</p>
          <p><strong>Check-out:</strong> {formatDate(booking.checkOutDate)}</p>
          <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
        </div>
      </div>
      
      <div className="confirmation-actions">
        <button 
          className="view-bookings-btn"
          onClick={() => navigate("/my-bookings")}
        >
          View My Bookings
        </button>
        <button
          className="back-home-btn"
          onClick={() => navigate("/home")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;