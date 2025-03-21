import React, { useState } from "react";
import Section from "../../components/Section";
import {
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SubmitButton from "../../components/auth/SubmitButton";

const CreateUserSection: React.FC = () => {
  const roles = [
    { value: "admin", label: "Administrator" },
    { value: "warehouse_worker", label: "Warehouse Worker" },
    { value: "logistic_specialist", label: "Logistics Specialist" },
    { value: "production_planner", label: "Production Planner" },
  ];
  const [selectedRole, setSelectedRole] = useState("");
  const [newUser, setNewUser] = useState("");

  const handleRoleChange = (event: any) => {
    setSelectedRole(event.target.value);
  };

  const handleCreateUser = () => {
    if (newUser) {
      setNewUser("");
    }
  };

  return (
    <Section>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Create User
      </Typography>

      <FormControl fullWidth variant="outlined" sx={{ mb: 1 }}>
        <InputLabel>Select Role</InputLabel>
        <Select
          value={selectedRole}
          onChange={handleRoleChange}
          label="Select Role"
        >
          {roles.map((role) => (
            <MenuItem key={role.value} value={role.value}>
              {role.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <SubmitButton onClick={handleCreateUser} disabled={!selectedRole}>
        Create
      </SubmitButton>
    </Section>
  );
};

export default CreateUserSection;
