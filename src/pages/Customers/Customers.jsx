import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  IconButton,
  Avatar,
  InputBase,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Snackbar,
  Alert,
  Chip
} from '@mui/material';
import {
  Plus,
  Search,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Building,
  X,
  Eye,
  Download,

} from 'lucide-react';
import './Customers.css';

const customersList = [
  {
    id: 1,
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, New York, NY 10001',
    totalInvoices: 12,
    totalRevenue: 64800,
    status: 'active'
  },
  {
    id: 2,
    name: 'TechStart Inc',
    email: 'hello@techstart.com',
    phone: '+1 (555) 234-5678',
    address: '456 Startup Ave, San Francisco, CA 94105',
    totalInvoices: 8,
    totalRevenue: 25600,
    status: 'active'
  },
  {
    id: 3,
    name: 'Global Solutions',
    email: 'info@globalsolutions.com',
    phone: '+1 (555) 345-6789',
    address: '789 Corporate Blvd, Chicago, IL 60601',
    totalInvoices: 15,
    totalRevenue: 117000,
    status: 'active'
  },
  {
    id: 4,
    name: 'Innovation Labs',
    email: 'contact@innovationlabs.com',
    phone: '+1 (555) 456-7890',
    address: '321 Tech Park, Austin, TX 78701',
    totalInvoices: 6,
    totalRevenue: 12600,
    status: 'inactive'
  },
  {
    id: 5,
    name: 'Digital Ventures',
    email: 'team@digitalventures.com',
    phone: '+1 (555) 567-8901',
    address: '654 Innovation Dr, Seattle, WA 98101',
    totalInvoices: 10,
    totalRevenue: 45000,
    status: 'active'
  },
];

