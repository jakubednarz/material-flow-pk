import React, { useState } from "react";
import Section from "../../components/Section";
import { Typography, Button } from "@mui/material";
import { CreateExternalReceiptForm } from "../../components/forms/CreateExternalReceiptForm";

const CreateExternalReceiptSection: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateReceipt = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleFormSubmit = (receiptData: any) => {
    console.log("External Receipt Created:", receiptData);
    setIsDialogOpen(false);
  };

  return (
    <Section>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Create External Receipt
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateReceipt}
        sx={{ minWidth: "150px" }}
      >
        Create
      </Button>

      {isDialogOpen && (
        <CreateExternalReceiptForm
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          onSubmit={handleFormSubmit}
        />
      )}
    </Section>
  );
};

export default CreateExternalReceiptSection;
