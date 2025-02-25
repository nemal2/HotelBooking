package com.nemal.hotelBackend.hotel.controller;

import com.nemal.hotelBackend.hotel.model.User;
import com.nemal.hotelBackend.hotel.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

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

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
        List<User> users = userService.getAllUsers();
        for (User user : users) {
            if (user.getEmail().equals(loginRequest.getEmail()) &&
                    user.getPassword().equals(loginRequest.getPassword())) {
                return ResponseEntity.ok("Login successful");
            }
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }



    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody User user) {
        userService.createUser(user);
        return ResponseEntity.ok("User created successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable String id, @RequestBody User user) {
        boolean updated = userService.updateUserById(id, user);
        return updated ? ResponseEntity.ok("User updated successfully") : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id) {
        boolean deleted = userService.deleteUserById(id);
        return deleted ? ResponseEntity.ok("User deleted successfully") : ResponseEntity.notFound().build();
    }
}
