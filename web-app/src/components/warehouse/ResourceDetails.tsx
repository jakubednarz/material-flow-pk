import React from "react";
import { Typography, Chip, Divider } from "@mui/material";
import {
  NoPhotographyRounded,
  Edit,
  CalendarToday,
  Inventory,
} from "@mui/icons-material";
import { CustomDialog } from "../CustomDialog";
import StockProgressBar from "./StockProgressBar";

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
  description?: string;
  type: string;
  min_stock: number;
  quantity: number;
  created_at: string;
  updated_at?: string;
  image_url?: string;
  suppliers?: Supplier[];
  manufacturer?: string;
};

interface ResourceDetailsProps {
  resource: Resource;
  isDialogOpen: boolean;
  handleDialogClose: () => void;
}

const ResourceDetails: React.FC<ResourceDetailsProps> = ({
  resource,
  isDialogOpen,
  handleDialogClose,
}) => {
  const isLowStock = resource.quantity < resource.min_stock;
  const stockStatusColor = isLowStock ? "text-red-600" : "text-green-600";

  return (
    <CustomDialog
      isOpen={isDialogOpen}
      onClose={handleDialogClose}
      className="w-4/6"
    >
      <div className="bg-white overflow-hidden mx-auto">
        <div className="relative h-48 w-full bg-gray-300 flex items-center justify-center">
          <NoPhotographyRounded
            sx={{
              width: "6rem",
              height: "6rem",
              color: "rgba(255,255,255,0.7)",
            }}
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="flex-grow">
              <Typography variant="h3" className="font-bold">
                {resource.name}
              </Typography>

              <div className="flex space-x-3 mt-2">
                <Chip
                  label={`${resource.code}`}
                  variant="filled"
                  className="text-base font-semibold"
                  sx={{ backgroundColor: "#36a0fc", color: "#fff" }}
                />
                <Chip
                  label={`${resource.type}`}
                  variant="filled"
                  className="text-base font-semibold"
                  sx={{ backgroundColor: "#7e22ce", color: "#fff" }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Typography variant="h6" className="text-gray-700">
              Stock Information
            </Typography>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Typography variant="subtitle1" className="text-gray-600 mb-2">
                  Current Stock
                  <span className={`ml-2 ${stockStatusColor}`}>
                    {isLowStock && "(Low Stock!)"}
                  </span>
                </Typography>
                <div className="flex items-center space-x-3">
                  <Inventory className="text-gray-400" />
                  <Typography variant="h5" className="font-bold">
                    {resource.quantity}
                  </Typography>
                </div>
              </div>
              <div>
                <Typography variant="subtitle1" className="text-gray-600 mb-2">
                  Minimum Stock Threshold
                </Typography>
                <div className="flex items-center space-x-3">
                  <Inventory className="text-gray-400" />
                  <Typography variant="h5" className="font-bold">
                    {resource.min_stock}
                  </Typography>
                </div>
              </div>
            </div>
            <StockProgressBar
              currentStock={resource.quantity}
              minStock={resource.min_stock}
              isLowStock={isLowStock}
            />
          </div>

          <div>
            <Typography variant="h6" className="text-gray-700 mb-2">
              Description
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              {resource.description || "No description available"}
            </Typography>
          </div>

          {resource.suppliers && resource.suppliers.length > 0 && (
            <div>
              <Typography variant="h6" className="text-gray-700 mb-4">
                Suppliers
              </Typography>
              <div className="grid md:grid-cols-2 gap-4">
                {resource.suppliers.map((supplier) => (
                  <div
                    key={supplier.id}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm"
                  >
                    <Typography variant="subtitle1" className="font-semibold">
                      {supplier.name}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Contact: {supplier.contact}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Address: {supplier.address}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Divider className="my-4" />
          <div className="flex flex-col space-y-2 text-gray-700">
            <div className="flex items-center space-x-2">
              <CalendarToday fontSize="small" />
              <Typography variant="body2">
                Created: {new Date(resource.created_at).toLocaleString()}
              </Typography>
            </div>
            {resource.updated_at && (
              <div className="flex items-center space-x-2">
                <Edit fontSize="small" />
                <Typography variant="body2">
                  Last Updated: {new Date(resource.updated_at).toLocaleString()}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </CustomDialog>
  );
};

export default ResourceDetails;
