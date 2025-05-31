import axios from "axios";

export const resourcesApi = {
  getResources: async () => {
    try {
      const response = await axios.get(`/warehouse/resources/`, {
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
        `/warehouse/resources/${updatedResource.id}`,
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
        `/warehouse/resources/${resourceId}`,
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
      const response = await axios.post(`/warehouse/resources/`, newResource, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
