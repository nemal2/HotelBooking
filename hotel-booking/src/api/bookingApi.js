import { endpoints, fetchWithAuth } from './apiConfig';

export const createBooking = async (bookingData) => {
  return fetchWithAuth(endpoints.bookings, {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });
};

export const getUserBookings = async (userId) => {
  return fetchWithAuth(`${endpoints.bookings}/user/${userId}`);
};

export const cancelBooking = async (bookingId) => {
  return fetchWithAuth(`${endpoints.bookings}/${bookingId}/cancel`, {
    method: 'PUT',
  });
};
