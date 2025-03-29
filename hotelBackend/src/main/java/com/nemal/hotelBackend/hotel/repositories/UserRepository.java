package com.nemal.hotelBackend.hotel.repositories;
import com.example.hotelbackend.hotel.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
    boolean existsByEmail(String email);
}