import React, { createContext, ReactNode } from "react";
import { useState, useEffect } from "react";
import { usersApi } from "../api/usersApi";
import { useAuth } from "../hooks/useAuth";
import { User } from "../types/User";

interface UsersContextType {
  users: User[];
  loading: boolean;
  error: Error | null;
  fetchUsers: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  createUser: (user: Omit<User, "id">) => Promise<void>;
}

export const UsersContext = createContext<UsersContextType | undefined>(
  undefined
);

const useUsersManager = () => {
  const { isAuthenticated } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const response = await usersApi.getUsers();
      setUsers(response.data);
      setError(null);
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Nieznany błąd podczas pobierania użytkowników");
      setError(error);
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updatedUser: User) => {
    if (!isAuthenticated) return;
    try {
      const response = await usersApi.updateUser(updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? response.data : user
        )
      );
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Nieznany błąd podczas aktualizacji użytkownika");
      setError(error);
      console.error("Failed to update user:", err);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!isAuthenticated) return;
    try {
      await usersApi.deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Nieznany błąd podczas usuwania użytkownika");
      setError(error);
      console.error("Failed to delete user:", err);
    }
  };

  const createUser = async (newUser: Omit<User, "id">) => {
    if (!isAuthenticated) return;
    try {
      const response = await usersApi.createUser(newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      fetchUsers();
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Nieznany błąd podczas tworzenia użytkownika");
      setError(error);
      console.error("Failed to create user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [isAuthenticated]);

  return {
    users,
    loading,
    error,
    fetchUsers,
    updateUser,
    deleteUser,
    createUser,
  };
};

export const UsersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const usersManager = useUsersManager();

  return (
    <UsersContext.Provider value={usersManager}>
      {children}
    </UsersContext.Provider>
  );
};
