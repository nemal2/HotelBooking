import axios from "axios";

const API_URL = "http://localhost:8080/api/room-types";

// Function to fetch all room types
export const getAllRoomTypes = async () => {
  try {
    const response = await axios.get(API_URL);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw error;
  }
};

// ✅ Add the missing getRoomTypeById function
export const getRoomTypeById = async (typeId) => {
  try {
    const response = await axios.get(`${API_URL}/${typeId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching room type with ID ${typeId}:`, error);
    throw error;
  }
};
