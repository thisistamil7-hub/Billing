import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from './authSlice';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const logout = async () => {
    if (user?.email) {
      await dispatch(logoutUser({ email: user.email }));
    } else {
      // Fallback: clear local storage if no user email
      localStorage.removeItem('flowerfarm_user');
      localStorage.removeItem('flowerfarm_token');
    }
  };

  const value = {
    user,
    isAuthenticated,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};