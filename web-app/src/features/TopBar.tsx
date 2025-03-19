import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';

const TopBar: React.FC = () => {
  return (
    <AppBar position="sticky" sx={{ boxShadow: 0, backgroundColor: 'white', borderBottom: '1px solid #e0e0e0' }}>
      <Toolbar className="flex justify-between">
        <div className="flex items-center">
          <img src="/cube.png" alt="Cube" className="w-6 mr-2" />
          <Typography variant="h6" className="text-black">
            MaterialFlow
          </Typography>
        </div>
        <IconButton edge="end" color="inherit">
          <img src="/user_icon.png" alt="User" className="w-6" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;