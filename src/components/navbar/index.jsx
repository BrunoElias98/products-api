import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function Navbar({ position, color, variant, text, letterSize }) {
  return (
    <div>
      <AppBar position={position}>
        <Toolbar variant={variant}>
          <Typography variant={letterSize} color={color}>
            {text}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}