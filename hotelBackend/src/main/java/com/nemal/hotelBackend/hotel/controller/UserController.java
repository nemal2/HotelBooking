package com.nemal.hotelBackend.hotel.controller;

import com.example.hotelbackend.hotel.model.Booking;
import com.example.hotelbackend.hotel.model.User;
import com.example.hotelbackend.hotel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        User user = userService.getUserById(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/bookings")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable String id) {
        List<Booking> bookings = userService.getBookingsByUserId(id);
        return ResponseEntity.ok(bookings);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody User user) {
        boolean updated = userService.updateUserById(id, user);
        return updated
                ? ResponseEntity.ok(Map.of("message", "User updated successfully"))
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        boolean deleted = userService.deleteUserById(id);
        return deleted
                ? ResponseEntity.ok(Map.of("message", "User deleted successfully"))
                : ResponseEntity.notFound().build();
    }
}