export function Customers() {
  const [customers, setCustomers] = useState(customersList);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [setShowViewModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'active'
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setSnackbar({
        open: true,
        message: 'Please fill in all fields',
        severity: 'error'
      });
      return;
    }

    // Create new customer
    const newCustomer = {
      id: customers.length + 1,
      ...formData,
      totalInvoices: 0,
      totalRevenue: 0
    };

    setCustomers([...customers, newCustomer]);
    setShowAddModal(false);
    setFormData({ name: '', email: '', phone: '', address: '', status: 'active' });
    
    setSnackbar({
      open: true,
      message: 'Customer added successfully!',
      severity: 'success'
    });
  };

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      status: customer.status || 'active'
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setSnackbar({
        open: true,
        message: 'Please fill in all fields',
        severity: 'error'
      });
      return;
    }

    // Update customer
    const updatedCustomers = customers.map(customer =>
      customer.id === selectedCustomer.id
        ? { ...customer, ...formData }
        : customer
    );

    setCustomers(updatedCustomers);
    setShowEditModal(false);
    setSelectedCustomer(null);
    setFormData({ name: '', email: '', phone: '', address: '', status: 'active' });

    setSnackbar({
      open: true,
      message: 'Customer updated successfully!',
      severity: 'success'
    });
  };

  const handleViewClick = (customer) => {
    setSelectedCustomer(customer);
    setShowViewModal(true);
  };

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    const updatedCustomers = customers.filter(customer => customer.id !== selectedCustomer.id);
    setCustomers(updatedCustomers);
    setShowDeleteDialog(false);
    setSelectedCustomer(null);

    setSnackbar({
      open: true,
      message: 'Customer deleted successfully!',
      severity: 'success'
    });
  };

  const handleExportCustomer = (customer) => {
    // Create CSV data
    const csvData = [
      ['Field', 'Value'],
      ['Name', customer.name],
      ['Email', customer.email],
      ['Phone', customer.phone],
      ['Address', customer.address],
      ['Total Invoices', customer.totalInvoices],
      ['Total Revenue', `₹${customer.totalRevenue.toLocaleString()}`],
      ['Status', customer.status || 'active'],
      ['Customer ID', customer.id],
    ];

    // Convert to CSV string
    const csvString = csvData.map(row => row.join(',')).join('\n');
    
    // Create and download file
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customer-${customer.name}-${customer.id}.csv`;
    a.click();
    
    setSnackbar({
      open: true,
      message: 'Customer data exported successfully!',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getStatusChip = (status) => {
    const config = {
      active: { bg: '#d1fae5', text: '#065f46', label: 'Active' },
      inactive: { bg: '#fee2e2', text: '#991b1b', label: 'Inactive' }
    };
    
    const { bg, text, label } = config[status] || config.active;
    
    return (
      <Chip
        label={label}
        size="small"
        sx={{
          bgcolor: bg,
          color: text,
          fontWeight: 600,
          fontSize: '0.75rem',
          height: '24px',
          borderRadius: '8px',
        }}
      />
    );
  };

  return (
    <Box className="customers-page">
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827', letterSpacing: '-0.02em', mb: 1 }}>
            Customers
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            Manage your customer database
          </Typography>
        </Box>
        <Button
          onClick={() => setShowAddModal(true)}
          variant="contained"
          startIcon={<Plus size={18} />}
          sx={{ bgcolor: '#2563eb', px: 3, py: 1.5 }}
        >
          Add Customer
        </Button>
      </Box>

      {/* Search */}
      <Card elevation={0} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              border: '1px solid',
              borderColor: '#e5e7eb',
              borderRadius: '10px',
            }}
          >
            <Search size={20} color="#9ca3af" />
            <InputBase
              placeholder="Search customers by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ ml: 1.5, flex: 1, fontSize: '0.95rem' }}
            />
          </Paper>
        </CardContent>
      </Card>

      {/* Customers Grid */}
      <Grid container spacing={3}>
        {filteredCustomers.map((customer) => (
          <Grid item xs={12} md={6} lg={4} key={customer.id}>
            <Card elevation={0} sx={{ height: '100%', position: 'relative' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: '#dbeafe',
                        color: '#2563eb',
                        fontSize: '1.25rem',
                        fontWeight: 600
                      }}
                    >
                      {customer.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
                          {customer.name}
                        </Typography>
                        {getStatusChip(customer.status)}
                      </Box>
                      <Typography variant="caption" sx={{ color: '#6b7280' }}>
                        ID: {customer.id}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleViewClick(customer)}
                      sx={{ color: '#9ca3af', '&:hover': { color: '#2563eb' } }}
                      title="View Customer"
                    >
                      <Eye size={18} />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleEditClick(customer)}
                      sx={{ color: '#9ca3af', '&:hover': { color: '#2563eb' } }}
                      title="Edit Customer"
                    >
                      <Edit size={18} />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDeleteClick(customer)}
                      sx={{ color: '#9ca3af', '&:hover': { color: '#dc2626' } }}
                      title="Delete Customer"
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: '#f0f0f0', my: 2 }} />

                <Box sx={{ spaceY: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                    <Mail size={16} color="#9ca3af" />
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      {customer.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                    <Phone size={16} color="#9ca3af" />
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      {customer.phone}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <MapPin size={16} color="#9ca3af" style={{ marginTop: 2 }} />
                    <Typography variant="body2" sx={{ color: '#6b7280' }} className="line-clamp-2">
                      {customer.address}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: '#f0f0f0', my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#6b7280', display: 'block', mb: 0.5 }}>
                      Total Invoices
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
                      {customer.totalInvoices}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="caption" sx={{ color: '#6b7280', display: 'block', mb: 0.5 }}>
                      Total Revenue
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
                      ₹{customer.totalRevenue.toLocaleString()}
                    </Typography>
                  </Box>
                  <IconButton 
                    size="small" 
                    onClick={() => handleExportCustomer(customer)}
                    sx={{ color: '#9ca3af', '&:hover': { color: '#2563eb' } }}
                    title="Export Customer Data"
                  >
                    <Download size={18} />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredCustomers.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Building size={48} color="#d1d5db" style={{ marginBottom: 16 }} />
          <Typography variant="body1" sx={{ color: '#6b7280', fontWeight: 500 }}>
            No customers found
          </Typography>
          <Typography variant="body2" sx={{ color: '#9ca3af', mt: 1 }}>
            Try adjusting your search or add a new customer
          </Typography>
        </Box>
      )}

      {/* Add Customer Modal */}
      <Dialog
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            p: 2
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
            Add New Customer
          </Typography>
          <IconButton onClick={() => setShowAddModal(false)} sx={{ color: '#6b7280' }}>
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleAddSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                fullWidth
                label="Company Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                size="small"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                size="small"
                required
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                size="small"
                required
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                size="small"
                required
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button
              type="button"
              onClick={() => setShowAddModal(false)}
              variant="outlined"
              sx={{ borderColor: '#e5e7eb', color: '#374151' }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: '#2563eb' }}
            >
              Add Customer
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Edit Customer Modal */}
      <Dialog
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            p: 2
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
            Edit Customer
          </Typography>
          <IconButton onClick={() => setShowEditModal(false)} sx={{ color: '#6b7280' }}>
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleEditSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                fullWidth
                label="Company Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                size="small"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                size="small"
                required
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                size="small"
                required
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                size="small"
                required
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button
              type="button"
              onClick={() => setShowEditModal(false)}
              variant="outlined"
              sx={{ borderColor: '#e5e7eb', color: '#374151' }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: '#2563eb' }}
            >
              Update Customer
            </Button>
          </DialogActions>
        </form>
      </Dialog>

     
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
            Delete Customer
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: '#6b7280' }}>
            Are you sure you want to delete {selectedCustomer?.name}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setShowDeleteDialog(false)}
            variant="outlined"
            sx={{ borderColor: '#e5e7eb', color: '#374151' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Customers;