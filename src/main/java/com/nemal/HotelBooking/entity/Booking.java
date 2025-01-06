package com.nemal.HotelBooking.entity;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "bookings")
public class Booking {

    @Id
    private String id;

    @NotBlank(message = "Checkin date is required")
    private String checkInDate;

    @NotBlank(message = "Checkout date is required")
    private String checkOutDate;

    @NotBlank(message = "Number of adults is required")
    @Min(value = 1, message = "Number of adults must be greater than 0")
    private int numOfAdults;

    @NotBlank(message = "Number of children is required")
    @Min(value = 0, message = "Number of children must be greater than or equal to 0")
    private int numOfChildren;

    private int totalNumOfGuests;

    private String bookingConfirmationCode;

    @DBRef
    private User user;
    @DBRef
    private Room room;

    public void totalNumOfGuests() {
        this.totalNumOfGuests = this.numOfAdults + this.numOfChildren;
    }

    public void setNumOfAdults(int numOfAdults) {
        this.numOfAdults = numOfAdults;
        totalNumOfGuests();
    }

    public void setNumOfChildren(int numOfChildren) {
        this.numOfChildren = numOfChildren;
        totalNumOfGuests();
    }
    @Override
    public String toString() {
        return "Booking{" +
                "id='" + id + '\'' +
                ", checkInDate='" + checkInDate + '\'' +
                ", checkOutDate='" + checkOutDate + '\'' +
                ", numOfAdults=" + numOfAdults +
                ", numOfChildren=" + numOfChildren +
                ", totalNumOfGuests=" + totalNumOfGuests +
                ", bookingConfirmationCode='" + bookingConfirmationCode + '\'' +
                '}';
    }
}
