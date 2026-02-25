import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  useMediaQuery,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Badge,
  Menu,
  MenuItem,
  Button
} from '@mui/material';
import {
  LayoutDashboard,
  FileText,
  Users,
  Package,
  BarChart3,
  Settings,
  Menu as MenuIcon,
  X,
  Calculator,
  Bell,
  LogOut,
  User,
  Home // Add Home icon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';

const Layout = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout} = useAuth();

  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  // Check if current route is billing page
  const isBillingPage = location.pathname === '/billing';

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/invoices', label: 'Invoices', icon: FileText },
    { path: '/customers', label: 'Customers', icon: Users },
    { path: '/products', label: 'Products', icon: Package },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
    // { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
    navigate('/login');
  };

  // Updated function to handle billing/home navigation
  const handleBillingNavigation = () => {
    if (isBillingPage) {
      // If on billing page, navigate back to dashboard
      navigate('/dashboard');
    } else {
      // If not on billing page, navigate to billing
      navigate('/billing');
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f9fafb' }}>
      {/* Sidebar - Only render if not on billing page */}
      {!isBillingPage && (
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          sx={{
            width: 280,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 280,
              boxSizing: 'border-box',
              bgcolor: 'white',
              borderRight: '1px solid',
              borderColor: '#f0f0f0',
              boxShadow: isMobile ? '0 8px 32px rgba(0,0,0,0.08)' : 'none',
            },
          }}
        >
          <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: '#2563eb',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Calculator size={20} color="white" />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#111827',
                  fontSize: '1.25rem',
                  letterSpacing: '-0.01em',
                }}
              >
                Bill<span style={{ color: '#2563eb' }}>Flow</span>
              </Typography>
            </Box>
            {isMobile && (
              <IconButton onClick={() => setSidebarOpen(false)} sx={{ color: '#6b7280' }}>
                <X size={20} />
              </IconButton>
            )}
          </Box>

          <Divider sx={{ borderColor: '#f0f0f0' }} />

          <List sx={{ px: 2, py: 0, flex: 1, mt: 3}}>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding sx={{ mb: 1.5 }}>
                <NavLink
                  to={item.path}
                  style={{ width: '100%', textDecoration: 'none' }}
                >
                  {({ isActive }) => (
                    <ListItemButton
                      sx={{
                        borderRadius: '10px',
                        py: 1.5,
                        px: 2,
                        bgcolor: isActive ? '#eff6ff' : 'transparent',
                        '&:hover': {
                          bgcolor: isActive ? '#eff6ff' : '#f9fafb',
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 40,
                          color: isActive ? '#2563eb' : '#6b7280',
                        }}
                      >
                        <item.icon size={20} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          sx: {
                            fontWeight: isActive ? 600 : 500,
                            color: isActive ? '#2563eb' : '#374151',
                            fontSize: '0.95rem',
                          },
                        }}
                      />
                    </ListItemButton>
                  )}
                </NavLink>
              </ListItem>
            ))}
          </List>

          <Box sx={{ p: 2, mt: 'auto' }}>
            <Divider sx={{ borderColor: '#f0f0f0', mb: 2 }} />
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  borderRadius: '10px',
                  py: 1.5,
                  px: 2,
                  color: '#ef4444',
                  '&:hover': {
                    bgcolor: '#fef2f2',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: '#ef4444' }}>
                  <LogOut size={20} />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: 500,
                      color: '#ef4444',
                      fontSize: '0.95rem',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Box>
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
          // Only apply margin when sidebar is visible and not on mobile
          ...(!isBillingPage && !isMobile && sidebarOpen ? {
            width: `calc(100% - 280px)`,
          } : {
            width: '100%',
          }),
        }}
      >
        {/* Header */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: 'white',
            borderBottom: '1px solid',
            borderColor: '#f0f0f0',
            backdropFilter: 'blur(8px)',
            // Header always takes full width of its container
            width: '100%',
          }}
        >
          <Toolbar sx={{ minHeight: '70px !important', px: { xs: 2, lg: 4 } }}>
            {/* Show menu toggle only when not on billing page and on mobile */}
            {!isBillingPage && isMobile && (
              <IconButton
                onClick={handleSidebarToggle}
                sx={{
                  mr: 2,
                  color: '#6b7280',
                }}
              >
                <MenuIcon size={24} />
              </IconButton>
            )}

            {/* On desktop, add a spacer when sidebar is visible to maintain alignment */}
            {!isBillingPage && !isMobile && sidebarOpen && (
              <Box sx={{ width: 0 }} />
            )}

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Dynamic Billing/Home Button */}
              <Tooltip title={isBillingPage ? "Go to Dashboard" : "Go to Billing"}>
                <Button
                  onClick={handleBillingNavigation}
                  variant="contained"
                  size="small"
                  startIcon={isBillingPage ? <Home size={16} /> : <Calculator size={16} />}
                  sx={{
                    color: 'white',
                    textTransform: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    borderRadius: '8px',
                    px: 1.5,
                    py: 0.8,
                    minWidth: 'auto',
                    boxShadow: 'none',
                    backgroundColor: isBillingPage ? '#10b981' : '#2563eb', // Green for Home, Blue for Billing
                    '&:hover': {
                      backgroundColor: isBillingPage ? '#059669' : '#1d4ed8',
                      boxShadow: 'none',
                    },
                    ...(isBillingPage && {
                      outline: '2px solid',
                      outlineColor: '#a7f3d0',
                    }),
                  }}
                >
                  {isBillingPage ? 'Home' : 'Billing'}
                </Button>
              </Tooltip>

              <Tooltip title="Notifications">
                <IconButton
                  onClick={handleNotificationOpen}
                  sx={{
                    color: '#6b7280',
                    '&:hover': { bgcolor: '#f3f4f6' },
                  }}
                >
                  <Badge badgeContent={3} color="error">
                    <Bell size={20} />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title="Account">
                <IconButton
                  onClick={handleProfileMenuOpen}
                  sx={{ p: 0.5 }}
                >
                  <Avatar
                    sx={{
                      width: 42,
                      height: 42,
                      bgcolor: '#2563eb',
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}
                  >
                    A
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>

        
        <Box
          sx={{
            p: { xs: 2, lg: 4 },
            width: '100%',
            flex: 1
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: '12px',
            border: '1px solid',
            borderColor: '#f0f0f0',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          },
        }}
      >
        <Divider sx={{ borderColor: '#f0f0f0' }} />
        <MenuItem sx={{ py: 1.5, px: 2, gap: 1.5 }}>
          <User size={18} />
          <Typography variant="body2">Profile</Typography>
        </MenuItem>
        <MenuItem sx={{ py: 1.5, px: 2, gap: 1.5 }}>
          <Settings size={18} />
          <Typography variant="body2">Settings</Typography>
        </MenuItem>
        <Divider sx={{ borderColor: '#f0f0f0' }} />
        <MenuItem onClick={handleLogout} sx={{ py: 1.5, px: 2, gap: 1.5, color: '#ef4444' }}>
          <LogOut size={18} />
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleNotificationClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 320,
            borderRadius: '12px',
            border: '1px solid',
            borderColor: '#f0f0f0',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#111827' }}>
            Notifications
          </Typography>
          <Typography variant="caption" sx={{ color: '#2563eb', cursor: 'pointer' }}>
            Mark all as read
          </Typography>
        </Box>
        <Divider sx={{ borderColor: '#f0f0f0' }} />
        <MenuItem sx={{ py: 2, px: 2, flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#111827' }}>
            New invoice created
          </Typography>
          <Typography variant="caption" sx={{ color: '#6b7280' }}>
            Invoice #INV-009 created by John
          </Typography>
          <Typography variant="caption" sx={{ color: '#9ca3af', fontSize: '0.65rem', mt: 0.5 }}>
            5 minutes ago
          </Typography>
        </MenuItem>
        <MenuItem sx={{ py: 2, px: 2, flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#111827' }}>
            Payment received
          </Typography>
          <Typography variant="caption" sx={{ color: '#6b7280' }}>
            ₹12,500 received from Acme Corp
          </Typography>
          <Typography variant="caption" sx={{ color: '#9ca3af', fontSize: '0.65rem', mt: 0.5 }}>
            25 minutes ago
          </Typography>
        </MenuItem>
        <MenuItem sx={{ py: 2, px: 2, flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#111827' }}>
            Invoice overdue
          </Typography>
          <Typography variant="caption" sx={{ color: '#6b7280' }}>
            INV-004 is overdue by 5 days
          </Typography>
          <Typography variant="caption" sx={{ color: '#9ca3af', fontSize: '0.65rem', mt: 0.5 }}>
            1 hour ago
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Layout;