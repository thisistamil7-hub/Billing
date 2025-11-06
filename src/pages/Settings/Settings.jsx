import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import './Settings.css';

export default function Settings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    companyName: 'FlowerFarm Billing',
    companyEmail: 'info@flowerfarm.com',
    companyPhone: '+1 (555) 123-4567',
    companyAddress: '123 Farm Road, Flower City, FC 12345',
    taxRate: 8.5,
    currency: 'USD',
    invoicePrefix: 'INV',
    invoiceNumber: 1,
    paymentTerms: 30,
    defaultNotes: 'Thank you for your business!'
  });

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    role: user?.role || ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    invoiceReminders: true,
    paymentReminders: true,
    lowStockAlerts: true,
    weeklyReports: false
  });

  const handleSettingsChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleProfileChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleNotificationChange = (field, value) => {
    setNotifications({ ...notifications, [field]: value });
  };

  const handleSave = () => {
    console.log('Saving settings:', { settings, profile, notifications });
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your account and application settings</p>
        </div>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2 className="section-title">Company Information</h2>
          <div className="settings-form">
            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => handleSettingsChange('companyName', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Company Email *</label>
              <input
                type="email"
                value={settings.companyEmail}
                onChange={(e) => handleSettingsChange('companyEmail', e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Company Phone</label>
                <input
                  type="tel"
                  value={settings.companyPhone}
                  onChange={(e) => handleSettingsChange('companyPhone', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Currency</label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleSettingsChange('currency', e.target.value)}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD ($)</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Company Address</label>
              <textarea
                value={settings.companyAddress}
                onChange={(e) => handleSettingsChange('companyAddress', e.target.value)}
                rows="3"
              />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">Invoice Settings</h2>
          <div className="settings-form">
            <div className="form-row">
              <div className="form-group">
                <label>Invoice Prefix *</label>
                <input
                  type="text"
                  value={settings.invoicePrefix}
                  onChange={(e) => handleSettingsChange('invoicePrefix', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Starting Invoice Number</label>
                <input
                  type="number"
                  value={settings.invoiceNumber}
                  onChange={(e) => handleSettingsChange('invoiceNumber', parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Tax Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.taxRate}
                  onChange={(e) => handleSettingsChange('taxRate', parseFloat(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label>Payment Terms (days)</label>
                <input
                  type="number"
                  value={settings.paymentTerms}
                  onChange={(e) => handleSettingsChange('paymentTerms', parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Default Invoice Notes</label>
              <textarea
                value={settings.defaultNotes}
                onChange={(e) => handleSettingsChange('defaultNotes', e.target.value)}
                rows="3"
              />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">Profile Settings</h2>
          <div className="settings-form">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                value={profile.role}
                readOnly
                className="readonly-input"
              />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">Notification Preferences</h2>
          <div className="notification-settings">
            <div className="notification-item">
              <div className="notification-info">
                <div className="notification-label">Email Notifications</div>
                <div className="notification-desc">Receive email notifications for important updates</div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.emailNotifications}
                  onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="notification-item">
              <div className="notification-info">
                <div className="notification-label">Invoice Reminders</div>
                <div className="notification-desc">Get reminders for upcoming invoice due dates</div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.invoiceReminders}
                  onChange={(e) => handleNotificationChange('invoiceReminders', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="notification-item">
              <div className="notification-info">
                <div className="notification-label">Payment Reminders</div>
                <div className="notification-desc">Receive alerts for overdue payments</div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.paymentReminders}
                  onChange={(e) => handleNotificationChange('paymentReminders', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="notification-item">
              <div className="notification-info">
                <div className="notification-label">Low Stock Alerts</div>
                <div className="notification-desc">Get notified when product stock is running low</div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.lowStockAlerts}
                  onChange={(e) => handleNotificationChange('lowStockAlerts', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="notification-item">
              <div className="notification-info">
                <div className="notification-label">Weekly Reports</div>
                <div className="notification-desc">Receive weekly summary reports via email</div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.weeklyReports}
                  onChange={(e) => handleNotificationChange('weeklyReports', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-actions">
          <button className="btn-secondary" onClick={() => window.location.reload()}>
            Reset
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

