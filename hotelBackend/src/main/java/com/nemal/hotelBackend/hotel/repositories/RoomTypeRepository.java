package com.nemal.hotelBackend.hotel.repositories;

import com.nemal.hotelBackend.hotel.model.Booking;
import com.nemal.hotelBackend.hotel.model.RoomType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomTypeRepository extends MongoRepository<RoomType, String> {
}
