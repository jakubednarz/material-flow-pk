import { Button } from "@mui/material";
import React from "react";

interface SubmitButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      sx={{
        backgroundColor: "#1c1c1c",
        "&:hover": {
          backgroundColor: "#2c2c2c",
        },
        textTransform: "none",
        padding: "12px 0",
        borderRadius: "50px",
        marginTop: "1rem",
      }}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
