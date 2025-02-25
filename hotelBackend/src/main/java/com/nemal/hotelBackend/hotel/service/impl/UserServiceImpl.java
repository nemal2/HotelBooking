package com.nemal.hotelBackend.hotel.service.impl;

import com.nemal.hotelBackend.hotel.model.Booking;
import com.nemal.hotelBackend.hotel.model.User;
import com.nemal.hotelBackend.hotel.repositories.UserRepository;
import com.nemal.hotelBackend.hotel.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    @Override
    public User getUserById(String id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null); // Return null or throw an exception
    }

    @Override
    public void createUser(User user) {
        userRepository.save(user);
    }


    @Override
    public boolean deleteUserById(String id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateUserById(String id, User user) {
        if (userRepository.existsById(id)) {
            user.setId(id); // Ensure the ID remains unchanged
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public List<Booking> getBookingsByUserId(String id) {
        User user = getUserById(id);
        return user != null ? user.getBookings() : List.of();
    }
}
