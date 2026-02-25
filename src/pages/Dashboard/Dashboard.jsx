import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Link as MuiLink
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import {
  IndianRupee,
  FileText,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
];

const recentInvoices = [
  { id: 'INV-001', customer: 'Acme Corporation', amount: 5400, status: 'paid', date: '2026-02-10' },
  { id: 'INV-002', customer: 'TechStart Inc', amount: 3200, status: 'pending', date: '2026-02-09' },
  { id: 'INV-003', customer: 'Global Solutions', amount: 7800, status: 'paid', date: '2026-02-08' },
  { id: 'INV-004', customer: 'Innovation Labs', amount: 2100, status: 'overdue', date: '2026-01-25' },
  { id: 'INV-005', customer: 'Digital Ventures', amount: 4500, status: 'paid', date: '2026-02-07' },
];

// Styled components - Increased width and padding
const StyledCard = styled(Card)({
  border: '1px solid #e5e7eb',
  borderRadius: '16px', // Slightly larger radius
  boxShadow: 'none',
  height: '100%',
  width: '100%',
  '&:hover': {
    borderColor: '#d1d5db',
  },
});

const StyledCardContent = styled(CardContent)({
  padding: '28px !important', // Increased from 24px
  '&:last-child': {
    paddingBottom: '28px !important',
  },
});

const StatusChip = styled(Chip)(({ status }) => ({
  height: '26px', // Slightly taller
  fontSize: '12px',
  fontWeight: 600,
  borderRadius: '9999px',
  padding: '0 12px',
  '& .MuiChip-label': {
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  ...(status === 'paid' && {
    backgroundColor: '#dcfce7',
    color: '#166534',
  }),
  ...(status === 'pending' && {
    backgroundColor: '#fef9c3',
    color: '#854d0e',
  }),
  ...(status === 'overdue' && {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  }),
}));

const Dashboard = () => {
  const getStatusIcon = (status) => {
    if (status === 'paid') return <CheckCircle size={12} style={{ marginRight: '4px' }} />;
    return null;
  };

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: '100%',
      px: { xs: 2, sm: 3, md: 4 },
      py: { xs: 3, sm: 4 }
    }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 700, 
          color: '#111827', 
          fontSize: { xs: '26px', sm: '28px', md: '30px' },
          mb: 1,
          letterSpacing: '-0.025em'
        }}>
          Dashboard
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '16px' }}>
          Welcome back! Here's an overview of your business.
        </Typography>
      </Box>

      {/* Stats Grid - Full Width with increased spacing */}
