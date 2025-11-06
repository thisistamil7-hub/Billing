import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BillingPlan.css';

export default function BillingPlan() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$29',
      period: '/month',
      features: [
        'Up to 100 invoices per month',
        'Basic inventory management',
        'Customer management',
        'Email support',
        'Basic reporting',
      ],
      popular: false,
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$79',
      period: '/month',
      features: [
        'Unlimited invoices',
        'Advanced inventory management',
        'Customer management',
        'Priority email support',
        'Advanced reporting & analytics',
        'Custom branding',
        'API access',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        '24/7 phone support',
        'Custom integrations',
        'Advanced security features',
        'Multi-user access',
        'Custom training',
      ],
      popular: false,
    },
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    // Here you would typically integrate with payment processing
    // For now, we'll just navigate to dashboard after selection
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="billing-plan-container">
      <div className="billing-plan-header">
        <div className="logo-container">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="company-name">FlowerFarm Billing</h1>
        </div>
      </div>

      <div className="billing-plan-content">
        <div className="billing-plan-intro">
          <h2 className="intro-title">Choose Your Plan</h2>
          <p className="intro-subtitle">
            Select the perfect plan for your flower farm business. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${plan.popular ? 'popular' : ''} ${selectedPlan === plan.id ? 'selected' : ''}`}
            >
              {plan.popular && (
                <div className="popular-badge">
                  <span>Most Popular</span>
                </div>
              )}
              
              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">
                  <span className="price-amount">{plan.price}</span>
                  <span className="price-period">{plan.period}</span>
                </div>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`plan-button ${selectedPlan === plan.id ? 'selected' : ''}`}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {selectedPlan === plan.id ? 'Selected ✓' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        <div className="billing-plan-footer">
          <p className="footer-text">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="footer-text">
            Need help choosing? <a href="mailto:support@flowerfarm.com">Contact our sales team</a>
          </p>
        </div>
      </div>
    </div>
  );
}

