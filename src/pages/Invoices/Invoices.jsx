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
  Select,
  MenuItem,
  FormControl,
  Divider,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Printer,
  X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import Grid from '@mui/material/Grid';
import autoTable from 'jspdf-autotable';
import './Invoices.css';

const invoicesList = [
  { id: 'INV-001', customer: 'Acme Corporation', amount: 5400, status: 'paid', date: '2026-02-10', dueDate: '2026-02-25', email: 'contact@acme.com' },
  { id: 'INV-002', customer: 'TechStart Inc', amount: 3200, status: 'pending', date: '2026-02-09', dueDate: '2026-02-24', email: 'billing@techstart.io' },
  { id: 'INV-003', customer: 'Global Solutions', amount: 7800, status: 'paid', date: '2026-02-08', dueDate: '2026-02-23', email: 'finance@globalsolutions.com' },
  { id: 'INV-004', customer: 'Innovation Labs', amount: 2100, status: 'overdue', date: '2026-01-25', dueDate: '2026-02-10', email: 'accounts@innovationlabs.com' },
  { id: 'INV-005', customer: 'Digital Ventures', amount: 4500, status: 'paid', date: '2026-02-07', dueDate: '2026-02-22', email: 'finance@digitalventures.com' },
  { id: 'INV-006', customer: 'Smart Systems', amount: 6200, status: 'pending', date: '2026-02-06', dueDate: '2026-02-21', email: 'billing@smartsystems.com' },
  { id: 'INV-007', customer: 'Future Tech', amount: 3900, status: 'paid', date: '2026-02-05', dueDate: '2026-02-20', email: 'accounts@futuretech.com' },
  { id: 'INV-008', customer: 'Cloud Nine', amount: 5100, status: 'pending', date: '2026-02-04', dueDate: '2026-02-19', email: 'billing@cloudnine.com' },
];

