package com.nemal.HotelBooking.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "rooms")
public class Room {

    @Id
    private String id;
    private String roomPhotoUrl;
    private String roomType;
    private String roomDescription;
    private int roomPrice;

    @DBRef
    private List<Booking> bookings = new ArrayList<>();

    @Override
    public String toString() {
        return "Room{" +
                "id='" + id + '\'' +
                ", roomPhotoUrl='" + roomPhotoUrl + '\'' +
                ", roomType='" + roomType + '\'' +
                ", roomDescription='" + roomDescription + '\'' +
                ", roomPrice=" + roomPrice +
                '}';
    }
}
