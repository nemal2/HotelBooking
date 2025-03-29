package com.nemal.hotelBackend.hotel.service.impl;


import com.nemal.hotelBackend.hotel.model.Booking;
import com.nemal.hotelBackend.hotel.model.Room;
import com.nemal.hotelBackend.hotel.repositories.BookingRepository;
import com.nemal.hotelBackend.hotel.repositories.RoomRepository;
import com.nemal.hotelBackend.hotel.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;

    @Autowired
    public RoomServiceImpl(RoomRepository roomRepository, BookingRepository bookingRepository) {
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Room getRoomById(String id) {
        Optional<Room> room = roomRepository.findById(id);
        return room.orElse(null);
    }

    @Override
    public List<Room> getRoomsByType(String typeId) {
        return roomRepository.findByRoomTypeId(typeId);
    }

    @Override
    public List<Room> getAvailableRooms() {
        return roomRepository.findByAvailable(true);
    }

    @Override
    public List<Room> getAvailableRoomsByType(String typeId) {
        return roomRepository.findByRoomTypeId(typeId).stream()
                .filter(Room::isAvailable)
                .collect(Collectors.toList());
    }

    @Override
    public List<Room> getAvailableRoomsByDateRange(LocalDate checkIn, LocalDate checkOut) {
        List<Booking> bookings = bookingRepository.findByDateRange(checkIn, checkOut);

        List<String> bookedRoomIds = bookings.stream()
                .map(Booking::getRoomId)
                .collect(Collectors.toList());

        return getAvailableRooms().stream()
                .filter(room -> !bookedRoomIds.contains(room.getId()))
                .collect(Collectors.toList());
    }

    @Override
    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }


    @Override
    public boolean updateRoom(String id, Room room) {
        if (roomRepository.existsById(id)) {
            room.setId(id);
            roomRepository.save(room);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteRoom(String id) {
        if (roomRepository.existsById(id)) {
            roomRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean isRoomAvailable(String roomId, LocalDate checkIn, LocalDate checkOut) {
        // Check if room exists and is marked as available
        Optional<Room> roomOpt = roomRepository.findById(roomId);
        if (roomOpt.isEmpty() || !roomOpt.get().isAvailable()) {
            return false;
        }

        // Check if there are overlapping bookings
        List<Booking> bookings = bookingRepository.findByRoomId(roomId);
        for (Booking booking : bookings) {
            // Check if dates overlap
            if (!(booking.getCheckOutDate().isBefore(checkIn) ||
                    booking.getCheckInDate().isAfter(checkOut))) {
                return false;
            }
        }
        return true;
    }
}