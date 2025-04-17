import React from "react";
import { Typography, Chip, Button, Box, Grid } from "@mui/material";
import { CustomDialog } from "../CustomDialog";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import CommentIcon from "@mui/icons-material/Comment";
import InfoCard from "./InfoCard";
import TimelineComponent from "./TimelineComponent";
import OrderProductsComponent from "./OrderProductsComponent";

interface ProductEntry {
  productId: string;
  productName: string;
  quantity: number;
  unit?: string;
  pallets?: string[];
  supplier?: string;
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
  currency: string;
  notes?: string;
  entries: ProductEntry[];
}

interface OrderDetailsProps {
  order: Order;
  isDialogOpen: boolean;
  handleDialogClose: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  isDialogOpen,
  handleDialogClose,
}) => {
  return (
    <CustomDialog
      isOpen={isDialogOpen}
      onClose={handleDialogClose}
      className="w-4/6"
    >
      <Box className="min-h-[80vh] relative">
        <Box className="flex justify-between items-center px-6 py-5 bg-white sticky top-0 z-10">
          <Box className="flex items-center gap-3">
            <Box>
              <Typography variant="h3" className="font-bold">
                {order.orderNumber}
              </Typography>
              <Typography className="text-slate-500 text-sm">
                {order.type} • {order.direction}
              </Typography>
            </Box>
          </Box>

          <Box className="flex items-center gap-3">
            <Chip
              label={`${order.status}`}
              variant="filled"
              className="text-base font-semibold"
              sx={{ backgroundColor: "#36a0fc", color: "#fff" }}
            />
            <Chip
              label={`${order.priority}`}
              variant="filled"
              className="text-base font-semibold"
              sx={{ backgroundColor: "#7e22ce", color: "#fff" }}
            />
          </Box>
        </Box>

        <Box className="px-6 py-5">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <InfoCard
                title="Route"
                icon={
                  <LocationOnIcon className="text-celestial" fontSize="small" />
                }
                headerBgClass="bg-celestial bg-opacity-10"
              >
                <Box className="flex justify-between p-2 rounded-lg mb-2">
                  <Typography className="text-slate-500 text-sm">
                    From
                  </Typography>
                  <Typography className="font-medium">
                    {order.source}
                  </Typography>
                </Box>
                <Box className="flex justify-between p-2 rounded-lg">
                  <Typography className="text-slate-500 text-sm">To</Typography>
                  <Typography className="font-medium">
                    {order.recipient}
                  </Typography>
                </Box>
              </InfoCard>

              <InfoCard
                title="People"
                icon={
                  <PersonIcon className="text-celestial" fontSize="small" />
                }
              >
                <Box className="flex justify-between items-center mb-3">
                  <Typography className="text-slate-500 text-sm">
                    Requester
                  </Typography>
                  <Chip
                    label={order.requester}
                    size="small"
                    className="bg-slate-100"
                    avatar={
                      <Box className="w-6 h-6 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 text-xs font-medium">
                        {order.requester.charAt(0)}
                      </Box>
                    }
                  />
                </Box>
                {order.approver && (
                  <Box className="flex justify-between items-center">
                    <Typography className="text-slate-500 text-sm">
                      Approver
                    </Typography>
                    <Chip
                      label={order.approver}
                      size="small"
                      className="bg-slate-100"
                      avatar={
                        <Box className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center text-green-700 text-xs font-medium">
                          {order.approver.charAt(0)}
                        </Box>
                      }
                    />
                  </Box>
                )}
              </InfoCard>

              <TimelineComponent
                createdAt={order.createdAt}
                approvedAt={order.approvedAt}
                expectedCompletion={order.expectedCompletion}
                actualCompletion={order.actualCompletion}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              {order.notes && (
                <InfoCard
                  title="Notes"
                  icon={
                    <CommentIcon className="text-celestial" fontSize="small" />
                  }
                >
                  <Typography className="text-slate-600 whitespace-pre-line">
                    {order.notes}
                  </Typography>
                </InfoCard>
              )}

              <Box className="bg-white rounded-xl shadow-sm overflow-hidden">
                <OrderProductsComponent entries={order.entries} />
              </Box>

              <Box className="flex justify-end mt-6 gap-3">
                <Button
                  variant="contained"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700"
                  startIcon={<EditIcon />}
                >
                  Edit Order
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </CustomDialog>
  );
};

export default OrderDetails;
