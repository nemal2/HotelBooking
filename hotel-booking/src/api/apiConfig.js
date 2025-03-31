const API_BASE_URL = 'http://51.21.2.214:8080/api';

export const endpoints = {
  rooms: `${API_BASE_URL}/rooms`,
  roomTypes: `${API_BASE_URL}/room-types`,
  bookings: `${API_BASE_URL}/bookings`,
  auth: `${API_BASE_URL}/auth`,   // For login/register
  users: `${API_BASE_URL}/users`, // For user profiles
};

export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'An error occurred');
  }
  
  return response.json();
};