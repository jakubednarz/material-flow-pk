import { createContext, ReactNode, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { resourcesApi } from "../api/resourcesApi";

interface Resource {
  id: string;
  name: string;
  code?: string;
  description?: string;
  type: string;

  min_stock: number;
  quantity?: number;

  valid_from?: string;
  valid_to?: string;
  is_active?: boolean;

  created_at?: string;
  updated_at?: string;
}

interface ResourcesContextType {
  resources: Resource[];
  loading: boolean;
  error: Error | null;
  fetchResources: () => Promise<void>;
  updateResource: (resource: Resource) => Promise<void>;
  deleteResource: (resourceId: string) => Promise<void>;
  createResource: (resource: Omit<Resource, "id">) => Promise<void>;
}

export const ResourcesContext = createContext<ResourcesContextType | undefined>(
  undefined
);

const useResourcesManager = () => {
  const { isAuthenticated } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchResources = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const response = await resourcesApi.getResources();
      setResources(response.data);
      setError(null);
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Error while fetching resources");
      setError(error);
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateResource = async (updatedResource: Resource) => {
    try {
      const response = await resourcesApi.updateResource(updatedResource);
      setResources((prevResources) =>
        prevResources.map((resource) =>
          resource.id === updatedResource.id ? response.data : resource
        )
      );
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Error while updating resources");
      setError(error);
      console.error("Failed to update resource:", err);
    }
  };

  const deleteResource = async (resourceId: string) => {
    if (!isAuthenticated) return;
    try {
      await resourcesApi.deleteResource(resourceId);
      setResources((prevResources) =>
        prevResources.filter((resource) => resource.id !== resourceId)
      );
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Error while deleting resource");
      setError(error);
      console.error("Failed to delete resource:", err);
    }
  };

  const createResource = async (newResource: Omit<Resource, "id">) => {
    if (!isAuthenticated) return;
    try {
      const response = await resourcesApi.createResource(newResource);
      setResources((prevResources) => [...prevResources, response.data]);
      fetchResources();
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Error while creating resource");
      setError(error);
      console.error("Failed to create resource:", err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [isAuthenticated]);

  return {
    resources,
    loading,
    error,
    fetchResources,
    updateResource,
    deleteResource,
    createResource,
  };
};

export const ResourcesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const resourcesManager = useResourcesManager();

  return (
    <ResourcesContext.Provider value={resourcesManager}>
      {children}
    </ResourcesContext.Provider>
  );
};
