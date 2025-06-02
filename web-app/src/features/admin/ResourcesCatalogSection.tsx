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
  SelectChangeEvent,
} from "@mui/material";
import ResourceDetails from "../../components/warehouse/ResourceDetails";
import { useResources } from "../../hooks/useResources";

type Supplier = {
  id: string;
  name: string;
  contact: string;
  address: string;
};

type Resource = {
  id: string;
  name: string;
  code?: string;
  description?: string;
  type: string;
  min_stock: number;
  quantity?: number;
  created_at?: string;
  updated_at?: string;
  image_url?: string;
  manufacturer?: string;
  suppliers?: Supplier[];
};

const ResourcesCatalogSection: React.FC = () => {
  const { resources = [], error, loading } = useResources();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchTypeChange = (e: SelectChangeEvent) => {
    setSearchType(e.target.value);
  };

  const handleSearchCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCode(e.target.value);
  };

  const handleDetailsClick = (resource: Resource) => {
    setSelectedResource(resource);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedResource(null);
  };

  const filteredResources = resources.filter((resource) => {
    return (
      (searchTerm === "" ||
        resource.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (searchType === "" || resource.type === searchType) &&
      (searchCode === "" || resource.code?.toLowerCase().includes(searchCode))
    );
  });

  return (
    <Section>
      <Typography variant="h5">Resources Catalog</Typography>

      <div className="flex gap-4 my-4">
        <TextField
          label="Search by Code"
          variant="outlined"
          value={searchCode}
          onChange={handleSearchCodeChange}
          className="flex-grow w-1/12"
        />
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="flex-grow w-1/6"
        />
        <FormControl variant="outlined" className="flex-grow">
          <InputLabel>Search by Type</InputLabel>
          <Select
            value={searchType}
            onChange={handleSearchTypeChange}
            label="Search by Type"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="Material">Material</MenuItem>
            <MenuItem value="Product">Product</MenuItem>
            <MenuItem value="BillOfMaterials">BOM</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table size="small">
          <TableHead className="bg-celestial bg-opacity-10">
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Details</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResources.map((resource) => {
              if (!resource) return null;
              return (
                <TableRow key={resource.id}>
                  <TableCell>{resource.code || "N/A"}</TableCell>
                  <TableCell>{resource.name}</TableCell>
                  <TableCell>{resource.type}</TableCell>
                  <TableCell align="center">{resource.quantity}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleDetailsClick(resource)}>
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => console.log("Track")}
                      sx={{ bgcolor: "#36a0fc" }}
                    >
                      Track
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedResource && (
        <ResourceDetails
          resource={selectedResource}
          isDialogOpen={isDialogOpen}
          handleDialogClose={handleDialogClose}
        />
      )}
    </Section>
  );
};

export default ResourcesCatalogSection;
