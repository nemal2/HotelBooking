
package com.nemal.hotelBackend.hotel.service;

import com.nemal.hotelBackend.hotel.model.Booking;
import java.time.LocalDate;
import java.util.List;

public interface BookingService {
    List<Booking> getAllBookings();
    Booking getBookingById(String id);
    List<Booking> getBookingsByUserId(String userId);
    List<Booking> getBookingsByRoomId(String roomId);
    Booking createBooking(Booking booking);
    boolean updateBooking(String id, Booking booking);
    boolean deleteBooking(String id);
    boolean cancelBooking(String id);
    List<Booking> getBookingsByDateRange(LocalDate startDate, LocalDate endDate);
}