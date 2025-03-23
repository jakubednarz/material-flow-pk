import React, { useState } from "react";
import Section from "../../components/Section";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
} from "@mui/material";

type Resource = {
  id: string;
  name: string;
  quantity: number;
  type: string;
};

const resources: Resource[] = [
  { id: "1", name: "Material A", quantity: 100, type: "Material" },
  { id: "2", name: "Product B", quantity: 50, type: "Product" },
  { id: "3", name: "BOM C", quantity: 30, type: "BOM" },
  // Add more resources as needed
];

const ResourcesCatalogSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchId, setSearchId] = useState("");

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchTypeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSearchType(e.target.value as string);
  };

  const handleSearchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
  };

  const filteredResources = resources.filter((resource) => {
    return (
      (searchTerm === "" ||
        resource.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (searchType === "" || resource.type === searchType) &&
      (searchId === "" || resource.id.includes(searchId))
    );
  });

  return (
    <Section>
      <Typography variant="h5">Resources Catalog</Typography>

      <div className="flex gap-4 my-4">
        <TextField
          label="Search by ID"
          variant="outlined"
          value={searchId}
          onChange={handleSearchIdChange}
          className="flex-grow"
        />
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="flex-grow"
        />
        <FormControl variant="outlined" className="flex-grow">
          <InputLabel>Search by Type</InputLabel>
          <Select
            value={searchType}
            onChange={() => handleSearchTypeChange}
            label="Search by Type"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="Material">Material</MenuItem>
            <MenuItem value="Product">Product</MenuItem>
            <MenuItem value="BOM">BOM</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table size="small">
          <TableHead className="bg-celestial bg-opacity-10">
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Details</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell>{resource.id}</TableCell>
                <TableCell>{resource.name}</TableCell>
                <TableCell>{resource.type}</TableCell>
                <TableCell align="center">{resource.quantity}</TableCell>
                <TableCell align="center">
                  <IconButton>
                    <RemoveRedEyeIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => console.log("")}
                    sx={{ bgcolor: "#36a0fc" }}
                  >
                    Track
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

export default ResourcesCatalogSection;
