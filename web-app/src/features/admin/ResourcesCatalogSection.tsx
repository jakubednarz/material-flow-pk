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
import ResourceDetails from "../../components/warehouse/ResourceDetails";

type Supplier = {
  id: string;
  name: string;
  contact: string;
  address: string;
};

type Resource = {
  id: string;
  name: string;
  code: string;
  description: string;
  type: string;
  min_stock: number;
  current_stock: number;
  created_at: string;
  updated_at?: string;
  image_url?: string;
  manufacturer?: string;
  suppliers?: Supplier[];
};

const resources: Resource[] = [
  {
    id: "1",
    name: "Steel Sheet",
    code: "MAT-001",
    description:
      "High-quality steel sheet for construction, ideal for structural applications and precision engineering",
    type: "Material",
    min_stock: 20,
    current_stock: 8,
    created_at: "2024-03-10T10:15:00Z",
    updated_at: "2024-03-20T12:30:00Z",
    manufacturer: "GlobalSteel Industries",
    image_url: "/images/steel-sheet.jpg",
    suppliers: [
      {
        id: "sup-001",
        name: "MetalWorks Supplies Inc.",
        contact: "John Doe",
        address: "123 Industrial Park, Pittsburgh, PA 15201",
      },
      {
        id: "sup-002",
        name: "Precision Metal Solutions",
        contact: "Sarah Johnson",
        address: "456 Manufacturing Lane, Cleveland, OH 44101",
      },
    ],
  },
  {
    id: "2",
    name: "Aluminum Rod",
    code: "MAT-002",
    description:
      "Lightweight aluminum rod for manufacturing, perfect for aerospace and automotive industries",
    type: "Product",
    min_stock: 10,
    current_stock: 80,
    created_at: "2024-02-15T08:45:00Z",
    manufacturer: "AluminumTech Corp",
    image_url: "/images/aluminum-rod.jpg",
    suppliers: [
      {
        id: "sup-003",
        name: "Advanced Metal Suppliers",
        contact: "Mike Rodriguez",
        address: "789 Metallurgy Road, Detroit, MI 48201",
      },
    ],
  },
  {
    id: "3",
    name: "Plastic Cover",
    code: "MAT-003",
    description:
      "Durable plastic cover for electronic devices, manufactured with high-impact resistant materials",
    type: "BOM",
    min_stock: 50,
    current_stock: 120,
    created_at: "2024-01-20T14:00:00Z",
    updated_at: "2024-03-18T09:20:00Z",
    manufacturer: "PolyTech Innovations",
    image_url: "/images/plastic-cover.jpg",
    suppliers: [
      {
        id: "sup-004",
        name: "ElectroPlast Solutions",
        contact: "Emily Chen",
        address: "321 Polymer Street, San Jose, CA 95110",
      },
      {
        id: "sup-005",
        name: "Innovative Plastics Inc.",
        contact: "David Kim",
        address: "654 Technology Boulevard, Austin, TX 78701",
      },
    ],
  },
];

const ResourcesCatalogSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchId, setSearchId] = useState("");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchTypeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSearchType(e.target.value as string);
  };

  const handleSearchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
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
                <TableCell align="center">{resource.current_stock}</TableCell>
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
            ))}
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
