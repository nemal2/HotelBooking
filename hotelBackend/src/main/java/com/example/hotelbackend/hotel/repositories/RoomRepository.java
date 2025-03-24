package com.example.hotelbackend.hotel.repositories;

import com.example.hotelbackend.hotel.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RoomRepository extends MongoRepository<Room, String> {
    List<Room> findByRoomTypeId(String roomTypeId);
    List<Room> findByAvailable(boolean available);
}