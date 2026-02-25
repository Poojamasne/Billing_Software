import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  Divider,
  Paper,
  Snackbar,
  Alert
} from "@mui/material";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function EditInvoice() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [items, setItems] = useState([
    { id: "1", description: "Web Development", quantity: 1, price: 5000 },
    { id: "2", description: "UI/UX Design", quantity: 1, price: 3000 },
  ]);
  const [customer, setCustomer] = useState("1");
  const [invoiceNumber, setInvoiceNumber] = useState(id);
  const [issueDate, setIssueDate] = useState("2026-02-12");
  const [dueDate, setDueDate] = useState("2026-02-27");
  const [notes, setNotes] = useState("Thank you for your business! Payment is due within 15 days.");
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Simulate fetching invoice data
  useEffect(() => {
    // In a real app, you would fetch the invoice data here
    // For demo purposes, we're using the existing state
    console.log(`Fetching invoice ${id}`);
  }, [id]);

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), description: "", quantity: 1, price: 0 },
    ]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!customer) {
      setSnackbar({
        open: true,
        message: 'Please select a customer',
        severity: 'error'
      });
      return;
    }

    // Here you would typically make an API call to update the invoice
    console.log('Updating invoice:', {
      id,
      customer,
      invoiceNumber,
      issueDate,
      dueDate,
      items,
      notes,
      subtotal,
      tax,
      total
    });

    setSnackbar({
      open: true,
      message: 'Invoice updated successfully!',
      severity: 'success'
    });

    // Navigate back after a short delay
    setTimeout(() => {
      navigate("/invoices");
    }, 1500);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box className="edit-invoice">
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <IconButton
          component={Link}
          to="/invoices"
          sx={{ color: "#6b7280", "&:hover": { bgcolor: "#f3f4f6" } }}
        >
          <ArrowLeft size={20} />
        </IconButton>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#111827",
              letterSpacing: "-0.02em",
              mb: 1,
            }}
          >
            Edit Invoice {id}
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280" }}>
            Update the invoice details
          </Typography>
        </Box>
      </Box>

      <form onSubmit={handleSubmit}>
  <Grid container spacing={3}>
    {/* Main Content - Full Width Column */}
    <Grid item xs={12}>
      {/* Invoice Information Card */}
      <Card elevation={0} sx={{ mb: 3, border: '1px solid #e5e7eb', borderRadius: '12px' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#111827", mb: 3 }}
          >
            Invoice Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Customer"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                size="small"
                required
                sx={{ width: '200px' }}
              >
                <MenuItem value="">Select Customer</MenuItem>
                <MenuItem value="1">Acme Corporation</MenuItem>
                <MenuItem value="2">TechStart Inc</MenuItem>
                <MenuItem value="3">Global Solutions</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Invoice Number"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Issue Date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                size="small"
                required
                sx={{ width: '220px' }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Due Date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                size="small"
                required
                sx={{ width: '220px' }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Items Card */}
      <Card elevation={0} sx={{ mb: 3, border: '1px solid #e5e7eb', borderRadius: '12px' }}>
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#111827" }}
            >
              Items
            </Typography>
            <Button
              type="button"
              onClick={addItem}
              startIcon={<Plus size={18} />}
              sx={{ color: "#2563eb" }}
            >
              Add Item
            </Button>
          </Box>

          {items.map((item, index) => (
            <Paper
              key={item.id}
              elevation={0}
              sx={{
                p: 2,
                mb: 2,
                border: "1px solid",
                borderColor: "#e5e7eb",
                borderRadius: "12px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(item.id, "description", e.target.value)
                    }
                    size="small"
                    required
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Qty"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "quantity",
                        parseInt(e.target.value) || 0,
                      )
                    }
                    size="small"
                    required
                    inputProps={{ min: 1 }}
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Price"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "price",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    size="small"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          ₹
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={10} md={2}>
                  <TextField
                    fullWidth
                    label="Total"
                    value={(item.quantity * item.price).toFixed(2)}
                    size="small"
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          ₹
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={2} md={1}>
                  <IconButton
                    onClick={() => removeItem(item.id)}
                    disabled={items.length === 1}
                    sx={{
                      mt: 1,
                      color: "#9ca3af",
                      "&:hover": { color: "#dc2626" },
                    }}
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          ))}

          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              size="small"
            />
          </Box>
        </CardContent>
      </Card>

      {/* Summary Card - Now full width like Create Invoice */}
      <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '12px' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#111827", mb: 3 }}>
            Summary
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1.5,
              }}
            >
              <Typography variant="body2" sx={{ color: "#6b7280" }}>
                Subtotal
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: "#111827" }}
              >
                ₹
                {subtotal.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1.5,
              }}
            >
              <Typography variant="body2" sx={{ color: "#6b7280" }}>
                Tax (10%)
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: "#111827" }}
              >
                ₹
                {tax.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ borderColor: "#f0f0f0", mb: 3 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 4,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#111827" }}
            >
              Total
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#111827" }}
            >
              ₹
              {total.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </Typography>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            startIcon={<Save size={18} />}
            sx={{ bgcolor: "#2563eb", py: 1.5, mb: 2 }}
          >
            Update Invoice
          </Button>
          <Button
            component={Link}
            to="/invoices"
            fullWidth
            variant="outlined"
            sx={{ borderColor: "#e5e7eb", color: "#374151", py: 1.5 }}
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</form>

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

export default EditInvoice;