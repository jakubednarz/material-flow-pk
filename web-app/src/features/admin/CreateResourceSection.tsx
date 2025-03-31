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
import CreateResourceForm from "../../components/forms/CreateResourceForm";

const CreateResourceSection: React.FC = () => {
  const resources = [
    { value: "material", label: "Material" },
    { value: "bom", label: "BOM Item" },
    { value: "product", label: "Product" },
  ];

  const [selectedResource, setSelectedResource] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleResourceChange = (event: any) => {
    setSelectedResource(event.target.value);
  };

  const handleCreateResource = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleFormSubmit = (userData: {
    name: string;
    code: string;
    type: string;
    minimum_stock: number;
    description: string;
  }) => {
    console.log("User Created:", { ...userData, resource: selectedResource });
    setIsDialogOpen(false);
  };

  return (
    <Section>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Create Resource
      </Typography>

      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <InputLabel>Select Resource Type</InputLabel>
        <Select
          onChange={handleResourceChange}
          value={selectedResource}
          label="Select Resource Type"
        >
          {resources.map((resource) => (
            <MenuItem key={resource.value} value={resource.value}>
              {resource.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        size="large"
        disabled={!selectedResource}
        onClick={handleCreateResource}
        sx={{ marginTop: ".5rem", bgcolor: "#36a0fc", width: "100%" }}
      >
        Create
      </Button>

      <CreateResourceForm
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleFormSubmit}
      />
    </Section>
  );
};

export default CreateResourceSection;
