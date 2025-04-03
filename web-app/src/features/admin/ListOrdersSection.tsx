import React, { useState } from "react";
import {
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
  IconButton,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";

type Order = {
  id: string;
  status: "New" | "In Progress" | "Completed" | "Cancelled";
  created_at: string;
  expected_completion: string;
  source: string;
  destination: string;
  item_count: number;
};

const orders: Order[] = [
  {
    id: "ORD-2025-0001",
    status: "New",
    created_at: "2025-04-01T10:00:00Z",
    expected_completion: "2025-04-10T10:00:00Z",
    source: "Warehouse A",
    destination: "Production Line 1",
    item_count: 5,
  },
  {
    id: "ORD-2025-0002",
    status: "In Progress",
    created_at: "2025-03-28T14:30:00Z",
    expected_completion: "2025-04-05T14:30:00Z",
    source: "Supplier X",
    destination: "Warehouse B",
    item_count: 10,
  },
  {
    id: "ORD-2025-0003",
    status: "Completed",
    created_at: "2025-03-20T09:00:00Z",
    expected_completion: "2025-03-25T09:00:00Z",
    source: "Warehouse C",
    destination: "Production Line 2",
    item_count: 3,
  },
];

const ListOrdersSection: React.FC = () => {
  const [searchId, setSearchId] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const handleSearchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
  };

  const handleSearchStatusChange = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSearchStatus(e.target.value as string);
  };

  const handleSearchDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDate(e.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    return (
      (searchId === "" ||
        order.id.toLowerCase().includes(searchId.toLowerCase())) &&
      (searchStatus === "" || order.status === searchStatus) &&
      (searchDate === "" || order.created_at.startsWith(searchDate))
    );
  });

  return (
    <>
      <div className="flex gap-4 my-4">
        <TextField
          label="Search by ID"
          variant="outlined"
          value={searchId}
          onChange={handleSearchIdChange}
          className="flex-grow"
        />
        <FormControl variant="outlined" className="flex-grow">
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={searchStatus}
            onChange={() => handleSearchStatusChange}
            label="Filter by Status"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Filter by Date (YYYY-MM-DD)"
          variant="outlined"
          type="date"
          value={searchDate}
          onChange={handleSearchDateChange}
          InputLabelProps={{ shrink: true }}
          className="flex-grow"
        />
      </div>

      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table size="small">
          <TableHead className="bg-celestial bg-opacity-10">
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  {new Date(order.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => console.log("View Details", order.id)}
                  >
                    <RemoveRedEyeIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => console.log("Edit Order", order.id)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListOrdersSection;
