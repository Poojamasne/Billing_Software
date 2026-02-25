import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Tooltip
} from '@mui/material';
import {
  ReceiptLong,
  NotificationsNone as NotificationsIcon,
  Menu as MenuIcon,
  ChevronLeft,
  Settings,
  Person,
  Logout
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ toggleSidebar, sidebarOpen }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationAnchor, setNotificationAnchor] = React.useState(null);
  
  // Get user data
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const userName = userData?.name || 'Administrator';
  const userEmail = userData?.email || 'admin@billflow.com';
  const userAvatar = userName.charAt(0).toUpperCase();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login');
    handleMenuClose();
  };

  return (
    <AppBar position="fixed" className="header" elevation={0}>
      <Toolbar className="header-toolbar">
        <Box className="header-left">
          <IconButton
            className="menu-toggle"
            onClick={toggleSidebar}
            size="large"
            edge="start"
          >
            {sidebarOpen ? <ChevronLeft /> : <MenuIcon />}
          </IconButton>
          
          <Box className="logo-container">
            <ReceiptLong className="logo-icon" />
            <Typography variant="h6" className="logo-text">
              Bill<span>Flow</span>
            </Typography>
          </Box>
        </Box>

        <Box className="header-right">
          <Tooltip title="Notifications">
            <IconButton 
              className="notification-btn"
              onClick={handleNotificationOpen}
            >
              <Badge badgeContent={3} color="error" className="notification-badge">
                <NotificationsIcon className="notification-icon" />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Account">
            <Box 
              className="user-section"
              onClick={handleProfileMenuOpen}
            >
              <Avatar className="user-avatar">
                {userAvatar}
              </Avatar>
              <Box className="user-info">
                <Typography variant="body2" className="user-name">
                  {userName}
                </Typography>
                <Typography variant="caption" className="user-role">
                  Administrator
                </Typography>
              </Box>
            </Box>
          </Tooltip>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          className="profile-menu"
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box className="profile-header">
            <Avatar className="profile-avatar">
              {userAvatar}
            </Avatar>
            <Box className="profile-info">
              <Typography variant="subtitle2">{userName}</Typography>
              <Typography variant="caption" color="textSecondary">
                {userEmail}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <Person fontSize="small" />
            <Typography variant="body2">Profile</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Settings fontSize="small" />
            <Typography variant="body2">Settings</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <Logout fontSize="small" />
            <Typography variant="body2" color="error">Logout</Typography>
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleMenuClose}
          className="notification-menu"
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box className="notification-header">
            <Typography variant="subtitle2">Notifications</Typography>
            <Typography variant="caption" color="primary">Mark all as read</Typography>
          </Box>
          <Divider />
          <MenuItem className="notification-item">
            <Box className="notification-content">
              <Typography variant="body2" className="notification-title">
                New invoice created
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Invoice #INV-2024-006 created by John
              </Typography>
              <Typography variant="caption" color="textSecondary" className="notification-time">
                5 minutes ago
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem className="notification-item">
            <Box className="notification-content">
              <Typography variant="body2" className="notification-title">
                Payment received
              </Typography>
              <Typography variant="caption" color="textSecondary">
                ₹12,500 received from John Smith
              </Typography>
              <Typography variant="caption" color="textSecondary" className="notification-time">
                25 minutes ago
              </Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;