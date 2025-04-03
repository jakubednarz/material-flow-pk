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
  Button,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

type Order = {
  id: string;
  status: "New" | "In Progress" | "Completed" | "Cancelled";
  created_at: string;
  expected_completion: string;
  source: string;
  priority: "Low" | "Medium" | "High";
  item_count: number;
};

const orders: Order[] = [
  {
    id: "ORD-2025-0001",
    status: "New",
    created_at: "2025-04-01T10:00:00Z",
    expected_completion: "2025-04-10T10:00:00Z",
    source: "Warehouse A",
    priority: "High",
    item_count: 5,
  },
  {
    id: "ORD-2025-0002",
    status: "In Progress",
    created_at: "2025-03-28T14:30:00Z",
    expected_completion: "2025-04-05T14:30:00Z",
    source: "Supplier X",
    priority: "Medium",
    item_count: 10,
  },
  {
    id: "ORD-2025-0003",
    status: "Completed",
    created_at: "2025-03-20T09:00:00Z",
    expected_completion: "2025-03-25T09:00:00Z",
    source: "Warehouse C",
    priority: "Low",
    item_count: 3,
  },
];

const ListOrdersSection: React.FC = () => {
  const [searchPriority, setSearchPriority] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      (searchPriority === "" || order.priority === searchPriority) &&
      (searchStatus === "" || order.status === searchStatus) &&
      (searchDate === "" || order.created_at.startsWith(searchDate))
  );

  return (
    <>
      <div className="flex gap-4 my-4">
        <FormControl variant="outlined" className="flex-grow">
          <InputLabel>Filter by Priority</InputLabel>
          <Select
            value={searchPriority}
            onChange={(e) => setSearchPriority(e.target.value)}
            label="Filter by Priority"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className="flex-grow">
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
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
          label="Filter by Date"
          variant="outlined"
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          className="flex-grow"
        />
      </div>

      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table size="small">
          <TableHead className="bg-celestial bg-opacity-10">
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Expected Completion</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  {new Date(order.expected_completion).toLocaleDateString()}
                </TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.priority}</TableCell>
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
                  <IconButton
                    onClick={() => console.log("Approve Order", order.id)}
                  >
                    <CheckIcon color="success" />
                  </IconButton>
                  <IconButton
                    onClick={() => console.log("Reject Order", order.id)}
                  >
                    <CloseIcon color="error" />
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
