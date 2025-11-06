import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './MenuBar.css';

export default function MenuBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleNavigate = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar-main">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo" onClick={() => handleNavigate('/dashboard')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="logo-text">
            <div className="logo-title">FlowerFarm</div>
            <div className="logo-subtitle">Billing System</div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="navbar-menu">
          <button onClick={() => handleNavigate('/dashboard')} className={`nav-item ${isActive('/dashboard')}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="14" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="14" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="3" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Dashboard</span>
          </button>

          <button onClick={() => handleNavigate('/customers')} className={`nav-item ${isActive('/customers')}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Customers</span>
          </button>

          <button onClick={() => handleNavigate('/products')} className={`nav-item ${isActive('/products')}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="9" cy="21" r="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="20" cy="21" r="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Products</span>
          </button>

          <button onClick={() => handleNavigate('/invoices')} className={`nav-item ${isActive('/invoices')}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="14 2 14 8 20 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="16" y1="13" x2="8" y2="13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="16" y1="17" x2="8" y2="17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="10 9 9 9 8 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Invoices</span>
          </button>

          <button onClick={() => handleNavigate('/create-invoice')} className={`nav-item ${isActive('/create-invoice')}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Create Invoice</span>
          </button>

          <button onClick={() => handleNavigate('/reports')} className={`nav-item ${isActive('/reports')}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="20" x2="18" y2="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="20" x2="12" y2="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="6" y1="20" x2="6" y2="14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Reports</span>
          </button>

          <div className="nav-item-dropdown">
            <button className="nav-item" onClick={() => setShowDropdown(!showDropdown)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="5" r="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="19" r="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>More</span>
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => handleNavigate('/settings')} className="dropdown-item">Settings</button>
                <button onClick={handleLogout} className="dropdown-item">Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="navbar-profile" onClick={() => setShowDropdown(!showDropdown)}>
          <div className="profile-avatar">
            <span>{user ? user.name.split(' ').map(n => n[0]).join('') : 'U'}</span>
          </div>
          <div className="profile-info">
            <div className="profile-name">{user ? user.name : 'User'}</div>
            <svg className="profile-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="6 9 12 15 18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
}
