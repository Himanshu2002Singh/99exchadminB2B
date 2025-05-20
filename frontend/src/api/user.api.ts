import axios from 'axios';

import config from '../config'

const API_URL = `${config.baseURL}/user`;

export const getUser = async (token: string) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      timeout: 5000 // 5 second timeout
    });
    
    // Ensure response has the expected structure
    if (response.data && response.data.success && response.data.data) {
      return {
        success: true,
        data: response.data.data
      };
    }
    throw new Error('Invalid response structure');
    
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        // Clear invalid credentials
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
      throw {
        success: false,
        message: error.response?.data?.message || 'Authentication failed'
      };
    }
    throw {
      success: false,
      message: error instanceof Error ? error.message : 'Network error'
    };
  }
};