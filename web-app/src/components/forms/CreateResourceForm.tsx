import React, { useState } from "react";
import { Typography, Button, TextField, Grid } from "@mui/material";
import { CustomDialog } from "../../components/CustomDialog";

interface CreateResourceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (resourceData: {
    name: string;
    type: string;
    min_stock: number;
    description: string;
  }) => void;
}

const CreateResourceForm: React.FC<CreateResourceFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    min_stock: 0,
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <CustomDialog isOpen={isOpen} onClose={onClose} className="w-1/3">
      <Typography variant="h6" sx={{ mb: 2 }}>
        Create New Resource
      </Typography>

      <Grid container sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Resource Name"
          name="name"
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
        />
      </Grid>

      <TextField
        fullWidth
        label="min_stock"
        name="min_stock"
        type="number"
        variant="outlined"
        value={formData.min_stock}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Description"
        name="description"
        variant="outlined"
        value={formData.description}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        size="large"
        onClick={handleFormSubmit}
        sx={{ bgcolor: "#36a0fc", width: "100%" }}
      >
        Submit
      </Button>
    </CustomDialog>
  );
};

export default CreateResourceForm;
