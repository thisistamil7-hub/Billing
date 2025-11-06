import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
