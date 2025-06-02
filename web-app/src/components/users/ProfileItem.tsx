import { Typography } from "@mui/material";
import React from "react";

interface ProfileItemProps {
  label: string;
  value?: string;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ label, value }) => (
  <div className="flex flex-col">
    <Typography variant="body2" className="text-gray-500 font-medium">
      {label}
    </Typography>
    <Typography variant="body1" className="text-gray-800">
      {value || "—"}
    </Typography>
  </div>
);

export default ProfileItem;
