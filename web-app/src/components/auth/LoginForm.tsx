import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import LoginLeftSection from "./LoginLeftSection";
import SubmitButton from "./SubmitButton";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex min-h-screen bg-red">
      <LoginLeftSection />

      <div className="w-1/2 flex flex-col justify-center p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md mt-28">
          <div className="flex items-center justify-center mb-12">
            <img src="/cube.png" alt="Cube" className="w-12 mr-4" />
            <Typography
              variant="h3"
              component="h3"
              className="font-bold text-center text-neutral-800"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Login
            </Typography>
          </div>

          <div className="mb-6">
            <TextField
              fullWidth
              label="Username"
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <TextField
              fullWidth
              label="Password"
              variant="standard"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <SubmitButton>Login</SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
