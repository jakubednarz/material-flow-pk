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
} from "@mui/material";

type Pallet = {
  id: string;
  materialId: string;
  quantity: number;
  batchNumber: string;
  status: string;
};

const pallets: Pallet[] = [
  {
    id: "1",
    materialId: "1",
    quantity: 50,
    batchNumber: "Warehouse 1",
    status: "In stock",
  },
];

const PalletTrackingSection: React.FC = () => {
  const [trackedMaterialId, setTrackedMaterialId] = useState<string | null>(
    null
  );

  const handleTrackClick = (materialId: string) => {
    setTrackedMaterialId(materialId);
  };

  const filteredPallets = pallets.filter(
    (pallet) => pallet.materialId === trackedMaterialId
  );

  return (
    <Section>
      <Typography variant="h5">Pallet Tracking</Typography>

      <TableContainer component={Paper} sx={{ boxShadow: "none", mt: 2 }}>
        <Table size="small">
          <TableHead className="bg-celestial bg-opacity-10">
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Batch number</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPallets.map((pallet) => (
              <TableRow key={pallet.id}>
                <TableCell>{pallet.quantity}</TableCell>
                <TableCell>{pallet.batchNumber}</TableCell>
                <TableCell>{pallet.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Section>
  );
};

export default PalletTrackingSection;
