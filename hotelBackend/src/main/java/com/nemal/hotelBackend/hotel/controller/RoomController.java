// RoomController.java
package com.nemal.hotelBackend.hotel.controller;

import com.nemal.hotelBackend.hotel.model.Room;
import com.nemal.hotelBackend.hotel.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin
public class RoomController {

    private final RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable String id) {
        Room room = roomService.getRoomById(id);
        return room != null ? ResponseEntity.ok(room) : ResponseEntity.notFound().build();
    }

    @GetMapping("/available")
    public ResponseEntity<List<Room>> getAvailableRooms() {
        return ResponseEntity.ok(roomService.getAvailableRooms());
    }

    @GetMapping("/type/{typeId}")
    public ResponseEntity<List<Room>> getRoomsByType(@PathVariable String typeId) {
        return ResponseEntity.ok(roomService.getRoomsByType(typeId));
    }

    @GetMapping("/type/{typeId}/available")
    public ResponseEntity<List<Room>> getAvailableRoomsByType(@PathVariable String typeId) {
        return ResponseEntity.ok(roomService.getAvailableRoomsByType(typeId));
    }

    @GetMapping("/available/dates")
    public ResponseEntity<List<Room>> getAvailableRoomsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut) {
        return ResponseEntity.ok(roomService.getAvailableRoomsByDateRange(checkIn, checkOut));
    }

    @GetMapping("/{id}/available")
    public ResponseEntity<Boolean> isRoomAvailable(
            @PathVariable String id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut) {
        return ResponseEntity.ok(roomService.isRoomAvailable(id, checkIn, checkOut));
    }

    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        return ResponseEntity.ok(roomService.createRoom(room));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRoom(@PathVariable String id, @RequestBody Room room) {
        boolean updated = roomService.updateRoom(id, room);
        return updated
                ? ResponseEntity.ok(Map.of("message", "Room updated successfully"))
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable String id) {
        boolean deleted = roomService.deleteRoom(id);
        return deleted
                ? ResponseEntity.ok(Map.of("message", "Room deleted successfully"))
                : ResponseEntity.notFound().build();
    }

    @PostMapping("/type/{typeId}/add-room")
    public ResponseEntity<Room> addRoomToType(@PathVariable String typeId, @RequestBody Room room) {
        room.setRoomTypeId(typeId);  // Associate room with room type
        Room createdRoom = roomService.createRoom(room);
        return ResponseEntity.ok(createdRoom);
    }

}