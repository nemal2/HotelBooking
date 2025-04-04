package com.nemal.hotelBackend.hotel.repositories;

import com.nemal.hotelBackend.hotel.model.Room;
import com.nemal.hotelBackend.hotel.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RoomRepository extends MongoRepository<Room, String> {
    List<Room> findByRoomTypeId(String roomTypeId);
    List<Room> findByAvailable(boolean available);
}