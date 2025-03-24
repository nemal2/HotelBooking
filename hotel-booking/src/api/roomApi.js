import { endpoints, fetchWithAuth } from './apiConfig';

export const getAllRooms = async () => {
  return fetchWithAuth(endpoints.rooms);
};

export const getRoomById = async (id) => {
  return fetchWithAuth(`${endpoints.rooms}/${id}`);
};

export const getAvailableRooms = async () => {
  return fetchWithAuth(`${endpoints.rooms}/available`);
};

export const getRoomsByType = async (typeId) => {
  return fetchWithAuth(`${endpoints.rooms}/type/${typeId}`);
};

export const getAvailableRoomsByType = async (typeId) => {
  return fetchWithAuth(`${endpoints.rooms}/type/${typeId}/available`);
};

export const checkRoomAvailability = async (roomId, checkIn, checkOut) => {
  // Format dates to ISO string and extract the date portion
  const formattedCheckIn = checkIn instanceof Date 
    ? checkIn.toISOString().split('T')[0] 
    : checkIn;
  
  const formattedCheckOut = checkOut instanceof Date 
    ? checkOut.toISOString().split('T')[0] 
    : checkOut;
  
  return fetchWithAuth(
    `${endpoints.rooms}/${roomId}/available?checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}`
  );
};

// This function is for the RoomDetailPage to fetch the room type
export const getRoomTypeById = async (typeId) => {
  // Using room-types endpoint instead
  return fetchWithAuth(`${endpoints.roomTypes}/${typeId}`);
};