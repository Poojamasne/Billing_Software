import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <CircularProgress sx={{ color: 'white' }} />
      </Box>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;