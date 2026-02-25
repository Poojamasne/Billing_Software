import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');
    
    if (isLoggedIn && userEmail) {
      setUser({ email: userEmail });
    }
    setLoading(false);
  }, []);

  const login = (email) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    setUser({ email });
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};