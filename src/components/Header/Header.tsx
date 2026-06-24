import {
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';

import './Header.css';

export default function Header() {
  return (
    <AppBar 
      position="static" 
      className="header-root"
      elevation={0}
    >
      <Toolbar className="header-toolbar">
        <Typography 
          variant="h6" 
          className="header-title"
        >
          Teams Action Tracker
        </Typography>
        <div className="header-actions">
          {/* Add future header actions here */}
        </div>
      </Toolbar>
    </AppBar>
  );
}