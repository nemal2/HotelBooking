package com.example.hotelbackend.hotel.service;

import com.example.hotelbackend.hotel.model.RoomType;
import java.util.List;

public interface RoomTypeService {
    List<RoomType> getAllRoomTypes();
    RoomType getRoomTypeById(String id);
    RoomType createRoomType(RoomType roomType);
    boolean updateRoomType(String id, RoomType roomType);
    boolean deleteRoomType(String id);
}

