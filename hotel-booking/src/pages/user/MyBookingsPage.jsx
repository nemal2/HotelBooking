// src/pages/user/MyBookingsPage.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { getUserBookings, cancelBooking } from "../../api/bookingApi";
import { getRoomById } from "../../api/roomApi";
import { useAuth } from "../../contexts/AuthContext";
import "./MyBookingsPage.css";

const MyBookingsPage = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  
  const [bookings, setBookings] = useState([]);
  const [roomDetails, setRoomDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (location.state?.bookingSuccess) {
      setSuccessMessage("Booking successfully created!");
      // Clear the success message after 5 seconds
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await getUserBookings(currentUser.id);
        setBookings(data);
        
        // Fetch room details for each booking
        const roomDetailsObj = {};
        await Promise.all(
          data.map(async (booking) => {
            try {
              const roomData = await getRoomById(booking.roomId);
              roomDetailsObj[booking.roomId] = roomData;
            } catch (err) {
              console.error(`Error fetching room ${booking.roomId}:`, err);
            }
          })
        );
        
        setRoomDetails(roomDetailsObj);
      } catch (err) {
        setError('Failed to load your bookings. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchBookings();
    }
  }, [currentUser]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      // Update the booking status in the local state
      setBookings(prevBookings => 
        prevBookings.map(booking => 
            booking.id === bookingId ? { ...booking, status: 'CANCELLED' } : booking
        )
      );
      setSuccessMessage("Booking cancelled successfully!");
      // Clear the success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (err) {
      setError("Failed to cancel booking. Please try again.");
      console.error(err);
      // Clear the error message after 5 seconds
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <div className="loading">Loading your bookings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="my-bookings-page">
      <Navbar />
      
      <div className="bookings-container">
        <h1>My Bookings</h1>
        
        {successMessage && <div className="success-message">{successMessage}</div>}
        
        {bookings.length === 0 ? (
          <div className="no-bookings">
            <p>You don't have any bookings yet.</p>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => {
              const room = roomDetails[booking.roomId] || {};
              
              return (
                <div key={booking.id} className={`booking-card ${booking.status.toLowerCase()}`}>
                  <div className="booking-image">
                    {room.images && room.images.length > 0 ? (
                      <img src={room.images[0]} alt={room.name} />
                    ) : (
                      <img src="/assets/placeholder.jpg" alt="Room" />
                    )}
                  </div>
                  
                  <div className="booking-details">
                    <h2>{room.name || 'Room Details Unavailable'}</h2>
                    
                    <div className="booking-info">
                      <p><strong>Booking ID:</strong> {booking.id}</p>
                      <p><strong>Check-in:</strong> {formatDate(booking.checkInDate)}</p>
                      <p><strong>Check-out:</strong> {formatDate(booking.checkOutDate)}</p>
                      <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
                      <p><strong>Status:</strong> <span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span></p>
                    </div>
                  </div>
                  
                  <div className="booking-actions">
                    {booking.status === 'CONFIRMED' && (
                      <button 
                        className="cancel-btn"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;