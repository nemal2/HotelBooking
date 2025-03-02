package com.nemal.hotelBackend.hotel.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "users") // Specify the MongoDB collection name
public class User {

    @Id
    private String id; // MongoDB uses String for IDs (ObjectId)

    private String email;
    private String name;
    private String password;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    @JsonIgnore
    private List<Booking> bookings; // Nested documents (if needed, handle serialization separately)

    public User() {
    }

    public User(String id, String email, String name, String password, List<Booking> bookings) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.bookings = bookings;
    }
}
