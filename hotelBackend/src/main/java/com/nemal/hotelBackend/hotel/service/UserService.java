package com.nemal.hotelBackend.hotel.service;

import com.nemal.hotelBackend.hotel.model.Booking;
import com.nemal.hotelBackend.hotel.model.User;
import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(String id);
    User getUserByEmail(String email);
    void createUser(User user);
    boolean deleteUserById(String id);
    boolean updateUserById(String id, User user);
    List<Booking> getBookingsByUserId(String id);
    boolean authenticateUser(String email, String password);
}