import React from 'react'

function Header({ showAuthPage, showHomePage, isLoggedIn, currentUser }) {
  return (
    <header className="header">
      <div className="logo-section">
        <div className="logo">
          <i className="fas fa-chart-line"></i>
          <span>FinanceFlow</span>
        </div>
      </div>
      <div className="auth-buttons">
        {isLoggedIn ? (
          /* Show user info and dashboard/logout buttons when logged in */
          <>
            <span className="welcome-text">Hi, {currentUser?.username}!</span>
            <button 
              className="btn btn-outline" 
              onClick={() => showHomePage()}
            >
              Dashboard
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => {
                localStorage.removeItem('financeflow_current_user')
                window.location.reload() // Simple refresh to reset state
              }}
            >
              Logout
            </button>
          </>
        ) : (
          /* Show login/signup buttons when not logged in */
          <>
            <button 
              className="btn btn-outline" 
              onClick={() => showAuthPage('login')}
            >
              Login
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => showAuthPage('signup')}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header