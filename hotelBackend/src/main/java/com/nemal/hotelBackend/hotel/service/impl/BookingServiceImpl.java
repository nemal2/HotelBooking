package com.nemal.hotelBackend.hotel.service.impl;


import com.nemal.hotelBackend.hotel.model.Booking;
import com.nemal.hotelBackend.hotel.model.Room;
import com.nemal.hotelBackend.hotel.repositories.BookingRepository;
import com.nemal.hotelBackend.hotel.repositories.RoomRepository;
import com.nemal.hotelBackend.hotel.service.BookingService;
import com.nemal.hotelBackend.hotel.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final RoomService roomService;

    @Autowired
    public BookingServiceImpl(BookingRepository bookingRepository,
                              RoomRepository roomRepository,
                              RoomService roomService) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
        this.roomService = roomService;
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking getBookingById(String id) {
        Optional<Booking> booking = bookingRepository.findById(id);
        return booking.orElse(null);
    }

    @Override
    public List<Booking> getBookingsByUserId(String userId) {
        return bookingRepository.findByUserId(userId);
    }

    @Override
    public List<Booking> getBookingsByRoomId(String roomId) {
        return bookingRepository.findByRoomId(roomId);
    }

    @Override
    public Booking createBooking(Booking booking) {
        // Check if room is available for the requested dates
        if (!roomService.isRoomAvailable(booking.getRoomId(),
                booking.getCheckInDate(), booking.getCheckOutDate())) {
            throw new IllegalStateException("Room is not available for the selected dates");
        }

        // Calculate total price based on room price and stay duration
        Optional<Room> roomOpt = roomRepository.findById(booking.getRoomId());
        if (roomOpt.isEmpty()) {
            throw new IllegalStateException("Room not found");
        }

        Room room = roomOpt.get();
        long nights = ChronoUnit.DAYS.between(booking.getCheckInDate(), booking.getCheckOutDate());
        double totalPrice = room.getPrice() * nights;

        booking.setTotalPrice(totalPrice);
        booking.setStatus("CONFIRMED");

        return bookingRepository.save(booking);
    }

    @Override
    public boolean updateBooking(String id, Booking booking) {
        if (bookingRepository.existsById(id)) {
            booking.setId(id);
            bookingRepository.save(booking);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteBooking(String id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean cancelBooking(String id) {
        Optional<Booking> bookingOpt = bookingRepository.findById(id);
        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();
            booking.setStatus("CANCELLED");
            bookingRepository.save(booking);
            return true;
        }
        return false;
    }

    @Override
    public List<Booking> getBookingsByDateRange(LocalDate startDate, LocalDate endDate) {
        return bookingRepository.findByDateRange(startDate, endDate);
    }
}