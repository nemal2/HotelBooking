// src/pages/home/BookingPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { getRoomById, checkRoomAvailability } from "../../api/roomApi";
import { createBooking } from "../../api/bookingApi";
import { useAuth } from "../../contexts/AuthContext";
import "./BookingPage.css";

const BookingPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [numNights, setNumNights] = useState(0);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getRoomById(roomId);
        setRoom(data);
      } catch (err) {
        setError('Failed to load room details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      
      // Calculate number of nights
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setNumNights(diffDays);
      
      // Calculate total price
      if (room && diffDays > 0) {
        setTotalPrice(room.price * diffDays);
      }
      
      // Check availability for selected dates
      const checkAvailability = async () => {
        try {
          const available = await checkRoomAvailability(roomId, start, end);
          setIsAvailable(available);
        } catch (err) {
          console.error("Error checking availability:", err);
          setIsAvailable(false);
        }
      };
      
      checkAvailability();
    }
  }, [checkInDate, checkOutDate, roomId, room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (!isAvailable) {
      setSubmitError("Room is not available for the selected dates.");
      return;
    }
    
    try {
      const bookingData = {
        roomId: roomId,
        userId: currentUser.id,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        totalPrice: totalPrice,
        status: "CONFIRMED"
      };
      
      await createBooking(bookingData);
      navigate("/my-bookings", { state: { bookingSuccess: true } });
    } catch (err) {
      setSubmitError(err.message || "Failed to create booking. Please try again.");
      console.error(err);
    }
  };

  if (loading) return <div className="loading">Loading room details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!room) return <div className="error">Room not found</div>;

  return (
    <div className="booking-page">
      <Navbar />
      
      <div className="booking-container">
        <h1>Book Your Stay</h1>
        
        <div className="room-summary">
          <img 
            src={room.images && room.images.length > 0 ? room.images[0] : "/assets/placeholder.jpg"} 
            alt={room.name} 
          />
          <div className="room-info">
            <h2>{room.name}</h2>
            <p><strong>Price:</strong> ${room.price} per night</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="check-in">Check-in Date</label>
            <input
              type="date"
              id="check-in"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="check-out">Check-out Date</label>
            <input
              type="date"
              id="check-out"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              min={checkInDate || new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          
          {checkInDate && checkOutDate && numNights > 0 && (
            <div className="price-summary">
              <p>
                <span>Number of nights:</span>
                <span>{numNights}</span>
              </p>
              <p>
                <span>Price per night:</span>
                <span>${room.price}</span>
              </p>
              <p className="total">
                <span>Total price:</span>
                <span>${totalPrice}</span>
              </p>
              {!isAvailable && (
                <p className="availability-warning">
                  This room is not available for the selected dates.
                </p>
              )}
            </div>
          )}
          
          {submitError && <div className="error-message">{submitError}</div>}
          
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={!isAvailable || !checkInDate || !checkOutDate || numNights <= 0}
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;