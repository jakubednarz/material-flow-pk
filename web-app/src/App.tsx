import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./Router";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
