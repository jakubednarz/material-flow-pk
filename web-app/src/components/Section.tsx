import Typography from "@mui/material/Typography";
import React from "react";

interface SectionProps {
  title?: string;
  children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = (p: SectionProps) => {
  return (
    <div className="flex-grow rounded-lg p-4 border bg-white">
      <Typography
        className="text-gray-500"
        sx={{
          fontSize: ".75rem",
          fontWeight: "bold",
          marginBottom: ".3rem",
        }}
      >
        {p.title}
      </Typography>
      {p.children}
    </div>
  );
};

export default Section;
