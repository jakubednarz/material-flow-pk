import axios from "axios";
import qs from "qs";

export const authApi = {
  login: async (username: string, password: string) => {
    try {
      const data = qs.stringify({
        username: username,
        password: password,
        grant_type: "password",
      });

      const response = await axios.post(`/auth/token`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await axios.post(`/auth/logout`, null, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      const response = await axios.get(`/auth/me`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
