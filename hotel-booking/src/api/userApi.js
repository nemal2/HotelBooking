import { endpoints, fetchWithAuth } from './apiConfig';

export const login = async (credentials) => {
  try {
    const response = await fetchWithAuth(`${endpoints.users}/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    console.log("Raw login response:", response);
    
    // If your backend returns a different structure, transform it here
    // For example, if your backend doesn't return a 'user' object:
    if (!response.user && response.id) {
      // Transform response if needed
      return {
        user: {
          id: response.id,
          email: response.email,
          // other fields...
        },
        token: response.token || response.accessToken
      };
    }
    
    return response;
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};

export const register = async (userData) => {
  return fetchWithAuth(`${endpoints.users}/register`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const getUserProfile = async (userId) => {
  return fetchWithAuth(`${endpoints.users}/${userId}`);
};

export const updateUserProfile = async (userId, userData) => {
  return fetchWithAuth(`${endpoints.users}/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
};