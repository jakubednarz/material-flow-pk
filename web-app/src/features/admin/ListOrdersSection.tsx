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
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import OrderDetails from "../../components/orders/OrderDetails";

interface ProductEntry {
  productId: string;
  productName: string;
  quantity: number;
  unit?: string; // opcjonalnie, jeśli chcesz dodać np. 'pcs', 'kg'
  pallets?: string[]; // np. ["Pallet A", "Pallet B"]
  supplier?: string;
  price: number;
}
interface Order {
  id: string;
  orderNumber: string;
  type: string;
  direction: string;
  status: string;
  priority: string;
  createdAt: string;
  approvedAt?: string;
  expectedCompletion: string;
  actualCompletion?: string;
  source: string;
  recipient: string;
  requester: string;
  approver?: string;
  itemCount: number;
  totalValue: number;
  currency: string;
  paymentStatus?: "Pending" | "Paid";
  notes?: string;
  entries: ProductEntry[];
}

const orders: Order[] = [
  {
    id: "ORD-2025-0001",
    orderNumber: "ORD-2025-0001",
    type: "Internal",
    direction: "Incoming",
    status: "Approved",
    priority: "High",
    createdAt: "2025-04-01T10:00:00Z",
    approvedAt: "2025-04-02T12:00:00Z",
    expectedCompletion: "2025-04-10T10:00:00Z",
    actualCompletion: "2025-04-09T15:30:00Z",
    source: "Warehouse A",
    recipient: "Production Department",
    requester: "John Doe",
    approver: "Jane Smith",
    itemCount: 8,
    totalValue: 12000.5,
    currency: "USD",
    paymentStatus: "Paid",
    notes: "Urgent delivery required.",
    entries: [
      {
        productId: "P001",
        productName: "Widget A",
        quantity: 4,
        price: 1000,
        pallets: ["Pallet A"],
        supplier: "Supplier Z",
      },
      {
        productId: "P002",
        productName: "Widget B",
        quantity: 4,
        price: 2000,
        pallets: ["Pallet B"],
        supplier: "Supplier Y",
      },
    ],
  },
  {
    id: "ORD-2025-0002",
    orderNumber: "ORD-2025-0002",
    type: "External",
    direction: "Outgoing",
    status: "In Progress",
    priority: "Medium",
    createdAt: "2025-03-28T14:30:00Z",
    approvedAt: "2025-03-29T09:15:00Z",
    expectedCompletion: "2025-04-05T14:30:00Z",
    source: "Supplier X",
    recipient: "Retail Store Y",
    requester: "Alice Johnson",
    approver: "Mark Spencer",
    itemCount: 15,
    totalValue: 25000.75,
    currency: "EUR",
    paymentStatus: "Pending",
    notes: "Partial shipment completed.",
    entries: [
      {
        productId: "P003",
        productName: "Gadget X",
        quantity: 10,
        price: 1500,
        pallets: ["Pallet X1", "Pallet X2"],
        supplier: "Supplier X",
      },
      {
        productId: "P004",
        productName: "Gadget Y",
        quantity: 5,
        price: 2000,
        pallets: ["Pallet Y"],
        supplier: "Supplier X",
      },
    ],
  },
];

const ListOrdersSection: React.FC = () => {
  const [searchStatus, setSearchStatus] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDetailsClick = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter(
    (order) =>
      (searchStatus === "" || order.status === searchStatus) &&
      (searchDate === "" || order.expectedCompletion.startsWith(searchDate))
  );

  return (
    <>
      <div className="flex gap-4 my-4">
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
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
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
          <TableHead>
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
                  {new Date(order.expectedCompletion).toLocaleDateString()}
                </TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.priority}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleDetailsClick(order)}>
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

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          isDialogOpen={isDialogOpen}
          handleDialogClose={handleDialogClose}
        />
      )}
    </>
  );
};

export default ListOrdersSection;
