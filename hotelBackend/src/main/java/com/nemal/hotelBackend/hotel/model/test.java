package com.nemal.hotelBackend.hotel.model;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import java.io.IOException;
import java.util.Map;

public class test {

    public static void main(String[] args) {
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dnqsbugv9",
                "api_key", "297946285469993",
                "api_secret", "ZIBC_iN4QlapDtqjic1hwX0_13E"
        ));

        try {
            Map result = cloudinary.uploader().upload("E:\\6_semester\\Dev-ops\\project\\sucess1\\hotel-booking\\public\\assets/room3.jpg", ObjectUtils.emptyMap());
            System.out.println("Upload Successful: " + result.get("secure_url"));
        } catch (IOException e) {
            System.out.println("Error uploading image: " + e.getMessage());
        }
    }

}
