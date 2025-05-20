import axios from 'axios';
import config from '../config'

const API_URL = `${config.baseURL}/auth`;

export const login = async (credentials: { username: string; password: string,userType: string }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw { success: false, message: 'Login failed' };
  }
};