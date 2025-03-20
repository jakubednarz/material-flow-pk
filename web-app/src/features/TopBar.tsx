import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const TopBar: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AppBar position="sticky" sx={{ boxShadow: 0, backgroundColor: 'white', borderBottom: '1px solid #e0e0e0' }}>
      <Toolbar className="flex justify-between">
        <div className="flex items-center">
          <img src="/cube.png" alt="Cube" className="w-6 mr-2" />
          <Typography variant="h6" className="text-black">
            MaterialFlow
          </Typography>
        </div>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleLogout}
          sx={{
            ":hover": {
              filter: "invert(0.3) sepia(0.99) saturate(20) hue-rotate(195deg) contrast(0.95) opacity(0.8)"
            }
          }}
        >
          <img src="/logout_icon.png" alt="User" className="w-6" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;