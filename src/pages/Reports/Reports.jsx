import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider
} from '@mui/material';
import {
  TrendingUp,
  IndianRupee,
  FileText,
  Calendar
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

const monthlyRevenue = [
  { month: 'Jan', revenue: 45000, invoices: 18 },
  { month: 'Feb', revenue: 52000, invoices: 21 },
  { month: 'Mar', revenue: 48000, invoices: 19 },
  { month: 'Apr', revenue: 61000, invoices: 24 },
  { month: 'May', revenue: 55000, invoices: 22 },
  { month: 'Jun', revenue: 67000, invoices: 27 },
  { month: 'Jul', revenue: 72000, invoices: 29 },
  { month: 'Aug', revenue: 68000, invoices: 26 },
  { month: 'Sep', revenue: 74000, invoices: 31 },
  { month: 'Oct', revenue: 79000, invoices: 33 },
  { month: 'Nov', revenue: 82000, invoices: 35 },
  { month: 'Dec', revenue: 89000, invoices: 38 },
];

const statusData = [
  { name: 'Paid', value: 156, color: '#10b981' },
  { name: 'Pending', value: 52, color: '#f59e0b' },
  { name: 'Overdue', value: 26, color: '#ef4444' },
];

const topCustomers = [
  { name: 'Global Solutions', revenue: 117000, invoices: 15 },
  { name: 'Acme Corporation', revenue: 64800, invoices: 12 },
  { name: 'Digital Ventures', revenue: 45000, invoices: 10 },
  { name: 'TechStart Inc', revenue: 25600, invoices: 8 },
  { name: 'Innovation Labs', revenue: 12600, invoices: 6 },
];

const summaryCards = [
  {
    title: 'YTD REVENUE',
    value: '₹328,000',
    change: '+18.2%',
    icon: IndianRupee,
    color: '#2563eb',
    bgColor: '#dbeafe',
    changeColor: '#10b981',
    changeBgColor: '#d1fae5'
  },
  {
    title: 'TOTAL INVOICES',
    value: '234',
    change: '131 paid, 52 pending',
    icon: FileText,
    color: '#10b981',
    bgColor: '#d1fae5',
    changeColor: '#6b7280',
    changeBgColor: '#f3f4f6'
  },
  {
    title: 'AVG INVOICE VALUE',
    value: '₹1,402',
    change: '+5.3%',
    icon: TrendingUp,
    color: '#8b5cf6',
    bgColor: '#ede9fe',
    changeColor: '#10b981',
    changeBgColor: '#d1fae5'
  },
  {
    title: 'AVG PAYMENT TIME',
    value: '12 days',
    change: '2 days faster',
    icon: Calendar,
    color: '#f59e0b',
    bgColor: '#fef3c7',
    changeColor: '#10b981',
    changeBgColor: '#d1fae5'
  }
];

export function Reports() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827', letterSpacing: '-0.02em', mb: 1 }}>
          Reports & Analytics
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b7280' }}>
          Track your business performance and insights
        </Typography>
      </Box>

      {/* Summary Cards */}
<Grid container spacing={3} sx={{ mb: 4 }}>
  {summaryCards.map((card, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Card sx={{ 
        boxShadow: 'none',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        width: '100%'
      }}>
        <CardContent sx={{ 
          p: 3,
          '&:last-child': {
            width: '256px'
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                bgcolor: card.bgColor,
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <card.icon size={24} color={card.color} />
            </Box>
            <Typography 
              sx={{ 
                fontWeight: 600, 
                color: card.changeColor, 
                bgcolor: card.changeBgColor, 
                px: 1.5, 
                py: 0.5, 
                borderRadius: '20px',
                fontSize: '0.75rem'
              }}
            >
              {card.change}
            </Typography>
          </Box>
          <Typography 
            sx={{ 
              color: '#6b7280', 
              mb: 0.5, 
              fontSize: '0.75rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em',
              fontWeight: 500
            }}
          >
            {card.title}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>
            {card.value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

      {/* Charts Row 1 */}
<Grid container spacing={3} sx={{ mb: 4 }}>
  {/* Revenue Trend Chart */}
  <Grid item xs={12} md={8}>
    <Card sx={{ 
      height: '100%',
      boxShadow: 'none',
      border: '1px solid #e5e7eb',
      borderRadius: '16px'
    }}>
      <CardContent sx={{ 
        p: 3,
        '&:last-child': {
          width: '580px'
        }
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 3 }}>
          Revenue Trend
        </Typography>
        <Box sx={{ height: 350, width: '100%' }}>
          <ResponsiveContainer>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="#9ca3af" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#9ca3af" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `₹${value/1000}k`}
                domain={[0, 100000]}
                ticks={[0, 25000, 50000, 75000, 100000]}
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
                stroke="#2563eb" 
                strokeWidth={3} 
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }} 
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  </Grid>

  {/* Invoice Status Pie Chart */}
  <Grid item xs={12} md={4}>
    <Card sx={{ 
      height: '100%',
      boxShadow: 'none',
      border: '1px solid #e5e7eb',
      borderRadius: '16px'
    }}>
      <CardContent sx={{ 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        '&:last-child': {
          width: '500px'
        }
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 3 }}>
          Invoice Status
        </Typography>
        <Box sx={{ height: 250, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} invoices`, 'Count']}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #e5e7eb',
                  boxShadow: 'none'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2, flexWrap: 'wrap' }}>
          {statusData.map((item) => (
            <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '2px', bgcolor: item.color }} />
              <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 500 }}>
                {item.name}: {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  </Grid>
</Grid>

{/* Charts Row 2 */}
<Grid container spacing={3}>
  {/* Monthly Invoices Bar Chart */}
  <Grid item xs={12} md={6}>
    <Card sx={{ 
      height: '100%',
      boxShadow: 'none',
      border: '1px solid #e5e7eb',
      borderRadius: '16px'
    }}>
      <CardContent sx={{ 
        p: 3,
        '&:last-child': {
          width: '580px'
        }
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 3 }}>
          Monthly Invoices
        </Typography>
        <Box sx={{ height: 300, width: '100%' }}>
          <ResponsiveContainer>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="#9ca3af" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#9ca3af" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <Tooltip 
                formatter={(value) => [`${value} invoices`, 'Count']}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #e5e7eb',
                  boxShadow: 'none'
                }}
              />
              <Bar 
                dataKey="invoices" 
                fill="#10b981" 
                radius={[8, 8, 0, 0]} 
                barSize={30} 
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  </Grid>

  {/* Top Customers List */}
  <Grid item xs={12} md={6}>
    <Card sx={{ 
      height: '100%',
      boxShadow: 'none',
      border: '1px solid #e5e7eb',
      borderRadius: '16px'
    }}>
      <CardContent sx={{ 
        p: 3,
        '&:last-child': {
          width: '500px'
        }
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 3 }}>
          Top Customers
        </Typography>
        <Box>
          {topCustomers.map((customer, index) => (
            <Box key={customer.name}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: index === 0 ? '#fef3c7' : index === 1 ? '#e0e7ff' : index === 2 ? '#d1fae5' : '#f3f4f6',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="body2" sx={{ 
                      fontWeight: 600,
                      color: index === 0 ? '#92400e' : index === 1 ? '#1e40af' : index === 2 ? '#065f46' : '#4b5563'
                    }}>
                      #{index + 1}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#111827' }}>
                      {customer.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6b7280' }}>
                      {customer.invoices} invoices
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>
                  ₹{customer.revenue.toLocaleString()}
                </Typography>
              </Box>
              {index < topCustomers.length - 1 && (
                <Divider sx={{ borderColor: '#e5e7eb' }} />
              )}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  </Grid>
</Grid>
    </Box>
  );
}

export default Reports;