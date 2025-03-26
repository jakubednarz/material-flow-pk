import React, { useState } from "react";
import { Typography, Button, TextField, Grid } from "@mui/material";
import { CustomDialog } from "../../components/CustomDialog";

interface CreateResourceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (resourceData: {
    name: string;
    code: string;
    type: string;
    minimum_stock: number;
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
    code: "",
    type: "",
    minimum_stock: 0,
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

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Resource Name"
            name="resource_name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Resource Code"
            name="resource_code"
            variant="outlined"
            value={formData.code}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <TextField
        fullWidth
        label="minimum_stock"
        name="minimum_stock"
        type="number"
        variant="outlined"
        value={formData.minimum_stock}
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
