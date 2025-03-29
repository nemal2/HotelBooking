package com.nemal.hotelBackend.hotel.service.impl;

import com.nemal.hotelBackend.hotel.model.Booking;
import com.nemal.hotelBackend.hotel.model.RoomType;
import com.nemal.hotelBackend.hotel.repositories.RoomTypeRepository;
import com.nemal.hotelBackend.hotel.service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RoomTypeServiceImpl implements RoomTypeService {

    private final RoomTypeRepository roomTypeRepository;

    @Autowired
    public RoomTypeServiceImpl(RoomTypeRepository roomTypeRepository) {
        this.roomTypeRepository = roomTypeRepository;
    }

    @Override
    public List<RoomType> getAllRoomTypes() {
        return roomTypeRepository.findAll();
    }

    @Override
    public RoomType getRoomTypeById(String id) {
        Optional<RoomType> roomType = roomTypeRepository.findById(id);
        return roomType.orElse(null);
    }

    @Override
    public RoomType createRoomType(RoomType roomType) {
        return roomTypeRepository.save(roomType);
    }

    @Override
    public boolean updateRoomType(String id, RoomType roomType) {
        if (roomTypeRepository.existsById(id)) {
            roomType.setId(id);
            roomTypeRepository.save(roomType);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteRoomType(String id) {
        if (roomTypeRepository.existsById(id)) {
            roomTypeRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
