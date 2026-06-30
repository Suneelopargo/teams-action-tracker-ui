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

import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import './Header.css';

interface HeaderProps {

  toggleSidebar: () => void;

}

export default function Header({

  toggleSidebar,

}: HeaderProps) {

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
      position="static"
      elevation={2}
      className="header-root"
    >

      <Toolbar className="header-toolbar">

        <div className="header-left">

          <IconButton
            className="menu-button"
            onClick={toggleSidebar}
          >
            <MenuIcon
              sx={{ color: '#fff' }}
            />
          </IconButton>

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

        </div>

        <Box
          className="header-right"
        >

          <Chip
            label={user?.role}
            size="small"
            className="role-chip"
          />

          <Avatar
            sx={{
              bgcolor: '#0D47A1',
              width: 42,
              height: 42,
              fontWeight: 700,
            }}
          >
            {user?.name?.charAt(0)}
          </Avatar>

          <div
            className="user-info"
            onClick={handleOpen}
          >

            <Typography
              className="user-name"
            >
              {user?.name}
            </Typography>

            <KeyboardArrowDownIcon />

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

            {

              user?.role === 'ADMIN' && (

                <MenuItem>

                  <SettingsIcon
                    sx={{ mr: 1 }}
                  />

                  Settings

                </MenuItem>

              )

            }

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
