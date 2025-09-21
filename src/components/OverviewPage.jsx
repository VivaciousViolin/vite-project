import React from 'react'
import Header from './Header.jsx'

function OverviewPage({ showAuthPage }) {
  return (
    <div className="page-overview">
      <Header showAuthPage={showAuthPage} />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Take Control of Your Financial Future</h1>
            <p>FinanceFlow helps you track expenses, manage budgets, and achieve your financial goals with intuitive tools and beautiful visualizations.</p>
            <button 
              className="btn btn-primary btn-large" 
              onClick={() => showAuthPage('signup')}
            >
              Get Started Free
            </button>
          </div>
          <div className="hero-demo">
            <div className="demo-image">
              <div className="mockup-browser">
                <div className="browser-header">
                  <div className="browser-controls">
                    <span className="control red"></span>
                    <span className="control yellow"></span>
                    <span className="control green"></span>
                  </div>
                </div>
                <div className="browser-content">
                  <div className="chart-demo">
                    <div className="chart-line"></div>
                    <div className="chart-bars">
                      <div className="bar" id="bar1" style={{height: '60%'}}></div>
                      <div className="bar" id="bar2" style={{height: '80%'}}></div>
                      <div className="bar" id="bar3" style={{height: '45%'}}></div>
                      <div className="bar" id="bar4" style={{height: '90%'}}></div>
                      <div className="bar" id="bar5" style={{height: '70%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="features-overview">
        <div className="container">
          <h2>Everything You Need to Master Your Money</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-area"></i>
              </div>
              <h3>Cash Flow Tracking</h3>
              <p>Monitor your income and expenses with detailed analytics and beautiful visualizations to understand your spending patterns.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-pie-chart"></i>
              </div>
              <h3>Smart Budgeting</h3>
              <p>Create and manage budgets with our intuitive pie charts. Distinguish between needs and wants to make smarter financial decisions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3>Goal Setting</h3>
              <p>Set savings and spending goals with progress tracking. Stay motivated and achieve your financial milestones faster.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3>Easy Access</h3>
              <p>Access your financial data anywhere, anytime. Our responsive design works perfectly on desktop, tablet, and mobile devices.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OverviewPage