import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import LoginLeftSection from './LoginLeftSection';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };
  
  return (
    <div className="flex min-h-screen bg-red" >
      <LoginLeftSection />

      <div className="w-1/2 flex flex-col justify-center p-8" >
        <form onSubmit={handleSubmit} className="w-full max-w-md mt-28">
          <Typography
            variant="h3"
            component="h1"
            className="mb-12 font-bold text-center text-neutral-800"
            sx={{
              marginBottom: "3rem",
            }}
          >
            Login
          </Typography>

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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#1c1c1c',
              '&:hover': {
                backgroundColor: '#2c2c2c',
              },
              textTransform: 'none',
              padding: '12px 0',
              borderRadius: '50px',
              marginTop: '1rem'
            }}
          >
            Login
          </Button>
        </form>
      </div>

            
    </div>
  );
};

export default LoginForm;