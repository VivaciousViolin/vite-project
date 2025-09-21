import React from 'react'

// Cần thêm showGoalsPage vào đây để HomePage có thể sử dụng hàm này
function HomePage({ currentUser, handleLogout, navigateToPage, showCashFlowPage, showGoalsPage, showBudgetingPage }) {
  const username = currentUser ? currentUser.username : 'User'
  
  return (
    <div className="page-home">
      {/* Header */}
      <header className="home-header">
        <div className="home-logo">
          <img src="/src/assets/logo.png" alt="FinanceFlow" className="logo-image"/>
          <span>FinanceFlow</span>
        </div>
        <div className="user-menu">
          <span className="welcome-text">Welcome back, {username}!</span>
          <button 
            className="btn btn-outline btn-small" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Dashboard */}
      <section className="dashboard">
        <div className="container">
          <h1>Your Financial Dashboard</h1>
          <p className="dashboard-subtitle">Choose a section to manage your finances</p>
          
          <div className="dashboard-grid">
            <div 
              className="dashboard-card" 
              onClick={() => navigateToPage('cashflow')}
            >
              <div className="card-icon">
                <i className="fas fa-chart-area"></i>
              </div>
              <div className="card-content">
                <h3>Cash Flow</h3>
                <p>Track your income and expenses with detailed analytics. View daily transactions and monitor your spending patterns over time.</p>
                <div className="card-features">
                  <span className="feature-tag">Income Tracking</span>
                  <span className="feature-tag">Expense Analysis</span>
                  <span className="feature-tag">Visual Charts</span>
                </div>
              </div>
              <div className="card-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>

            <div 
              className="dashboard-card"
              //onClick={() => navigateToPage('budgeting')}
                onClick={showBudgetingPage}           >
              <div className="card-icon">
                <i className="fas fa-pie-chart"></i>
              </div>
              <div className="card-content">
                <h3>Budgeting</h3>
                <p>Create and manage your budget with smart categorization. Visualize your spending allocation with interactive pie charts.</p>
                <div className="card-features">
                  <span className="feature-tag">Budget Planning</span>
                  <span className="feature-tag">Category Management</span>
                  <span className="feature-tag">Spending Analysis</span>
                </div>
              </div>
              <div className="card-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>

            <div 
              className="dashboard-card"
              onClick={() => navigateToPage('goals')}
            >
              <div className="card-icon">
                <i className="fas fa-bullseye"></i>
              </div>
              <div className="card-content">
                <h3>Goals</h3>
                <p>Set and track your financial goals with progress bars. Whether saving for vacation or paying off debt, stay motivated.</p>
                <div className="card-features">
                  <span className="feature-tag">Goal Setting</span>
                  <span className="feature-tag">Progress Tracking</span>
                  <span className="feature-tag">Milestone Alerts</span>
                </div>
              </div>
              <div className="card-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage