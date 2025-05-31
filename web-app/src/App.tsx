import React from "react";
import Router from "./Router";
import { AuthProvider } from "./contexts/AuthContext";
import { UsersProvider } from "./contexts/UsersContext";
import { ResourcesProvider } from "./contexts/ResourcesContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <UsersProvider>
        <ResourcesProvider>
          <Router />
        </ResourcesProvider>
      </UsersProvider>
    </AuthProvider>
  );
};

export default App;
