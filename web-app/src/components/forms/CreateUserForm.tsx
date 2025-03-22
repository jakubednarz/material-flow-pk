import React, { useState } from "react";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import { CustomDialog } from "../../components/CustomDialog";

interface CreateUserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
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
        Create New Account
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="First Name"
            name="first_name"
            variant="outlined"
            value={formData.first_name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="last_name"
            variant="outlined"
            value={formData.last_name}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <TextField
        fullWidth
        label="Username"
        name="username"
        variant="outlined"
        value={formData.username}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        value={formData.password}
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

export default CreateUserForm;
