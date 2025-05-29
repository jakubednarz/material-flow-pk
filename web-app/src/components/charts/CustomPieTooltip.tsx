import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface TooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomPieTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <Card
        sx={{
          minWidth: 150,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            {data.payload.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Count: {data.value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Percentage: {data.payload.percentage}%
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default CustomPieTooltip;
