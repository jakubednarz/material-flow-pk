import axios from "axios";

export const resourcesApi = {
  getResources: async () => {
    try {
      const response = await axios.get(`/resources/resources/`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateResource: async (updatedResource: any) => {
    try {
      const response = await axios.put(
        `/resources/resources/${updatedResource.id}`,
        updatedResource,
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteResource: async (resourceId: any) => {
    try {
      const response = await axios.delete(
        `/resources/resources/${resourceId}`,
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  createResource: async (newResource: any) => {
    try {
      const response = await axios.post(`/resources/create/`, newResource, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
