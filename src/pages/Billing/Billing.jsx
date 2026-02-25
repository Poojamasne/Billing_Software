import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  IconButton,
  InputBase,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Plus,
  Minus,
  Printer,
  Trash2,
  Search,
  User,
  Phone,
  Hash,
  IndianRupee,
  Percent,
  Download,
  RefreshCw,
  CheckCircle,
  Mail,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './Billing.css';

const products = [
  { id: 1, code: 'PRD001', name: 'Web Development', description: 'Custom website development', price: 5000, category: 'Service', hsn: '9983' },
  { id: 2, code: 'PRD002', name: 'Mobile App Development', description: 'iOS and Android app development', price: 8000, category: 'Service', hsn: '9983' },
  { id: 3, code: 'PRD003', name: 'UI/UX Design', description: 'User interface and experience design', price: 3000, category: 'Service', hsn: '9983' },
  { id: 4, code: 'PRD004', name: 'SEO Optimization', description: 'Search engine optimization services', price: 1500, category: 'Service', hsn: '9983' },
  { id: 5, code: 'PRD005', name: 'Cloud Hosting', description: 'Monthly cloud hosting service', price: 200, category: 'Subscription', hsn: '9984' },
  { id: 6, code: 'PRD006', name: 'Consulting Hour', description: 'Technical consulting per hour', price: 150, category: 'Service', hsn: '9983' },
  { id: 7, code: 'PRD007', name: 'Logo Design', description: 'Professional logo design', price: 800, category: 'Service', hsn: '9983' },
  { id: 8, code: 'PRD008', name: 'API Integration', description: 'Third-party API integration', price: 2000, category: 'Service', hsn: '9983' },
  { id: 9, code: 'PRD009', name: 'Domain Registration', description: 'Annual domain registration', price: 999, category: 'Subscription', hsn: '9984' },
  { id: 10, code: 'PRD010', name: 'SSL Certificate', description: 'SSL certificate installation', price: 2999, category: 'Service', hsn: '9983' },
  { id: 11, code: 'PRD011', name: 'Website Maintenance', description: 'Monthly website maintenance', price: 2500, category: 'Subscription', hsn: '9984' },
  { id: 12, code: 'PRD012', name: 'Email Hosting', description: 'Business email hosting per year', price: 1200, category: 'Subscription', hsn: '9984' },
];

// Helper function to convert number to words
const numberToWords = (num) => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  const numToWords = (n) => {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n/10)] + (n%10 ? ' ' + ones[n%10] : '');
    if (n < 1000) return ones[Math.floor(n/100)] + ' Hundred' + (n%100 ? ' ' + numToWords(n%100) : '');
    if (n < 100000) return numToWords(Math.floor(n/1000)) + ' Thousand' + (n%1000 ? ' ' + numToWords(n%1000) : '');
    if (n < 10000000) return numToWords(Math.floor(n/100000)) + ' Lakh' + (n%100000 ? ' ' + numToWords(n%100000) : '');
    return numToWords(Math.floor(n/10000000)) + ' Crore' + (n%10000000 ? ' ' + numToWords(n%10000000) : '');
  };
  
  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);
  
  let result = numToWords(rupees) + ' Rupees';
  if (paise > 0) {
    result += ' and ' + numToWords(paise) + ' Paise';
  }
  return result;
};

