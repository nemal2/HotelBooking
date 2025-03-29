// BookingRepository.java - Convert to MongoDB
package com.nemal.hotelBackend.hotel.repositories;

import com.nemal.hotelBackend.hotel.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findByUserId(String userId);
    List<Booking> findByRoomId(String roomId);

    @Query("{ $or: [ " +
            "{ 'checkInDate': { $gte: ?0, $lte: ?1 } }, " +
            "{ 'checkOutDate': { $gte: ?0, $lte: ?1 } }, " +
            "{ $and: [ { 'checkInDate': { $lte: ?0 } }, { 'checkOutDate': { $gte: ?1 } } ] } " +
            "] }")
    List<Booking> findByDateRange(LocalDate startDate, LocalDate endDate);
}