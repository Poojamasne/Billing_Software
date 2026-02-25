import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  MenuItem,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import {
  Save,
  Building,
  FileText,
  Bell,
  CreditCard,
  Users,
  Shield,
  Sliders
} from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('company');

  const settingsMenu = [
    { id: 'company', label: 'Company Info', icon: Building },
    { id: 'invoice', label: 'Invoice Settings', icon: FileText },
    { id: 'notification', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'users', label: 'Users & Permissions', icon: Users },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Sliders },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'company':
        return (
          <Card elevation={0}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 3 }}>
                Company Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    defaultValue="BillFlow"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    defaultValue="admin@billflow.com"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    defaultValue="+1 (555) 000-0000"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Website"
                    defaultValue="www.billflow.com"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    multiline
                    rows={3}
                    defaultValue="123 Business Street, Suite 100\nNew York, NY 10001\nUnited States"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tax ID / VAT Number"
                    defaultValue="US-123456789"
                    size="small"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      case 'invoice':
        return (
          <Card elevation={0}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 3 }}>
                Invoice Settings
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Invoice Prefix"
                    defaultValue="INV-"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Next Invoice Number"
                    type="number"
                    defaultValue="009"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Default Tax Rate (%)"
                    type="number"
                    defaultValue="10"
                    size="small"
                    InputProps={{
                      inputProps: { step: 0.1 }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Payment Terms (days)"
                    type="number"
                    defaultValue="15"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    label="Currency"
                    defaultValue="USD"
                    size="small"
                  >
                    <MenuItem value="USD">USD - US Dollar</MenuItem>
                    <MenuItem value="EUR">EUR - Euro</MenuItem>
                    <MenuItem value="GBP">GBP - British Pound</MenuItem>
                    <MenuItem value="CAD">CAD - Canadian Dollar</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Invoice Footer / Notes"
                    multiline
                    rows={3}
                    defaultValue="Thank you for your business!\nPayment is due within 15 days of invoice date."
                    size="small"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      default:
        return (
          <Card elevation={0}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 3 }}>
                {settingsMenu.find(item => item.id === activeTab)?.label}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                This section is under development.
              </Typography>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <Box className="settings-page">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827', letterSpacing: '-0.02em', mb: 1 }}>
          Settings
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b7280' }}>
          Manage your billing software configuration
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Settings Navigation */}
        <Grid item xs={12} lg={3}>
          <Paper
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: '#f0f0f0',
              borderRadius: '16px',
              overflow: 'hidden'
            }}
          >
            <List sx={{ p: 2 }}>
              {settingsMenu.map((item) => (
                <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => setActiveTab(item.id)}
                    selected={activeTab === item.id}
                    sx={{
                      borderRadius: '10px',
                      py: 1.5,
                      px: 2,
                      '&.Mui-selected': {
                        bgcolor: '#eff6ff',
                        '&:hover': {
                          bgcolor: '#eff6ff',
                        },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: activeTab === item.id ? '#2563eb' : '#6b7280' }}>
                      <item.icon size={20} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        sx: {
                          fontWeight: activeTab === item.id ? 600 : 500,
                          color: activeTab === item.id ? '#2563eb' : '#374151',
                          fontSize: '0.95rem',
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Settings Content */}
        <Grid item xs={12} lg={9}>
          {renderContent()}
          
          {/* Save Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<Save size={18} />}
              sx={{ bgcolor: '#2563eb', px: 4, py: 1.5 }}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Settings;