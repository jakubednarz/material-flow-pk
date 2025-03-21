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

interface User {
  id: string;
  username: string;
  email?: string;
  first_name: string;
  last_name: string;
  role: string;
  disabled: boolean;
}

const usersData: User[] = [
  {
    id: "1",
    username: "jdoe",
    email: "jdoe@example.com",
    first_name: "John",
    last_name: "Doe",
    role: "Admin",
    disabled: false,
  },
  {
    id: "2",
    username: "asmith",
    email: "asmith@example.com",
    first_name: "Alice",
    last_name: "Smith",
    role: "Warehouse Worker",
    disabled: false,
  },
  {
    id: "3",
    username: "bwayne",
    email: "bwayne@example.com",
    first_name: "Bruce",
    last_name: "Wayne",
    role: "Logistics Specialist",
    disabled: true,
  },
];

const ListUsersSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEditUser = (id: string) => {
    console.log("Edit user:", id);
  };

  const filteredUsers = usersData.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Table>
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
                    onClick={() => handleEditUser(user.id)}
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
    </Section>
  );
};

export default ListUsersSection;
