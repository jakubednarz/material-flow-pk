import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./Router";
import { UsersProvider } from "./contexts/UsersContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <UsersProvider>
        <Router />
      </UsersProvider>
    </AuthProvider>
  );
};

export default App;
