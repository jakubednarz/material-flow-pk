import React from "react";
import { Box, Typography } from "@mui/material";
import { SxProps } from "@mui/system";

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  headerBgClass?: string;
  titleClass?: string;
  children: React.ReactNode;
  className?: string;
  sx?: SxProps;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  icon,
  headerBgClass = "bg-celestial bg-opacity-10",
  titleClass = "text-gray-900",
  children,
  className = "",
  sx = {},
}) => {
  return (
    <Box
      className={`bg-white rounded-xl shadow-sm mb-6 overflow-hidden ${className}`}
      sx={sx}
    >
      <Box
        className={`px-5 py-3 border-b border-celestial border-opacity-15 flex items-center gap-2 ${headerBgClass}`}
      >
        {icon}
        <Typography className={`font-semibold ${titleClass}`}>
          {title}
        </Typography>
      </Box>
      <Box className="p-4">{children}</Box>
    </Box>
  );
};

export default InfoCard;
