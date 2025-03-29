package com.nemal.hotelBackend.hotel.service;

import com.nemal.hotelBackend.hotel.model.Room;
import java.time.LocalDate;
import java.util.List;

public interface RoomService {
    List<Room> getAllRooms();
    Room getRoomById(String id);
    List<Room> getRoomsByType(String typeId);
    List<Room> getAvailableRooms();
    List<Room> getAvailableRoomsByType(String typeId);
    List<Room> getAvailableRoomsByDateRange(LocalDate checkIn, LocalDate checkOut);
    Room createRoom(Room room);
    boolean updateRoom(String id, Room room);
    boolean deleteRoom(String id);
    boolean isRoomAvailable(String roomId, LocalDate checkIn, LocalDate checkOut);
}