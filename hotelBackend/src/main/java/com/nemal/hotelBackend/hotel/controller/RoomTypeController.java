package com.nemal.hotelBackend.hotel.controller;

import com.example.hotelbackend.hotel.model.Room;
import com.example.hotelbackend.hotel.model.RoomType;
import com.example.hotelbackend.hotel.service.RoomService;
import com.example.hotelbackend.hotel.service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/room-types")
@CrossOrigin
public class RoomTypeController {

    private final RoomTypeService roomTypeService;
    private final RoomService roomService;


    @Autowired
    public RoomTypeController(RoomTypeService roomTypeService, RoomService roomService) {
        this.roomTypeService = roomTypeService;
        this.roomService = roomService;
    }

    @GetMapping
    public ResponseEntity<List<RoomType>> getAllRoomTypes() {
        return ResponseEntity.ok(roomTypeService.getAllRoomTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomType> getRoomTypeById(@PathVariable String id) {
        RoomType roomType = roomTypeService.getRoomTypeById(id);
        return roomType != null ? ResponseEntity.ok(roomType) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/rooms")
    public ResponseEntity<List<Room>> getRoomsByType(@PathVariable String id) {
        return ResponseEntity.ok(roomService.getRoomsByType(id));
    }

    @PostMapping
    public ResponseEntity<RoomType> createRoomType(@RequestBody RoomType roomType) {
        RoomType savedRoomType = roomTypeService.createRoomType(roomType);
        return ResponseEntity.ok(savedRoomType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRoomType(@PathVariable String id, @RequestBody RoomType roomType) {
        boolean updated = roomTypeService.updateRoomType(id, roomType);
        return updated
                ? ResponseEntity.ok(Map.of("message", "Room type updated successfully"))
                : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRoomType(@PathVariable String id) {
        boolean deleted = roomTypeService.deleteRoomType(id);
        return deleted
                ? ResponseEntity.ok(Map.of("message", "Room type deleted successfully"))
                : ResponseEntity.notFound().build();
    }




}