import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Box,
} from '@mui/material';

import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import './Header.css';

export default function Header() {

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {

    handleClose();

    logout();

    navigate('/login');

  };

  return (

    <AppBar
      elevation={1}
      position="static"
      className="header-root"
    >

      <Toolbar className="header-toolbar">

        <div>

          <Typography
            variant="h5"
            className="header-title"
          >
            Teams Action Tracker
          </Typography>

          <Typography
            variant="caption"
            className="header-subtitle"
          >
            Meeting Intelligence Platform
          </Typography>

        </div>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >

          <Chip
            label={user?.role}
            size="small"
            sx={{
              backgroundColor:
                user?.role === 'ADMIN'
                  ? '#ffffff'
                  : '#E3F2FD',
              color:
                user?.role === 'ADMIN'
                  ? '#1565C0'
                  : '#0D47A1',
              fontWeight: 700,
            }}
          />

          <IconButton
            onClick={handleOpen}
          >
            {/* 
          
            <Avatar
  sx={{
    bgcolor: '#0D47A1',
    width: 42,
    height: 42,
    fontWeight: 700,
  }}
></Avatar> */}

          </IconButton>

          <div
            className="user-info"
            onClick={handleOpen}
          >

            <Typography
              className="user-name"
              sx={{
                color: '#fff',
                fontWeight: 600,
                fontSize: '15px',
              }}
            >
              {user?.name}
            </Typography>

            <KeyboardArrowDownIcon
              fontSize="small"
            />

          </div>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >

            <MenuItem>

              <AccountCircleIcon
                sx={{ mr: 1 }}
              />

              My Profile

            </MenuItem>
            {user?.role === 'ADMIN' && (
              <MenuItem>

                <SettingsIcon
                  sx={{ mr: 1 }}
                />

                Settings

              </MenuItem>)}

            <Divider />

            <MenuItem
              onClick={handleLogout}
            >

              <LogoutIcon
                sx={{ mr: 1 }}
              />

              Logout

            </MenuItem>

          </Menu>

        </Box>

      </Toolbar>

    </AppBar>

  );

}