import React, { useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Section from "../../components/Section";
import EditUserForm from "../../components/forms/EditUserForm";
import { useUsers } from "../../hooks/useUsers";

interface User {
  id: string;
  username: string;
  email?: string;
  first_name: string;
  last_name: string;
  pesel?: string;
  phone_number?: string;
  address?: string;
  role: string;
  disabled: boolean;
}

const ListUsersSection: React.FC = () => {
  const { users = [], loading, error, updateUser, deleteUser } = useUsers();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const handleUserUpdate = async (updatedUser: User) => {
    await updateUser(updatedUser);
    setIsDialogOpen(false);
  };

  const filteredUsers = users.filter((user) =>
    user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>Błąd: {error.message}</div>;

  return (
    <Section>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Users
      </Typography>

      <TextField
        fullWidth
        label="Search Users"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-6"
      />

      <TableContainer
        component={Paper}
        className="mt-5 rounded-lg"
        sx={{ boxShadow: "none" }}
      >
        <Table size="small">
          <TableHead className="bg-celestial bg-opacity-10">
            <TableRow>
              <TableCell className="font-semibold">Username</TableCell>
              <TableCell className="font-semibold">Name</TableCell>
              <TableCell className="font-semibold">Role</TableCell>
              <TableCell className="font-semibold text-center">
                Status
              </TableCell>
              <TableCell className="font-semibold text-center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-100">
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-center">
                  {user.disabled ? (
                    <span className="text-red-500 font-semibold">Disabled</span>
                  ) : (
                    <span className="text-green-500 font-semibold">Active</span>
                  )}
                </TableCell>

                <TableCell className="text-center">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleEditUser(user)}
                    sx={{ bgcolor: "#36a0fc" }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedUser && (
        <EditUserForm
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          user={selectedUser}
          onSubmit={handleUserUpdate}
        />
      )}
    </Section>
  );
};

export default ListUsersSection;
