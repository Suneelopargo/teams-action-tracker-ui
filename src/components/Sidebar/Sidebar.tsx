import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Divider,
    Typography,
    Box,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import EmailIcon from '@mui/icons-material/Email';

import {
    Link,
    useLocation,
} from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import './Sidebar.css';

interface SidebarProps {

    mobileOpen: boolean;

    toggleSidebar: () => void;

    closeSidebar: () => void;

}

const drawerWidth = 270;

export default function Sidebar({

    mobileOpen,

    closeSidebar,

}: SidebarProps) {

    const location = useLocation();

    const { user } = useAuth();

    const isActive = (path: string) => {

        if (path === '/' && location.pathname === '/') {

            return true;

        }

        return location.pathname.startsWith(path);

    };

    const drawer = (

        <div className="sidebar-root">

            <Toolbar className="sidebar-header">

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >

                    <div className="sidebar-logo">

                        📊

                    </div>

                    <Typography
                        variant="h6"
                        className="sidebar-title"
                    >

                        Teams

                    </Typography>

                </Box>

            </Toolbar>

            <Divider />

            <List className="sidebar-nav">

                {user?.role === 'ADMIN' && (

                    <ListItemButton

                        component={Link}

                        to="/"

                        onClick={closeSidebar}

                        selected={isActive('/')}

                        className="sidebar-link"

                    >

                        <ListItemIcon>

                            <DashboardIcon />

                        </ListItemIcon>

                        <ListItemText
                            primary="Dashboard"
                        />

                    </ListItemButton>

                )}

                <ListItemButton

                    component={Link}

                    to="/meetings"

                    onClick={closeSidebar}

                    selected={isActive('/meetings')}

                    className="sidebar-link"

                >

                    <ListItemIcon>

                        <GroupsIcon />

                    </ListItemIcon>

                    <ListItemText
                        primary="Meetings"
                    />

                </ListItemButton>

                <ListItemButton

                    component={Link}

                    to="/action-items"

                    onClick={closeSidebar}

                    selected={isActive('/action-items')}

                    className="sidebar-link"

                >

                    <ListItemIcon>

                        <TaskAltIcon />

                    </ListItemIcon>

                    <ListItemText

                        primary={
                            user?.role === 'ADMIN'
                                ? 'Action Items'
                                : 'My Action Items'
                        }

                    />

                </ListItemButton>
                {user?.role === 'ADMIN' && (

                    <ListItemButton
                        component={Link}
                        to="/upload-transcript"
                        onClick={closeSidebar}
                        selected={isActive('/upload-transcript')}
                        className="sidebar-link"
                    >

                        <ListItemIcon>
                            <UploadFileIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="Upload Transcript"
                        />

                    </ListItemButton>

                )}

                {user?.role === 'ADMIN' && (

                    <ListItemButton
                        component={Link}
                        to="/email-logs"
                        onClick={closeSidebar}
                        selected={isActive('/email-logs')}
                        className="sidebar-link"
                    >

                        <ListItemIcon>
                            <EmailIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="Email Logs"
                        />

                    </ListItemButton>

                )}

            </List>

            <Divider />

            {/* <Box
                className="sidebar-footer"
            >

                <Typography
                    variant="body2"
                >
                    Signed in
                </Typography>

                <Typography
                    variant="subtitle2"
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    {user?.name}
                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    {user?.role}
                </Typography>

            </Box> */}

        </div>

    );

    return (

        <>

            {/* ===========================
          MOBILE DRAWER
      ============================ */}

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={closeSidebar}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: {
                        xs: 'block',
                        md: 'none',
                    },
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {drawer}
            </Drawer>

            {/* ===========================
          DESKTOP DRAWER
      ============================ */}

            <Drawer
                variant="permanent"
                open
                sx={{
                    width: {
                        md: drawerWidth,
                    },
                    flexShrink: 0,
                    display: {
                        xs: 'none',
                        md: 'block',
                    },
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: '1px solid #E2E8F0',
                    },
                }}
            >
                {drawer}
            </Drawer>

        </>

    );

}
