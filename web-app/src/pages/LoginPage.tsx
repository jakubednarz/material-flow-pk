import React from "react";
import LoginForm from "../components/auth/LoginForm";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-page overflow-hidden h-screen">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
