import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Hello: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
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
