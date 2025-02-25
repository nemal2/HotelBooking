package com.nemal.hotelBackend.hotel.repositories;

import com.nemal.hotelBackend.hotel.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

}
