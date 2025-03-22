import React, { useState } from "react";
import Section from "../../components/Section";
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CreateUserForm from "../../components/forms/CreateUserForm";

const CreateUserSection: React.FC = () => {
  const roles = [
    { value: "admin", label: "Administrator" },
    { value: "warehouse_worker", label: "Warehouse Worker" },
    { value: "logistic_specialist", label: "Logistics Specialist" },
    { value: "production_planner", label: "Production Planner" },
  ];

  const [selectedRole, setSelectedRole] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRoleChange = (event: any) => {
    setSelectedRole(event.target.value);
  };

  const handleCreateUser = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleFormSubmit = (userData: {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => {
    console.log("User Created:", { ...userData, role: selectedRole });
    setIsDialogOpen(false);
  };

  return (
    <Section>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Create User
      </Typography>

      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <InputLabel>Select Role</InputLabel>
        <Select onChange={handleRoleChange} label="Select Role">
          {roles.map((role) => (
            <MenuItem key={role.value} value={role.value}>
              {role.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        size="large"
        disabled={!selectedRole}
        onClick={handleCreateUser}
        sx={{ marginTop: ".5rem", bgcolor: "#36a0fc", width: "100%" }}
      >
        Create
      </Button>

      <CreateUserForm
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleFormSubmit}
      />
    </Section>
  );
};

export default CreateUserSection;
