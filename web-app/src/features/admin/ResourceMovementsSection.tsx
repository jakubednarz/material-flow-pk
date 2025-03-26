import React, { useState } from "react";
import Section from "../../components/Section";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

type Movement = {
  id: string;
  type: string;
  date: string;
  orderId: string;
  location: string;
};

const movements: Movement[] = [
  {
    id: "1",
    type: "Receipt",
    date: "2024-03-20",
    orderId: "ORD-001",
    location: "Warehouse 1",
  },
  {
    id: "2",
    type: "Dispatch",
    date: "2024-03-21",
    orderId: "ORD-002",
    location: "Warehouse 2",
  },
];

const ResourceMovementsSection: React.FC = () => {
  const [searchType, setSearchType] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const filteredMovements = movements.filter((movement) => {
    return (
      (searchType === "" || movement.type === searchType) &&
      (searchDate === "" || movement.date === searchDate)
    );
  });

  return (
    <Section>
      <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
        Resource Movements
      </Typography>

      <div className="flex gap-4 mb-4">
        <FormControl variant="outlined" className="flex-grow">
          <InputLabel>Type</InputLabel>
          <Select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            label="Type"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="Receipt">Receipt</MenuItem>
            <MenuItem value="Dispatch">Dispatch</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Date"
          type="date"
          variant="outlined"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="flex-grow"
          InputLabelProps={{ shrink: true }}
        />
      </div>

      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table size="small">
          <TableHead className="bg-celestial bg-opacity-10">
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMovements.map((movement) => (
              <TableRow key={movement.id}>
                <TableCell>{movement.type}</TableCell>
                <TableCell>{movement.date}</TableCell>
                <TableCell>{movement.orderId}</TableCell>
                <TableCell>{movement.location}</TableCell>
                <TableCell>
                  <IconButton>
                    <RemoveRedEyeIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Section>
  );
};

export default ResourceMovementsSection;
