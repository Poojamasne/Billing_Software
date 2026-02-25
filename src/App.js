import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute/ProtectedRoute';
import Login from './pages/Auth/Login/Login';
import Layout from './components/common/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Invoices from './pages/Invoices/Invoices';
import CreateInvoice from './pages/Invoices/CreateInvoice';
import EditInvoice from './pages/Invoices/EditInvoice';
import Customers from './pages/Customers/Customers';
import Billing from './pages/Billing/Billing';
import Products from './pages/Products/Products';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';
import './App.css';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  palette: {
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    ...Array(18).fill('none'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '10px',
          padding: '10px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        outlined: {
          borderColor: '#e5e7eb',
          color: '#374151',
          '&:hover': {
            borderColor: '#9ca3af',
            backgroundColor: '#f9fafb',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #f0f0f0',
          borderRadius: '16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #f0f0f0',
        },
        head: {
          fontWeight: 600,
          color: '#6b7280',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          backgroundColor: '#f9fafb',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#f9fafb',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#f0f0f0',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e5e7eb',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9ca3af',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2563eb',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Route - Login */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes - Require Authentication */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="invoices/create" element={<CreateInvoice />} />
              <Route path="invoices/edit/:id" element={<EditInvoice />} />
              <Route path="customers" element={<Customers />} />
              <Route path="products" element={<Products />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
              
            </Route>
            
            {/* Redirect any unknown routes to login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;