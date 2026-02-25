import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Avatar,
  InputBase,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Divider
} from '@mui/material';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  X
} from 'lucide-react';
import './Products.css';

const productsList = [
  { id: 1, name: 'Web Development', description: 'Custom website development', price: 5000, category: 'Service' },
  { id: 2, name: 'Mobile App Development', description: 'iOS and Android app development', price: 8000, category: 'Service' },
  { id: 3, name: 'UI/UX Design', description: 'User interface and experience design', price: 3000, category: 'Service' },
  { id: 4, name: 'SEO Optimization', description: 'Search engine optimization services', price: 1500, category: 'Service' },
  { id: 5, name: 'Cloud Hosting', description: 'Monthly cloud hosting service', price: 200, category: 'Subscription' },
  { id: 6, name: 'Consulting Hour', description: 'Technical consulting per hour', price: 150, category: 'Service' },
  { id: 7, name: 'Logo Design', description: 'Professional logo design', price: 800, category: 'Service' },
  { id: 8, name: 'API Integration', description: 'Third-party API integration', price: 2000, category: 'Service' },
];

export function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Service',
    price: ''
  });

  const filteredProducts = productsList.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Add product:', formData);
    setShowAddModal(false);
    setFormData({ name: '', description: '', category: 'Service', price: '' });
  };

  return (
    <Box className="products-page">
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827', letterSpacing: '-0.02em', mb: 1 }}>
            Products & Services
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            Manage your product and service catalog
          </Typography>
        </Box>
        <Button
          onClick={() => setShowAddModal(true)}
          variant="contained"
          startIcon={<Plus size={18} />}
          sx={{ bgcolor: '#2563eb', px: 3, py: 1.5 }}
        >
          Add Product
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
              placeholder="Search products and services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ ml: 1.5, flex: 1, fontSize: '0.95rem' }}
            />
          </Paper>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card elevation={0}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product/Service</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 40, height: 40, bgcolor: '#dbeafe', color: '#2563eb' }}>
                        <Package size={20} />
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#111827' }}>
                        {product.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: '#6b7280' }} className="line-clamp-1">
                      {product.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.category}
                      size="small"
                      sx={{
                        bgcolor: product.category === 'Service' ? '#ede9fe' : '#dbeafe',
                        color: product.category === 'Service' ? '#6d28d9' : '#1e40af',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        height: '24px',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>
                      ₹{product.price.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" sx={{ color: '#9ca3af', '&:hover': { color: '#2563eb' } }}>
                      <Edit size={18} />
                    </IconButton>
                    <IconButton size="small" sx={{ color: '#9ca3af', '&:hover': { color: '#dc2626' } }}>
                      <Trash2 size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add Product Modal */}
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
            Add New Product/Service
          </Typography>
          <IconButton onClick={() => setShowAddModal(false)} sx={{ color: '#6b7280' }}>
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                size="small"
                required
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                size="small"
                required
              />
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                size="small"
                required
              >
                <MenuItem value="Service">Service</MenuItem>
                <MenuItem value="Subscription">Subscription</MenuItem>
                <MenuItem value="Product">Product</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                size="small"
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1, color: '#6b7280' }}>₹</Typography>,
                }}
                required
              />
            </Box>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => setShowAddModal(false)}
            variant="outlined"
            sx={{ borderColor: '#e5e7eb', color: '#374151' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ bgcolor: '#2563eb' }}
          >
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Products;