export function Invoices() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  
  const itemsPerPage = 5;

  const filteredInvoices = invoicesList.filter(invoice => {
    const matchesSearch = invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedInvoices = filteredInvoices.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const getStatusChip = (status) => {
    const config = {
      paid: { bg: '#d1fae5', text: '#065f46', icon: CheckCircle, label: 'Paid' },
      pending: { bg: '#fef3c7', text: '#92400e', icon: Clock, label: 'Pending' },
      overdue: { bg: '#fee2e2', text: '#991b1b', icon: AlertCircle, label: 'Overdue' }
    };
    
    const { bg, text, icon: Icon, label } = config[status] || config.pending;
    
    return (
      <Chip
        icon={<Icon size={14} />}
        label={label}
        size="small"
        sx={{
          bgcolor: bg,
          color: text,
          fontWeight: 600,
          fontSize: '0.75rem',
          height: '28px',
          borderRadius: '8px',
          '& .MuiChip-icon': { ml: 0.5, color: text },
        }}
      />
    );
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text('Invoices Report', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Create table
    const tableColumn = ["Invoice ID", "Customer", "Amount", "Status", "Issue Date", "Due Date"];
    const tableRows = [];
    
    filteredInvoices.forEach(invoice => {
      const invoiceData = [
        invoice.id,
        invoice.customer,
        `₹${invoice.amount.toLocaleString('en-IN')}`,
        invoice.status.toUpperCase(),
        invoice.date,
        invoice.dueDate
      ];
      tableRows.push(invoiceData);
    });
    
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [37, 99, 235] }
    });
    
    doc.save('invoices-report.pdf');
    
    setSnackbar({
      open: true,
      message: 'PDF exported successfully!',
      severity: 'success'
    });
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setViewDialogOpen(true);
  };

  const handleEditInvoice = (id) => {
    navigate(`/invoices/edit/${id}`);
  };

  const handlePrintInvoice = (invoice) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice ${invoice.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .invoice-details { margin-bottom: 30px; }
            .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 30px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f3f4f6; }
            .total { text-align: right; margin-top: 30px; font-size: 18px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>INVOICE</h1>
            <h2>${invoice.id}</h2>
          </div>
          <div class="invoice-details">
            <div class="details-grid">
              <div>
                <h3>Bill To:</h3>
                <p>${invoice.customer}</p>
                <p>${invoice.email}</p>
              </div>
              <div>
                <h3>Invoice Details:</h3>
                <p>Issue Date: ${invoice.date}</p>
                <p>Due Date: ${invoice.dueDate}</p>
                <p>Status: ${invoice.status.toUpperCase()}</p>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Services</td>
                <td>1</td>
                <td>₹${invoice.amount.toLocaleString('en-IN')}</td>
                <td>₹${invoice.amount.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>
          <div class="total">
            <p><strong>Total Amount: ₹${invoice.amount.toLocaleString('en-IN')}</strong></p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDeleteClick = (invoice) => {
    setSelectedInvoice(invoice);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Here you would typically make an API call to delete the invoice
    setSnackbar({
      open: true,
      message: `Invoice ${selectedInvoice.id} deleted successfully!`,
      severity: 'success'
    });
    setDeleteDialogOpen(false);
    setSelectedInvoice(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box className="invoices-page">
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827', letterSpacing: '-0.02em', mb: 1 }}>
            Invoices
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            Manage and track all your invoices
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/invoices/create"
          variant="contained"
          startIcon={<Plus size={18} />}
          sx={{ bgcolor: '#2563eb', px: 3, py: 1.5 }}
        >
          Create Invoice
        </Button>
      </Box>

      {/* Filters */}
      <Card elevation={0} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
            <Paper
              elevation={0}
              sx={{
                flex: 1,
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
                placeholder="Search invoices by ID or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ ml: 1.5, flex: 1, fontSize: '0.95rem' }}
              />
            </Paper>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Filter size={20} color="#9ca3af" />
              <FormControl sx={{ minWidth: 150 }}>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  displayEmpty
                  size="small"
                  sx={{ borderRadius: '10px' }}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="overdue">Overdue</MenuItem>
                </Select>
              </FormControl>
              
              <Button
                variant="outlined"
                startIcon={<Download size={18} />}
                onClick={handleExportPDF}
                sx={{ borderColor: '#e5e7eb', color: '#374151' }}
              >
                Export
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card elevation={0} sx={{ overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Issue Date</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedInvoices.map((invoice) => (
                <TableRow key={invoice.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontFamily: 'monospace' }}>
                      {invoice.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 36, height: 36, bgcolor: '#f3f4f6', color: '#4b5563', fontSize: '0.875rem', fontWeight: 600 }}>
                        {invoice.customer.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#111827' }}>
                          {invoice.customer}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
                          {invoice.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>
                      ₹{invoice.amount.toLocaleString('en-IN')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {getStatusChip(invoice.status)}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      {invoice.date}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      {invoice.dueDate}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton 
                      size="small" 
                      onClick={() => handleViewInvoice(invoice)}
                      sx={{ color: '#9ca3af', '&:hover': { color: '#2563eb' } }}
                      title="View Invoice"
                    >
                      <Eye size={18} />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleEditInvoice(invoice.id)}
                      sx={{ color: '#9ca3af', '&:hover': { color: '#2563eb' } }}
                      title="Edit Invoice"
                    >
                      <Edit size={18} />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handlePrintInvoice(invoice)}
                      sx={{ color: '#9ca3af', '&:hover': { color: '#2563eb' } }}
                      title="Print Invoice"
                    >
                      <Printer size={18} />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDeleteClick(invoice)}
                      sx={{ color: '#9ca3af', '&:hover': { color: '#dc2626' } }}
                      title="Delete Invoice"
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredInvoices.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <FileText size={48} color="#d1d5db" style={{ marginBottom: 16 }} />
            <Typography variant="body1" sx={{ color: '#6b7280', fontWeight: 500 }}>
              No invoices found
            </Typography>
            <Typography variant="body2" sx={{ color: '#9ca3af', mt: 1 }}>
              Try adjusting your search or filter
            </Typography>
          </Box>
        )}

        {filteredInvoices.length > 0 && (
          <>
            <Divider sx={{ borderColor: '#f0f0f0' }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
              <Pagination 
                count={Math.ceil(filteredInvoices.length / itemsPerPage)}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#6b7280',
                    '&.Mui-selected': {
                      bgcolor: '#2563eb',
                      color: 'white',
                      '&:hover': { bgcolor: '#1d4ed8' }
                    }
                  }
                }}
              />
            </Box>
          </>
        )}
      </Card>

      {/* View Invoice Dialog */}
      <Dialog 
        open={viewDialogOpen} 
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Invoice Details</Typography>
          <IconButton onClick={() => setViewDialogOpen(false)} size="small">
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedInvoice && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Invoice ID</Typography>
                  <Typography variant="body1" fontWeight="600">{selectedInvoice.id}</Typography>
                </Box>
                <Box>
                  {getStatusChip(selectedInvoice.status)}
                </Box>
              </Box>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Customer</Typography>
                  <Typography variant="body1">{selectedInvoice.customer}</Typography>
                  <Typography variant="body2" color="text.secondary">{selectedInvoice.email}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Amount</Typography>
                  <Typography variant="h6" color="primary">
                    ₹{selectedInvoice.amount.toLocaleString('en-IN')}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Issue Date</Typography>
                  <Typography variant="body1">{selectedInvoice.date}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Due Date</Typography>
                  <Typography variant="body1">{selectedInvoice.dueDate}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              setViewDialogOpen(false);
              handlePrintInvoice(selectedInvoice);
            }}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Invoice</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete invoice {selectedInvoice?.id}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
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

export default Invoices;