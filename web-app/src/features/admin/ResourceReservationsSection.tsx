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

type Reservation = {
  id: string;
  type: string;
  date: string;
  status: string;
  productionProcess: string;
};

const reservations: Reservation[] = [
  {
    id: "1",
    type: "Material",
    date: "2024-03-20",
    status: "Active",
    productionProcess: "Production Order #123",
  },
  {
    id: "2",
    type: "Product",
    date: "2024-03-21",
    status: "Fulfilled",
    productionProcess: "Production Order #124",
  },
];

const ResourceReservationsSection: React.FC = () => {
  const [searchType, setSearchType] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const filteredReservations = reservations.filter((reservation) => {
    return (
      (searchType === "" || reservation.type === searchType) &&
      (searchDate === "" || reservation.date === searchDate) &&
      (searchStatus === "" || reservation.status === searchStatus)
    );
  });

  return (
    <Section>
      <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
        Resource Reservations
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
            <MenuItem value="Material">Material</MenuItem>
            <MenuItem value="Product">Product</MenuItem>
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
        <FormControl variant="outlined" className="flex-grow">
          <InputLabel>Status</InputLabel>
          <Select
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Fulfilled">Fulfilled</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table size="small">
          <TableHead className="bg-celestial bg-opacity-10">
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Production Process</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.type}</TableCell>
                <TableCell>{reservation.date}</TableCell>
                <TableCell>{reservation.status}</TableCell>
                <TableCell>{reservation.productionProcess}</TableCell>
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

export default ResourceReservationsSection;
