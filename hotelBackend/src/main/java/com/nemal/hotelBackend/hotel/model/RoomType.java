package com.nemal.hotelBackend.hotel.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "room_types")
public class RoomType {
    @Id
    private String id;

    private String name;
    private String imageUrl;;
    private String phrase;

    // In MongoDB, we don't explicitly define the relationship
    // The relationship will be managed through roomTypeId in Room

    public RoomType() {
    }

    public RoomType(String id, String name, String imageUrl, String phrase) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.phrase = phrase;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getPhrase() {
        return phrase;
    }

    public void setPhrase(String phrase) {
        this.phrase = phrase;
    }
}