<Grid container spacing={3.5} sx={{ mb: 4.5 }}>
  {/* Total Revenue */}
  <Grid item xs={12} sm={6} md={3}>
    <StyledCard>
      <StyledCardContent 
        sx={{ 
          '&:last-child': { 
            width: '250px'
          } 
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
          <Box sx={{ 
            width: 52,
            height: 52,
            bgcolor: '#dbeafe', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <IndianRupee size={26} color="#2563eb" />
          </Box>
          <Chip 
            label="+12.5%" 
            size="small"
            sx={{ 
              bgcolor: '#dcfce7', 
              color: '#166534',
              fontSize: '12px',
              fontWeight: 600,
              height: '26px',
              borderRadius: '9999px',
              px: 1
            }} 
          />
        </Box>
        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '15px', fontWeight: 500, mb: 0.5 }}>
          Total Revenue
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', fontSize: '28px' }}>
          ₹67,000
        </Typography>
      </StyledCardContent>
    </StyledCard>
  </Grid>

  {/* Total Invoices */}
  <Grid item xs={12} sm={6} md={3}>
    <StyledCard>
      <StyledCardContent 
        sx={{ 
          '&:last-child': { 
            width: '250px'
          } 
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
          <Box sx={{ 
            width: 52,
            height: 52,
            bgcolor: '#dcfce7', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileText size={26} color="#16a34a" />
          </Box>
          <Chip 
            label="+8" 
            size="small"
            sx={{ 
              bgcolor: '#dbeafe', 
              color: '#1e40af',
              fontSize: '12px',
              fontWeight: 600,
              height: '26px',
              borderRadius: '9999px'
            }} 
          />
        </Box>
        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '15px', fontWeight: 500, mb: 0.5 }}>
          Total Invoices
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', fontSize: '28px' }}>
          234
        </Typography>
      </StyledCardContent>
    </StyledCard>
  </Grid>

  {/* Total Customers */}
  <Grid item xs={12} sm={6} md={3}>
    <StyledCard>
      <StyledCardContent 
        sx={{ 
          '&:last-child': { 
            width: '250px'
          } 
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
          <Box sx={{ 
            width: 52,
            height: 52,
            bgcolor: '#f3e8ff', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Users size={26} color="#9333ea" />
          </Box>
          <Chip 
            label="+3" 
            size="small"
            sx={{ 
              bgcolor: '#dcfce7', 
              color: '#166534',
              fontSize: '12px',
              fontWeight: 600,
              height: '26px',
              borderRadius: '9999px'
            }} 
          />
        </Box>
        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '15px', fontWeight: 500, mb: 0.5 }}>
          Total Customers
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', fontSize: '28px' }}>
          48
        </Typography>
      </StyledCardContent>
    </StyledCard>
  </Grid>

  {/* Pending Payments */}
  <Grid item xs={12} sm={6} md={3}>
    <StyledCard>
      <StyledCardContent 
        sx={{ 
          '&:last-child': { 
            width: '250px'
          } 
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
          <Box sx={{ 
            width: 52,
            height: 52,
            bgcolor: '#ffedd5', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Clock size={26} color="#ea580c" />
          </Box>
          <Chip 
            label="3" 
            size="small"
            sx={{ 
              bgcolor: '#fee2e2', 
              color: '#991b1b',
              fontSize: '12px',
              fontWeight: 600,
              height: '26px',
              borderRadius: '9999px'
            }} 
          />
        </Box>
        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '15px', fontWeight: 500, mb: 0.5 }}>
          Pending Payments
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', fontSize: '28px' }}>
          ₹12,800
        </Typography>
      </StyledCardContent>
    </StyledCard>
  </Grid>
</Grid>

      {/* Charts - Full Width with increased height and width */}
<Grid container spacing={3.5} sx={{ mb: 4.5 }}>
  {/* Revenue Overview - Bar Chart */}
  <Grid item xs={12} lg={6}>
    <StyledCard>
      <StyledCardContent 
        sx={{ 
          '&:last-child': { 
            width: '540px' // Increased width
          } 
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', fontSize: '20px', mb: 3.5 }}>
          Revenue Overview
        </Typography>
        <Box sx={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="#9ca3af" 
                fontSize={13}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#9ca3af" 
                fontSize={13}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value/1000}k`}
                domain={[0, 80000]}
                ticks={[0, 20000, 40000, 60000, 80000]}
              />
              <Tooltip 
                formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #e5e7eb',
                  boxShadow: 'none'
                }}
              />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </StyledCardContent>
    </StyledCard>
  </Grid>

  {/* Revenue Trend - Line Chart */}
  <Grid item xs={12} lg={6}>
    <StyledCard>
      <StyledCardContent 
        sx={{ 
          '&:last-child': { 
            width: '525px' // Increased width
          } 
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', fontSize: '20px', mb: 3.5 }}>
          Revenue Trend
        </Typography>
        <Box sx={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="#9ca3af" 
                fontSize={13}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#9ca3af" 
                fontSize={13}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value/1000}k`}
                domain={[0, 80000]}
                ticks={[0, 20000, 40000, 60000, 80000]}
              />
              <Tooltip 
                formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #e5e7eb',
                  boxShadow: 'none'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </StyledCardContent>
    </StyledCard>
  </Grid>
</Grid>

      {/* Recent Invoices - Full Width */}
      <StyledCard>
        <Box sx={{ 
          p: 3.5, // Increased padding
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderBottom: '1px solid #e5e7eb' 
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', fontSize: '20px' }}>
            Recent Invoices
          </Typography>
          <MuiLink
            component={Link}
            to="/invoices"
            sx={{ 
              color: '#2563eb', 
              fontSize: '15px', 
              fontWeight: 500,
              textDecoration: 'none',
              '&:hover': {
                color: '#1d4ed8',
                textDecoration: 'underline'
              }
            }}
          >
            View all
          </MuiLink>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f9fafb' }}>
                <TableCell sx={{ fontWeight: 600, color: '#6b7280', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', py: 3 }}>Invoice ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#6b7280', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', py: 3 }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#6b7280', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', py: 3 }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#6b7280', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', py: 3 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#6b7280', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', py: 3 }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentInvoices.map((invoice) => (
                <TableRow key={invoice.id} hover sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
                  <TableCell sx={{ py: 3, fontWeight: 600, color: '#111827', fontFamily: 'monospace', fontSize: '14px' }}>
                    {invoice.id}
                  </TableCell>
                  <TableCell sx={{ py: 3, color: '#4b5563', fontSize: '14px' }}>
                    {invoice.customer}
                  </TableCell>
                  <TableCell sx={{ py: 3, fontWeight: 600, color: '#111827', fontSize: '14px' }}>
                    ₹{invoice.amount.toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ py: 3 }}>
                    <StatusChip
                      status={invoice.status}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getStatusIcon(invoice.status)}
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </Box>
                      }
                    />
                  </TableCell>
                  <TableCell sx={{ py: 3, color: '#6b7280', fontSize: '14px' }}>
                    {invoice.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledCard>
    </Box>
  );
};

export default Dashboard;