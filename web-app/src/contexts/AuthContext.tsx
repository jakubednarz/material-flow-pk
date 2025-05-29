import React, { createContext, useState, useEffect } from "react";
import { authApi } from "../api/authApi";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  currentUser: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
  currentUser: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await authApi.checkAuth();
        setIsAuthenticated(true);
        const user = await authApi.checkAuth();
        setCurrentUser(user);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      await authApi.login(username, password);
      setIsAuthenticated(true);
      const user = await authApi.checkAuth();
      setCurrentUser(user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setIsAuthenticated(false);
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, currentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
