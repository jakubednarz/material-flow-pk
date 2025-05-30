import axios from "axios";

export const usersApi = {
  getUsers: async () => {
    try {
      const response = await axios.get(`/users/users/`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (updatedUser: any) => {
    try {
      const response = await axios.put(
        `/users/users/${updatedUser.id}`,
        updatedUser,
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (userId: any) => {
    try {
      const response = await axios.get(`/users/users`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  createUser: async (newUser: any) => {
    try {
      const response = await axios.post(`/users/create/`, newUser, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
