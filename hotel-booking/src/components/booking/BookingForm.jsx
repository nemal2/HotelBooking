// src/components/booking/BookingForm.jsx
import { useState, useEffect } from "react";
import { checkRoomAvailability } from "../../api/roomApi";
import "./BookingForm.css";

const BookingForm = ({ room, userId, onSubmit }) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [numNights, setNumNights] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
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
          setLoading(true);
          const available = await checkRoomAvailability(room.id, start, end);
          setIsAvailable(available);
        } catch (err) {
          console.error("Error checking availability:", err);
          setIsAvailable(false);
          setError("Could not check room availability. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      
      checkAvailability();
    }
  }, [checkInDate, checkOutDate, room]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isAvailable) {
      setError("Room is not available for the selected dates.");
      return;
    }
    
    const bookingData = {
      roomId: room.id,
      userId: userId,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      totalPrice: totalPrice,
      status: "CONFIRMED"
    };
    
    onSubmit(bookingData);
  };
  
  return (
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
          disabled={loading}
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
          disabled={loading}
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
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        type="submit" 
        className="submit-btn" 
        disabled={!isAvailable || !checkInDate || !checkOutDate || numNights <= 0 || loading}
      >
        {loading ? "Checking availability..." : "Confirm Booking"}
      </button>
    </form>
  );
};

export default BookingForm;