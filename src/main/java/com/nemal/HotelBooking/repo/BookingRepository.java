package com.nemal.HotelBooking.repo;

import com.nemal.HotelBooking.entity.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends MongoRepository<Booking, String> {

    Optional<Booking> findByBookingConfirmationCode(String confirmationCode);

    //checkInDate is less than or equal to and checkOutDate while
    // checkOutDate is greater than or equal to checkInDate
    @Query("{'checkInDate': {$lte: ?1}, 'checkOutDate': {$gte: ?0}}")
    List<Booking> findBookingsByDateRange(String checkInDate, String checkOutDate);

}
