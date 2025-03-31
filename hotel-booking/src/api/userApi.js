import { endpoints, fetchWithAuth } from './apiConfig';

export const login = async (credentials) => {
  try {
    const response = await fetchWithAuth(`${endpoints.auth}/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    console.log("Raw login response:", response);
    
    if (!response.user && response.id) {
      return {
        user: {
          id: response.id,
          email: response.email,
          name: response.name,
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
  return fetchWithAuth(`${endpoints.auth}/register`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const getUserProfile = async (userId) => {
  try {
    const response = await fetchWithAuth(`${endpoints.users}/${userId}`);
    return response;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await fetchWithAuth(`${endpoints.users}/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    return response;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const getContactInformation = async () => {
  try {
    const response = await fetchWithAuth(`${endpoints.info}/contact`);
    return response;
  } catch (error) {
    console.error("Error fetching contact information:", error);
    // Return default contact information if API is not available
    return {
      address: "123 Luxury Avenue, Downtown District",
      phone: "+1 (555) 123-4567",
      email: "info@luxuryhotel.com",
      hours: "24/7"
    };
  }
};

export const sendContactMessage = async (contactData) => {
  try {
    const response = await fetchWithAuth(`${endpoints.info}/contact`, {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
    return response;
  } catch (error) {
    console.error("Error sending contact message:", error);
    throw error;
  }
};