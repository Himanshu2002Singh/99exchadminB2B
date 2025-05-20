import axios from 'axios';
import config from '../config'

const API_URL = `${config.baseURL}/client`;

interface ClientCreateData {
  name: string;
  username: string;
  password: string;
  balance: number;
  created_by: number;
}

export const createClient = async (data: ClientCreateData, token: string) => {
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
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to create client');
    }
    throw new Error('Network error occurred');
  }
};

export const getClientDownline = async (id: string, token: string) => {
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
    throw { success: false, message: 'Something went wrong' };
  }
};