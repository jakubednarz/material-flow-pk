import React, { useState } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { CustomDialog } from "../../components/CustomDialog";

interface EditUserFormProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onSubmit: (updatedUser: any) => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  isOpen,
  onClose,
  user,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev: typeof formData) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (event: any) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      role: event.target.value as string,
    }));
  };

  const handleDisabledChange = () => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      disabled: !prev.disabled,
    }));
  };

  const handleFormSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <CustomDialog isOpen={isOpen} onClose={onClose} className="w-1/3">
      <Typography variant="h6" sx={{ mb: 2 }}>
        Edit Account
      </Typography>

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
        label="Email"
        name="email"
        variant="outlined"
        value={formData.email}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

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
        label="PESEL"
        name="pesel"
        variant="outlined"
        value={formData.pesel || ""}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Phone Number"
        name="phone_number"
        variant="outlined"
        value={formData.phone_number || ""}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Address"
        name="address"
        variant="outlined"
        value={formData.address || ""}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        sx={{ mb: 2 }}
        control={
          <Switch checked={formData.disabled} onChange={handleDisabledChange} />
        }
        label="Disabled"
      />

      <Button
        variant="contained"
        size="large"
        onClick={handleFormSubmit}
        sx={{ bgcolor: "#36a0fc", width: "100%" }}
      >
        Save Changes
      </Button>
    </CustomDialog>
  );
};

export default EditUserForm;
