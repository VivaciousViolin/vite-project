import React, { useState, useEffect } from 'react'
import OverviewPage from './components/OverviewPage.jsx'
import AuthPage from './components/AuthPage.jsx'
import HomePage from './components/HomePage.jsx'
import Toast from './components/Toast.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import CashFlow from './components/CashFlow.jsx' //BINGCHILLING
import { checkAuthState, getCurrentUser, initializeDemoData } from './utils/auth.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('overview')
  const [currentUser, setCurrentUser] = useState(null)
  const [authTab, setAuthTab] = useState('login')
  const [isLoading, setIsLoading] = useState(false)
  const [toasts, setToasts] = useState([])

  // Initialize app on mount
  // useEffect(() => {
  //   initializeDemoData()
    
    // Always start with overview page as home page
    // setCurrentPage('overview')
    
    // Check if user is logged in for later use
    // const authState = checkAuthState()
    // if (authState.isAuthenticated) {
    //   setCurrentUser(authState.user)
    // }
    useEffect(() => {
      initializeDemoData()
      
      // Check authentication state first
      const authState = checkAuthState()
      if (authState.isAuthenticated) {
        setCurrentUser(authState.user)
        setCurrentPage('home')  // Go to home if logged in
      } else {
        setCurrentPage('overview')  // Go to overview if not logged in
      }
    }, [])

  // Navigation functions
  const showOverviewPage = () => {
    console.log('🏠 Showing overview page')
    setCurrentPage('overview')
  }

  const showAuthPage = (tab = 'login') => {
    console.log('🔐 Showing auth page with tab:', tab)
    setCurrentPage('auth')
    setAuthTab(tab)
  }

  const showCashFlowPage = () => {
    console.log('cashflow, get your money up not your funny up')
    setCurrentPage('cashflow')
  }

  const showHomePage = () => {
    console.log('🏡 Showing home page')
    setCurrentUser(getCurrentUser())
    setCurrentPage('home')
  }

  // Toast functions
  const showToast = (message, type = 'info') => {
    const id = Date.now()
    const newToast = { id, message, type }
    
    setToasts(prev => [...prev, newToast])
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  // Loading function
  const showLoading = (show) => {
    setIsLoading(show)
  }

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('financeflow_current_user')
    setCurrentUser(null)
    showToast('See you later!', 'success')
    setTimeout(() => showOverviewPage(), 200)
  }

  // Navigation to placeholder pages
  const navigateToPage = (page) => {
    showToast(`Navigating to ${page} page...`, 'info')
    console.log(`Navigate to ${page} page`)
  }

  // Props to pass to components
  const appProps = {
    showOverviewPage,
    showAuthPage,
    showHomePage,
    showToast,
    showLoading,
    handleLogout,
    navigateToPage,
    currentUser,
    showCashFlowPage, //BINGCHILLING
    authTab,
    setAuthTab,
    // Add these new navigation functions
    isLoggedIn: !!currentUser
  }

  return (
    <div className="app">
      {currentPage === 'overview' && <OverviewPage {...appProps} />}
      {currentPage === 'auth' && <AuthPage {...appProps} />}
      {currentPage === 'home' && <HomePage {...appProps} />}
      {currentPage === 'cashflow' && <CashFlow {...appProps} />}
      
      <Toast toasts={toasts} removeToast={removeToast} />
      <LoadingSpinner isLoading={isLoading} />
    </div>
  )
}

export default App

