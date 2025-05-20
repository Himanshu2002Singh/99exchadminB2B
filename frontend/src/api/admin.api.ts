import axios from 'axios';
import config from '../config'

const API_URL = `${config.baseURL}/admin`;

interface AdminCreateData {
  name: string;
  username: string;
  password: string;
  role: string;
  balance: number;
  downline_share: number;
  created_by: number;
}

export const createAdmin = async (data: AdminCreateData, token: string) => {
  try {
    const response = await axios.post(`${API_URL}/create`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        // Clear invalid credentials
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to create admin');
    }
    throw new Error('Network error occurred');
  }
};

// getDownline function remains the same
export const getDownline = async (id: string, token: string) => {
    try {
      const response = await axios.get(`${API_URL}/downline/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw { success: false, message: 'Something went wrong' };
    }
  };