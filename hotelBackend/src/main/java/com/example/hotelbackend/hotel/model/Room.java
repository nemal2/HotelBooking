package com.example.hotelbackend.hotel.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "rooms")
public class Room {
    @Id
    private String id;

    private String name;
    private String description;
    private List<String> images = new ArrayList<>();
    private List<String> facilities = new ArrayList<>();
    private double price;
    private boolean available;

    // Store the roomTypeId instead of the object
    private String roomTypeId;

    // In MongoDB, we don't need to explicitly define the relationship with bookings
    // The relationship will be managed through roomId in Booking

    public Room() {
    }

    public Room(String id, String name, String description, List<String> images,
                List<String> facilities, double price, boolean available, String roomTypeId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.images = images;
        this.facilities = facilities;
        this.price = price;
        this.available = available;
        this.roomTypeId = roomTypeId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public List<String> getFacilities() {
        return facilities;
    }

    public void setFacilities(List<String> facilities) {
        this.facilities = facilities;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public String getRoomTypeId() {
        return roomTypeId;
    }

    public void setRoomTypeId(String roomTypeId) {
        this.roomTypeId = roomTypeId;
    }
}