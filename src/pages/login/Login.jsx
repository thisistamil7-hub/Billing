import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, clearError } from '../../context/authSlice';
import './Login.css';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  });
  const [localError, setLocalError] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Redirect after successful authentication
  useEffect(() => {
    if (isAuthenticated) {
      navigate(isSignUp ? '/billing-plan' : '/dashboard');
    }
  }, [isAuthenticated, navigate, isSignUp]);

  // Clear Redux error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearError()), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Clear local error after 5 seconds
  useEffect(() => {
    if (localError) {
      const timer = setTimeout(() => setLocalError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [localError]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    setLocalError('');
    if (error) dispatch(clearError());
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    dispatch(clearError());

    const { name, email, password, confirmPassword } = formData;

    if (isSignUp) {
      // Sign Up Validation
      if (!name.trim()) {
        setLocalError('Please enter your full name');
        return;
      }
      if (name.trim().length < 2) {
        setLocalError('Name must be at least 2 characters');
        return;
      }
      if (!email) {
        setLocalError('Please enter your email');
        return;
      }
      if (!validateEmail(email)) {
        setLocalError('Please enter a valid email address');
        return;
      }
      if (!password) {
        setLocalError('Please enter a password');
        return;
      }
      if (password.length < 6) {
        setLocalError('Password must be at least 6 characters');
        return;
      }
      if (!confirmPassword) {
        setLocalError('Please confirm your password');
        return;
      }
      if (password !== confirmPassword) {
        setLocalError('Passwords do not match');
        return;
      }

      // Dispatch register action
      await dispatch(registerUser({ name, email, password }));
    } else {
      // Login Validation
      if (!email) {
        setLocalError('Please enter your email');
        return;
      }
      if (!validateEmail(email)) {
        setLocalError('Please enter a valid email address');
        return;
      }
      if (!password) {
        setLocalError('Please enter your password');
        return;
      }

      // Dispatch login action
      await dispatch(loginUser({ email, password }));
    }
  };

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="login-container">
      {/* LEFT PANEL */}
      <div className="left-panel">
        <div className="login-card">
          {/* Logo */}
          <div className="logo-container">
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <h1 className="welcome-title">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="welcome-subtitle">
            {isSignUp
              ? 'Join FlowerFarm billing system today'
              : 'Sign in to your FlowerFarm billing account'}
          </p>

          {/* MESSAGES */}
          {(error || localError) && (
            <div className="error-message">{error || localError}</div>
          )}

          {/* FORM */}
          <form className="login-form" onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                placeholder={isSignUp ? 'Create a password (min 6 characters)' : 'Enter your password'}
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            {isSignUp && (
              <div className="form-group">
                <label>Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>
            )}

            {!isSignUp && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
              </div>
            )}

            <button type="submit" className="sign-in-btn" disabled={loading}>
              {loading
                ? isSignUp ? '⏳ Creating account...' : '⏳ Signing in...'
                : isSignUp ? '✨ Create Account' : '🔒 Sign In'}
            </button>
          </form>

          <div className="signup-link">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button 
                  className="link-btn"
                  onClick={() => {
                    setIsSignUp(false);
                    setLocalError('');
                    dispatch(clearError());
                  }}
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button 
                  className="link-btn"
                  onClick={() => {
                    setIsSignUp(true);
                    setLocalError('');
                    dispatch(clearError());
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Demo Credentials */}
          {!isSignUp && (
            <div className="demo-box">
              <p className="demo-label">Demo Credentials:</p>
              <p>
                Admin: <span className="demo-bold">admin@flowerfarm.com</span>
              </p>
              <p>
                Pass: <span className="demo-bold">FlowerFarm2024!</span>
              </p>
            </div>
          )}

          {/* Trust Section */}
          <div className="trust-section">
            <h3 className="trust-title">
              {isSignUp ? 'Why Choose Us?' : 'Trusted & Secure'}
            </h3>

            {isSignUp ? (
              <>
                <div className="trust-item">
                  <div className="trust-icon">📊</div>
                  <div>
                    <h4>Smart Billing</h4>
                    <p>Automated invoicing and payment tracking</p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-icon">📦</div>
                  <div>
                    <h4>Inventory Management</h4>
                    <p>Real-time stock tracking and alerts</p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-icon">📈</div>
                  <div>
                    <h4>Business Analytics</h4>
                    <p>Insights to grow your business</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="trust-item">
                  <div className="trust-icon">🔒</div>
                  <div>
                    <h4>SSL Encrypted</h4>
                    <p>Your data is protected with 256-bit SSL encryption</p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-icon">🔐</div>
                  <div>
                    <h4>Secure Login</h4>
                    <p>Multi-factor authentication available</p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-icon">✓</div>
                  <div>
                    <h4>Certified</h4>
                    <p>Agricultural business compliance certified</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="hero-content">
          <h2 className="hero-title">
            {isSignUp ? 'Join FlowerFarm' : 'FlowerFarm Billing'}
          </h2>
          <p className="hero-subtitle">
            {isSignUp
              ? 'Get access to powerful tools to manage your flower farm business efficiently.'
              : 'Streamline your flower farm operations with our billing and inventory management system.'}
          </p>
        </div>

        <div className="status-card">
          <div className="status-header">
            <h3>System Status</h3>
            <a href="#" className="all-systems">
              ⚡ All Systems Operational
            </a>
          </div>

          <div className="status-items">
            {['Billing System', 'Payment Gateway', 'Database', 'Backup System'].map((system, i) => (
              <div className="status-row" key={i}>
                <span className="status-dot"></span>
                <span className="status-name">{system}</span>
                <span className="status-badge">Operational</span>
              </div>
            ))}
          </div>

          <div className="time-section">
            <div className="time">{formattedTime}</div>
            <div className="date">{formattedDate}</div>
          </div>
        </div>

        <div className="help-section">
          <h4>Need Help?</h4>
          <div>
            📧 Reach us: <a href="mailto:info@flowerfarm.com" className="help-link">info@flowerfarm.com</a>
          </div>
          <div>
            📝 <a href="mailto:help@flowerfarm.com" className="help-link">help@flowerfarm.com</a>
          </div>
          <div>📞 24/7 Support Available</div>
        </div>
      </div>
    </div>
  );
}