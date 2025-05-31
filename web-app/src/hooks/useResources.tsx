import { useContext } from "react";
import { ResourcesContext } from "../contexts/ResourcesContext";

export const useResources = () => {
  const context = useContext(ResourcesContext);
  if (context === undefined) {
    throw new Error("useResources must be used within a ResourcesProvider");
  }
  return context;
};
