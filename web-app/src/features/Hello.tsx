import { Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../hooks/useAuth";

const Hello: React.FC = () => {
  const { currentUser } = useAuth();
  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh] text-center">
      <img src="/cube.png" className="max-w-xs w-44 opacity-25 mb-4" />
      <Typography className="opacity-10" sx={{ fontSize: "6rem" }}>
        Welcome {currentUser?.username ?? ""}
      </Typography>
    </div>
  );
};

export default Hello;
