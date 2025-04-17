import React from "react";
import InfoCard from "./InfoCard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Box, Typography } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";

interface ProductEntry {
  productId: string;
  productName: string;
  quantity: number;
  unit?: string;
  pallets?: string[];
  supplier?: string;
}

type Props = { entries: ProductEntry[] };

const OrderProductsComponent: React.FC<Props> = ({ entries }) => {
  return (
    <InfoCard
      title="Products"
      icon={
        <FormatListBulletedIcon className="text-celestial" fontSize="small" />
      }
      className="relative"
    >
      <Box className="pt-2">
        {entries.map((entry, i) => (
          <Box
            key={i}
            className={i > 0 ? "mt-4 pt-4 border-t border-slate-100" : ""}
          >
            <Box className="flex items-start gap-3">
              <Box className="bg-celestial bg-opacity-10 text-celestial rounded-lg p-2">
                <InventoryIcon />
              </Box>
              <Box className="flex-grow">
                <Box className="flex justify-between">
                  <Typography className="font-medium text-lg">
                    {entry.productName}
                  </Typography>
                  <Box className="bg-slate-100 rounded-full px-3 py-1">
                    <Typography className="text-slate-600 font-medium">
                      {entry.quantity} {entry.unit || "units"}
                    </Typography>
                  </Box>
                </Box>

                {entry.supplier && (
                  <Typography className="text-slate-500 text-sm mt-1">
                    Supplier:{" "}
                    <span className="font-medium">{entry.supplier}</span>
                  </Typography>
                )}

                {entry.pallets?.length ? (
                  <Box className="mt-2">
                    <Typography className="text-slate-500 text-sm mb-1">
                      Locations:
                    </Typography>
                    <Box className="flex flex-wrap gap-1">
                      {entry.pallets.map((p, idx) => (
                        <Box
                          key={idx}
                          className="bg-slate-100 rounded px-2 py-1 text-xs text-slate-600 "
                        >
                          <Typography>{p}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ) : null}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </InfoCard>
  );
};

export default OrderProductsComponent;
