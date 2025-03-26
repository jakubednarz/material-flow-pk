import React, { useState } from "react";
import Section from "../../components/Section";
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

type Resource = {
  id: string;
  name: string;
};

const resources: Resource[] = [
  { id: "1", name: "Steel Sheet" },
  { id: "2", name: "Aluminum Rod" },
  { id: "3", name: "Plastic Cover" },
];

const ReserveResourceSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResources, setFilteredResources] =
    useState<Resource[]>(resources);
  const [selectedResource, setSelectedResource] = useState<string>("");
  const [quantity, setQuantity] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredResources(
      resources.filter(
        (resource) =>
          resource.name.toLowerCase().includes(term) ||
          resource.id.includes(term)
      )
    );
  };

  const handleReserve = () => {
    console.log(`Reserved ${quantity} of ${selectedResource}`);
    setSelectedResource("");
    setQuantity("");
    setSearchTerm("");
    setFilteredResources(resources);
  };

  return (
    <Section>
      <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
        Reserve Resource
      </Typography>
      <div className="flex gap-4 mb-4">
        <TextField
          label="Name or ID"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-grow w-1/6"
        />
        <FormControl variant="outlined" className="flex-grow w-1/3">
          <InputLabel>Select Resource</InputLabel>
          <Select
            value={selectedResource}
            onChange={(e) => setSelectedResource(e.target.value)}
            label="Select Resource"
          >
            {filteredResources.map((resource) => (
              <MenuItem key={resource.id} value={resource.name}>
                {resource.name} (ID: {resource.id})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Quantity"
          variant="outlined"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="flex-grow w-1/6"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleReserve}
          sx={{ minWidth: "150px" }}
          disabled={!selectedResource || !quantity}
        >
          Reserve
        </Button>
      </div>
    </Section>
  );
};

export default ReserveResourceSection;
