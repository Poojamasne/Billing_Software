import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Alert,
  Fade,
  Zoom
} from '@mui/material';
import {
  LockOutlined,
  EmailOutlined,
  Visibility,
  VisibilityOff,
  AccountCircle,
  ReceiptLong,
  TrendingUp,
  Security
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  // Single user credentials
  const SINGLE_USER = {
    email: 'admin@billing.com',
    password: 'admin123'
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    
    setLoading(true);
    
    // Simulate login check
    setTimeout(() => {
      if (formData.email === SINGLE_USER.email && 
          formData.password === SINGLE_USER.password) {
        
        // Store login state using AuthContext
        login(formData.email);
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setErrors({ general: 'Invalid credentials. Please try again.' });
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
      setLoading(false);
    }, 1500);
  };

  // Single demo login - only admin
  const handleDemoLogin = () => {
    setFormData({
      ...formData,
      email: 'admin@billing.com',
      password: 'admin123'
    });
  };

  return (
    <Box className="login-container">
      {/* Animated Background */}
      <div className="background-animation">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <Container maxWidth="lg" className="login-wrapper">
        <Zoom in={true} style={{ transitionDelay: '200ms' }}>
          <Box className="login-grid">
            {/* Left Side - Branding & Info */}
            <motion.div 
              className="login-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box className="brand-section">
                <Box className="logo-wrapper">
                  <ReceiptLong className="logo-icon" />
                  <Typography variant="h3" className="brand-name">
                    Bill<span>Flow</span>
                  </Typography>
                </Box>
                <Typography variant="h4" className="welcome-text">
                  Welcome Back!
                </Typography>
                <Typography variant="body1" className="subtitle">
                  Streamline your billing process with our powerful software
                </Typography>
              </Box>

              <Box className="features">
                <Box className="feature-item">
                  <TrendingUp className="feature-icon" />
                  <Box>
                    <Typography variant="h6">Real-time Analytics</Typography>
                    <Typography variant="body2">Track sales and revenue in real-time</Typography>
                  </Box>
                </Box>
                <Box className="feature-item">
                  <Security className="feature-icon" />
                  <Box>
                    <Typography variant="h6">Secure & Reliable</Typography>
                    <Typography variant="body2">Bank-level security for your data</Typography>
                  </Box>
                </Box>
                <Box className="feature-item">
                  <AccountCircle className="feature-icon" />
                  <Box>
                    <Typography variant="h6">Easy Management</Typography>
                    <Typography variant="body2">Manage customers and invoices effortlessly</Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div 
              className="login-right"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Paper 
                elevation={10} 
                className={`login-paper ${shake ? 'shake' : ''}`}
                component={motion.div}
                whileHover={{ y: -5 }}
              >
                <Box className="form-header">
                  <LockOutlined className="form-icon" />
                  <Typography variant="h4" className="form-title">
                    Sign In
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Enter your credentials to continue
                  </Typography>
                </Box>

                {errors.general && (
                  <Fade in={!!errors.general}>
                    <Alert severity="error" className="error-alert">
                      {errors.general}
                    </Alert>
                  </Fade>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    margin="normal"
                    variant="outlined"
                    className="input-field"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlined className="input-icon" />
                        </InputAdornment>
                      ),
                      className: 'input'
                    }}
                    placeholder="admin@billing.com"
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    margin="normal"
                    variant="outlined"
                    className="input-field"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined className="input-icon" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            className="eye-button"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      className: 'input'
                    }}
                    placeholder="••••••••"
                  />

                  <Box className="form-options">
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleChange}
                          color="primary"
                        />
                      }
                      label="Remember me"
                    />
                  </Box>

                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    className="login-button"
                    size="large"
                    disabled={loading}
                  >
                    {loading ? (
                      <Box className="loading-spinner">
                        <div className="spinner"></div>
                        Signing in...
                      </Box>
                    ) : (
                      'Sign In'
                    )}
                  </Button>

                  {/* Demo Section - Single User */}
                  <Box className="demo-section">
                    <Typography variant="body2" className="demo-title">
                      Demo Login:
                    </Typography>
                    <Box className="demo-buttons">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleDemoLogin}
                        className="demo-button"
                      >
                        Use Admin Account
                      </Button>
                    </Box>
                    <Typography variant="caption" display="block" align="center" sx={{ mt: 1, color: '#666' }}>
                      Email: admin@billing.com / Password: admin123
                    </Typography>
                  </Box>
                </form>
              </Paper>
            </motion.div>
          </Box>
        </Zoom>
      </Container>
    </Box>
  );
};

export default Login;