const Billing = () => {
  const [billItems, setBillItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState('percentage');
  const [gstRate, setGstRate] = useState(18);
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [invoiceDate] = useState(new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }));
  
  const printRef = useRef();

  useEffect(() => {
    setInvoiceNumber(`INV-${Math.floor(Math.random() * 10000)}`);
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToBill = (product) => {
    setBillItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setShowProductSearch(false);
    setSearchTerm('');
  };

  const updateQuantity = (productId, delta) => {
    setBillItems(prevItems =>
      prevItems
        .map(item =>
          item.id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
    );
  };

  const removeItem = (productId) => {
    setBillItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearBill = () => {
    setBillItems([]);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setCustomerAddress('');
    setDiscount(0);
    setGstRate(18);
  };

  const handleSave = () => {
    if (!customerName) {
      alert('Please enter customer name');
      return;
    }
    if (billItems.length === 0) {
      alert('Please add at least one item');
      return;
    }

    generatePDF();
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Set document properties
    doc.setProperties({
      title: `Invoice ${invoiceNumber}`,
      subject: 'Invoice',
      author: 'Zonixtec Company ',
      keywords: 'invoice, billing',
      creator: 'Invoice Generator'
    });

    // Company Header
    doc.setFillColor(44, 62, 80);
    doc.rect(0, 0, doc.internal.pageSize.width, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('YOUR COMPANY', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('INVOICE', 105, 30, { align: 'center' });

    // Invoice Details Section
    doc.setTextColor(44, 62, 80);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    
    // Left side - Invoice details
    doc.text('Invoice Number:', 20, 50);
    doc.text('Invoice Date:', 20, 57);
    doc.text('Customer Name:', 20, 64);
    doc.text('Phone:', 20, 71);
    if (customerEmail) doc.text('Email:', 20, 78);
    if (customerAddress) doc.text('Address:', 20, 85);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(invoiceNumber, 60, 50);
    doc.text(invoiceDate, 60, 57);
    doc.text(customerName, 60, 64);
    doc.text(customerPhone || '-', 60, 71);
    if (customerEmail) doc.text(customerEmail, 60, 78);
    if (customerAddress) doc.text(customerAddress, 60, 85);

    // Right side - Company info
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(44, 62, 80);
    doc.text('From:', 130, 50);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text('Your Company Name', 130, 57);
    doc.text('123 Business Street', 130, 64);
    doc.text('City, State 12345', 130, 71);
    doc.text('Phone: +1 234 567 890', 130, 78);
    doc.text('Email: company@example.com', 130, 85);
    doc.text('GST: 27ABCDE1234F1Z5', 130, 92);

    // Calculate startY for table based on content
    let tableStartY = 105;
    if (customerEmail && customerAddress) {
      tableStartY = 115;
    } else if (customerEmail || customerAddress) {
      tableStartY = 110;
    }

    // Items Table
    const tableColumn = [
      'Sr. No.',
      'Code',
      'Item Name',
      'HSN/SAC',
      'Qty',
      'Rate (₹)',
      'Amount (₹)'
    ];

    const tableRows = billItems.map((item, index) => [
      index + 1,
      item.code,
      item.name,
      item.hsn || '9983',
      item.quantity,
      `₹${item.price.toLocaleString()}`,
      `₹${(item.price * item.quantity).toLocaleString()}`
    ]);

    // Add table using autoTable
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: tableStartY,
      theme: 'grid',
      styles: {
        fontSize: 9,
        cellPadding: 3,
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
        textColor: [44, 62, 80],
      },
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
        halign: 'center',
        cellPadding: 4,
      },
      columnStyles: {
        0: { cellWidth: 15, halign: 'center' },
        1: { cellWidth: 20 },
        2: { cellWidth: 50 },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 15, halign: 'center' },
        5: { cellWidth: 25, halign: 'right' },
        6: { cellWidth: 30, halign: 'right' }
      },
      margin: { left: 15, right: 15 }
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    
    const summaryX = 130;
    let summaryY = finalY;
    
    doc.setFillColor(249, 250, 251);
    doc.rect(summaryX - 5, summaryY - 2, 70, 60, 'F');
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.2);
    doc.rect(summaryX - 5, summaryY - 2, 70, 60, 'S');


    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(44, 62, 80);
    doc.text('Summary', summaryX + 25, summaryY + 5);


    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    
    doc.text('Subtotal:', summaryX, summaryY + 12);
    doc.text('Discount:', summaryX, summaryY + 20);
    doc.text('Taxable Value:', summaryX, summaryY + 28);
    doc.text(`GST (${gstRate}%):`, summaryX, summaryY + 36);
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(44, 62, 80);
    doc.text(`₹${subtotal.toFixed(2)}`, summaryX + 55, summaryY + 12, { align: 'right' });
    doc.text(`₹${discountAmount.toFixed(2)}`, summaryX + 55, summaryY + 20, { align: 'right' });
    doc.text(`₹${afterDiscount.toFixed(2)}`, summaryX + 55, summaryY + 28, { align: 'right' });
    doc.text(`₹${gstAmount.toFixed(2)}`, summaryX + 55, summaryY + 36, { align: 'right' });


    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.2);
    doc.line(summaryX, summaryY + 42, summaryX + 60, summaryY + 42);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(44, 62, 80);
    doc.text('Total:', summaryX, summaryY + 50);
    doc.setTextColor(52, 152, 219);
    doc.setFontSize(12);
    doc.text(`₹${finalTotal.toFixed(2)}`, summaryX + 55, summaryY + 50, { align: 'right' });

    // Amount in words - below summary
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    const amountInWords = numberToWords(finalTotal);

    const words = doc.splitTextToSize(`Amount in words: ${amountInWords} Only`, 170);
    doc.text(words, 15, summaryY + 30);

    const termsY = summaryY + 55;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.line(15, termsY, 195, termsY);
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(44, 62, 80);
    doc.text('Terms & Conditions:', 15, termsY + 7);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('1. Goods once sold will not be taken back', 15, termsY + 14);
    doc.text('2. Payment is due within 15 days of invoice date', 15, termsY + 21);
    doc.text('3. This is a computer generated invoice - valid without signature', 15, termsY + 28);

    // Footer
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.5);
    doc.line(15, doc.internal.pageSize.height - 15, 195, doc.internal.pageSize.height - 15);
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text('Thank you for your business!', 105, doc.internal.pageSize.height - 8, { align: 'center' });
    doc.text(`For any queries, please contact: accounts@yourcompany.com | +1 234 567 890`, 105, doc.internal.pageSize.height - 3, { align: 'center' });

    // Save PDF
    doc.save(`Invoice_${invoiceNumber}.pdf`);
  };

  const handlePrint = () => {
    if (!customerName) {
      alert('Please enter customer name');
      return;
    }
    if (billItems.length === 0) {
      alert('Please add at least one item');
      return;
    }
    
    window.print();
  };

  const subtotal = billItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const discountAmount = discountType === 'percentage' 
    ? (subtotal * discount) / 100 
    : discount;
  
  const afterDiscount = subtotal - discountAmount;
  const gstAmount = (afterDiscount * gstRate) / 100;
  const finalTotal = afterDiscount + gstAmount;

  return (
    <Box className="billing-container">
      <div className="background-animation">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          icon={<CheckCircle size={20} />}
          severity="success" 
          sx={{ 
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            fontWeight: 500
          }}
        >
          Invoice PDF downloaded successfully!
        </Alert>
      </Snackbar>

      <Container maxWidth={false} className="billing-wrapper full-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%' }}
        >
          <Paper elevation={10} className="main-card full-width-card" ref={printRef}>
            {/* Card Header */}
            <Box className="card-header">
              <Box className="header-left">
                <Typography variant="h4" className="card-title">
                  Invoice Generator
                </Typography>
                <Box className="invoice-meta">
                  <Box className="meta-item">
                    <Hash size={16} />
                    <Typography variant="body2">{invoiceNumber}</Typography>
                  </Box>
                  <Box className="meta-item">
                    <Typography variant="body2">{invoiceDate}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="header-actions">
                
                <Button
                  variant="contained"
                  startIcon={<Download size={18} />}
                  onClick={handleSave}
                  disabled={billItems.length === 0}
                  className="action-btn save-btn"
                >
                  Download
                </Button>
              </Box>
            </Box>

            <Divider className="divider" />

            {/* Customer Information */}
            <Box className="customer-section">
              <Typography variant="h6" className="section-title">
                Customer Details
              </Typography>
              <Box className="customer-row">
                <Box className="customer-field">
                  <User size={18} className="field-icon" />
                  <InputBase
                    placeholder="Customer Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="customer-input"
                    fullWidth
                    required
                  />
                </Box>
                <Box className="customer-field">
                  <Phone size={18} className="field-icon" />
                  <InputBase
                    placeholder="Phone Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="customer-input"
                    fullWidth
                  />
                </Box>
              </Box>

              <Box className="customer-row" style={{ marginTop: '0.5rem' }}>
                <Box className="customer-field">
                  <Mail size={18} className="field-icon" />
                  <InputBase
                    placeholder="Email Address"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="customer-input"
                    fullWidth
                  />
                </Box>
                <Box className="customer-field">
                  <MapPin size={18} className="field-icon" />
                  <InputBase
                    placeholder="Address"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="customer-input"
                    fullWidth
                  />
                </Box>
              </Box>
            </Box>

            <Divider className="divider" />

            {/* Search Button and Product Search */}
            <Box className="search-section">
              <Button
                variant="outlined"
                startIcon={<Search size={18} />}
                onClick={() => setShowProductSearch(!showProductSearch)}
                className="search-toggle-btn"
                fullWidth
              >
                {showProductSearch ? 'Hide Product Search' : 'Search Products'}
              </Button>

              {showProductSearch && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="product-search-dropdown"
                >
                  <Box className="search-wrapper">
                    <Search size={18} className="search-icon" />
                    <InputBase
                      placeholder="Search products by name or code..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                      fullWidth
                      autoFocus
                    />
                  </Box>
                  
                  <Box className="search-results">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <Paper
                          key={product.id}
                          className="search-result-item"
                          onClick={() => addToBill(product)}
                        >
                          <Box className="result-info">
                            <Typography variant="subtitle2" className="result-code">
                              {product.code}
                            </Typography>
                            <Typography variant="body1" className="result-name">
                              {product.name}
                            </Typography>
                            <Typography variant="caption" className="result-desc">
                              {product.description}
                            </Typography>
                          </Box>
                          <Box className="result-price">
                            <Typography variant="h6" className="price">
                              ₹{product.price}
                            </Typography>
                            <Button
                              size="small"
                              variant="contained"
                              className="add-small-btn"
                            >
                              Add
                            </Button>
                          </Box>
                        </Paper>
                      ))
                    ) : (
                      <Typography className="no-results">
                        No products found
                      </Typography>
                    )}
                  </Box>
                </motion.div>
              )}
            </Box>

            {/* Items Table */}
            <Box className="table-section full-width-table">
              <TableContainer component={Paper} elevation={0} className="table-container">
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" width="60">Sr. No.</TableCell>
                      <TableCell width="100">Code</TableCell>
                      <TableCell>Item Name</TableCell>
                      <TableCell width="80">HSN/SAC</TableCell>
                      <TableCell align="center" width="80">Quantity</TableCell>
                      <TableCell align="right" width="100">Rate</TableCell>
                      <TableCell align="right" width="110">Amount </TableCell>
                      <TableCell align="center" width="60">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {billItems.length > 0 ? (
                      billItems.map((item, index) => (
                        <TableRow key={item.id} hover>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell>
                            <Typography variant="body2" className="code-cell">
                              {item.code}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1" className="item-name-cell">
                              {item.name}
                            </Typography>
                            <Typography variant="caption" className="item-desc-cell">
                              {item.description}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2">
                              {item.hsn || '9983'}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Box className="table-quantity">
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="qty-btn"
                              >
                                <Minus size={14} />
                              </IconButton>
                              <Typography className="qty-value">
                                {item.quantity}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="qty-btn"
                              >
                                <Plus size={14} />
                              </IconButton>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Typography className="rate-cell">
                              ₹{item.price.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography className="amount-cell">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              size="small"
                              onClick={() => removeItem(item.id)}
                              className="remove-btn"
                            >
                              <Trash2 size={16} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} align="center" className="empty-table">
                          <Box className="empty-items">
                            <Typography variant="body1" className="empty-text">
                              No items added yet
                            </Typography>
                            <Typography variant="caption" className="empty-subtext">
                              Click on "Search Products" to add items
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Calculations Section - Full Width */}
            {billItems.length > 0 && (
              <Box className="calculations-wrapper">
                <Box className="totals-container">
                  <Box className="calc-row">
                    <Typography variant="body1">Subtotal:</Typography>
                    <Typography variant="body1" className="calc-value">
                      ₹{subtotal.toFixed(2)}
                    </Typography>
                  </Box>

                  <Box className="calc-row discount-row">
                    <Box className="discount-inputs">
                      <FormControl size="small" className="discount-type">
                        <Select
                          value={discountType}
                          onChange={(e) => setDiscountType(e.target.value)}
                          displayEmpty
                        >
                          <MenuItem value="percentage">%</MenuItem>
                          <MenuItem value="fixed">₹</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        size="small"
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="discount-value"
                        placeholder="Discount"
                        InputProps={{
                          startAdornment: discountType === 'fixed' ? <IndianRupee size={14} /> : <Percent size={14} />,
                        }}
                      />
                    </Box>
                    <Typography variant="body1" className="calc-value discount-amount">
                      - ₹{discountAmount.toFixed(2)}
                    </Typography>
                  </Box>

                  <Box className="calc-row">
                    <Typography variant="body1">After Discount:</Typography>
                    <Typography variant="body1" className="calc-value">
                      ₹{afterDiscount.toFixed(2)}
                    </Typography>
                  </Box>

                  <Box className="calc-row">
                    <Box className="gst-label">
                      <Typography variant="body1">GST ({gstRate}%):</Typography>
                    </Box>
                    <Typography variant="body1" className="calc-value">
                      ₹{gstAmount.toFixed(2)}
                    </Typography>
                  </Box>

                  <Divider className="calc-divider" />

                  <Box className="calc-row total-row">
                    <Typography variant="h5">Total Amount:</Typography>
                    <Typography variant="h4" className="total-value">
                      ₹{finalTotal.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Print Footer */}
            <Box className="print-footer">
              <Typography variant="body2">Thank you for your business!</Typography>
              <Typography variant="caption">For any queries, please contact us.</Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Billing;