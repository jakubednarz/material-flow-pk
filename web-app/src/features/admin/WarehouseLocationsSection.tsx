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
  zone: string;
  rack: string;
  level: string;
  position: string;
};

const pallets: Pallet[] = [
  {
    id: "1",
    materialId: "1",
    zone: "1",
    rack: "3",
    level: "2",
    position: "23",
  },
];

const WarehouseLocationsSection: React.FC = () => {
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
      <Typography variant="h5">Warehouse Locations</Typography>

      <TableContainer component={Paper} sx={{ boxShadow: "none", mt: 2 }}>
        <Table size="small">
          <TableHead className="bg-celestial bg-opacity-10">
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Zone</TableCell>
              <TableCell>Rack</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPallets.map((pallet) => (
              <TableRow key={pallet.id}>
                <TableCell>{pallet.zone}</TableCell>
                <TableCell>{pallet.rack}</TableCell>
                <TableCell>{pallet.level}</TableCell>
                <TableCell>{pallet.position}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Section>
  );
};

export default WarehouseLocationsSection;
