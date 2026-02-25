import React, { useState } from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Collapse,
  Avatar,
  Chip,
  useMediaQuery,
  Tooltip,
  LinearProgress
} from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {
  Dashboard as DashboardIcon,
  Receipt as ReceiptIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Assessment as AssessmentIcon,
  ExpandLess,
  ExpandMore,
  Add,
  Business,
  ReceiptLong,
  TrendingUp,
  Description,
  Payment,
  DescriptionIcon,
  AccountBalance,
  Help,
  Logout
} from '@mui/icons-material';

import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ open, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:768px)');
  
  
  const [invoicesOpen, setInvoicesOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  
  // Get user data
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const companyName = userData?.company || 'BillFlow Corp';

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
      badge: null
    },
    {
      title: 'Invoices',
      icon: <ReceiptIcon />,
      path: '/invoices',
      badge: '12',
      submenu: [
        { title: 'All Invoices', path: '/invoices', icon: <Description /> },
        { title: 'Create Invoice', path: '/invoices/create', icon: <Add /> },
        { title: 'Pending', path: '/invoices/pending', icon: <Payment />, badge: '5' },
        { title: 'Paid', path: '/invoices/paid', icon: <ReceiptLong /> }
      ]
    },
    {
      title: 'Customers',
      icon: <PeopleIcon />,
      path: '/customers',
      badge: null
    },
    {
      title: 'Products',
      icon: <InventoryIcon />,
      path: '/products',
      badge: null
    },
    {
      title: 'Reports',
      icon: <AssessmentIcon />,
      path: '/reports',
      badge: null,
      submenu: [
        { title: 'Sales Report', path: '/reports/sales', icon: <TrendingUp /> },
        { title: 'Tax Report', path: '/reports/tax', icon: <AccountBalance /> },
       { title: 'Financial Summary', path: '/reports/financial', icon: <AssessmentIcon /> }
      ]
    }

  ];

  const bottomMenuItems = [
    // { title: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { title: 'Help', icon: <Help />, path: '/help' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      toggleSidebar();
    }
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={toggleSidebar}
          className="sidebar-drawer mobile"
          classes={{ paper: 'sidebar-paper mobile' }}
          ModalProps={{ keepMounted: true }}
        >
          <SidebarContent 
            open={true}
            menuItems={menuItems}
            bottomMenuItems={bottomMenuItems}
            companyName={companyName}
            invoicesOpen={invoicesOpen}
            reportsOpen={reportsOpen}
            setInvoicesOpen={setInvoicesOpen}
            setReportsOpen={setReportsOpen}
            handleNavigation={handleNavigation}
            isActive={isActive}
            isMobile={isMobile}
          />
        </Drawer>
      ) : (
        /* Desktop Drawer */
        <Drawer
          variant="permanent"
          className={`sidebar-drawer desktop ${open ? 'open' : 'closed'}`}
          classes={{ paper: `sidebar-paper desktop ${open ? 'open' : 'closed'}` }}
        >
          <SidebarContent 
            open={open}
            menuItems={menuItems}
            bottomMenuItems={bottomMenuItems}
            companyName={companyName}
            invoicesOpen={invoicesOpen}
            reportsOpen={reportsOpen}
            setInvoicesOpen={setInvoicesOpen}
            setReportsOpen={setReportsOpen}
            handleNavigation={handleNavigation}
            isActive={isActive}
            isMobile={isMobile}
          />
        </Drawer>
      )}
    </>
  );
};

// Separate content component to avoid code duplication
const SidebarContent = ({ 
  open, 
  menuItems, 
  bottomMenuItems, 
  companyName,
  invoicesOpen,
  reportsOpen,
  setInvoicesOpen,
  setReportsOpen,
  handleNavigation,
  isActive,
  isMobile
}) => {
  if (!open) {
    
    return (
      <Box className="sidebar-collapsed">
        <Box className="collapsed-header">
          <Tooltip title="BillFlow" placement="right">
            <Box className="collapsed-logo">
              <DescriptionIcon />
            </Box>
          </Tooltip>
        </Box>
        
        <Divider className="sidebar-divider" />
        
        <List className="collapsed-menu">
          {menuItems.map((item) => (
            <Tooltip key={item.title} title={item.title} placement="right">
              <ListItem disablePadding>
                <ListItemButton
                  className={`collapsed-menu-item ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <ListItemIcon className="collapsed-menu-icon">
                    {item.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
        
        <Divider className="sidebar-divider" />
        
        <List className="collapsed-menu bottom">
          {bottomMenuItems.map((item) => (
            <Tooltip key={item.title} title={item.title} placement="right">
              <ListItem disablePadding>
                <ListItemButton
                  className={`collapsed-menu-item ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <ListItemIcon className="collapsed-menu-icon">
                    {item.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>
    );
  }

  // Expanded sidebar view
  return (
    <Box className="sidebar-container">
      <Box className="sidebar-header" sx={{ pb: 4 }}>

        <Box className="logo-container">
          <CurrencyRupeeIcon className="logo-icon" />
          <Typography variant="h6" className="logo-text">
            Bill<span>Flow</span>
          </Typography>
        </Box>
      </Box>
      
      <Divider className="sidebar-divider" />
    

      <List className="sidebar-menu">
        {menuItems.map((item) => (
          <React.Fragment key={item.title}>
            {item.submenu ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => setInvoicesOpen(!invoicesOpen)}
                  >
                    <ListItemIcon className="menu-icon">
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.title}
                      className="menu-text"
                    />
                    {item.badge && (
                      <Chip 
                        label={item.badge}
                        size="small"
                        className="menu-badge"
                      />
                    )}
                    {invoicesOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={invoicesOpen} timeout="auto" unmountOnExit>
                  <List className="submenu">
                    {item.submenu.map((subItem) => (
                      <ListItem key={subItem.title} disablePadding>
                        <ListItemButton
                          className={`submenu-item ${isActive(subItem.path) ? 'active' : ''}`}
                          onClick={() => handleNavigation(subItem.path)}
                        >
                          <ListItemIcon className="submenu-icon">
                            {subItem.icon}
                          </ListItemIcon>
                          <ListItemText 
                            primary={subItem.title}
                            className="submenu-text"
                          />
                          {subItem.badge && (
                            <Chip 
                              label={subItem.badge}
                              size="small"
                              className="submenu-badge"
                            />
                          )}
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton
                  className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <ListItemIcon className="menu-icon">
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.title}
                    className="menu-text"
                  />
                  {item.badge && (
                    <Chip 
                      label={item.badge}
                      size="small"
                      className="menu-badge"
                    />
                  )}
                </ListItemButton>
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>

      <Divider className="sidebar-divider" />

      <List className="sidebar-menu bottom">
        {bottomMenuItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon className="menu-icon">
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.title}
                className="menu-text"
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box className="sidebar-footer">
        <LinearProgress 
          variant="determinate" 
          value={65} 
          className="storage-progress"
        />
        <Typography variant="caption" className="storage-text">
          6.5 GB of 10 GB used
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;