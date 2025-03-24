package com.example.hotelbackend.hotel.repositories;

import com.example.hotelbackend.hotel.model.RoomType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomTypeRepository extends MongoRepository<RoomType, String> {
}
