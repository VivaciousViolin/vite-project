import React, { useState, useEffect } from 'react'
import OverviewPage from './components/OverviewPage.jsx'
import AuthPage from './components/AuthPage.jsx'
import HomePage from './components/HomePage.jsx'
import Toast from './components/Toast.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import CashFlow from './components/CashFlow.jsx' //BINGCHILLING
import Goals from './components/Goals.jsx'
import { checkAuthState, getCurrentUser, initializeDemoData } from './utils/auth.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('overview')
  const [currentUser, setCurrentUser] = useState(null)
  const [authTab, setAuthTab] = useState('login')
  const [isLoading, setIsLoading] = useState(false)
  const [toasts, setToasts] = useState([])

  // Initialize app on mount
useEffect(() => {
    initializeDemoData()
    
    // Check for saved page state first
    const savedPage = localStorage.getItem('financeflow_current_page')
    
    // Check authentication state
    const authState = checkAuthState()
    if (authState.isAuthenticated) {
      setCurrentUser(authState.user)
      // If user is logged in, use saved page or default to home
      setCurrentPage(savedPage || 'home')
    } else {
      // If not logged in, always go to overview
      setCurrentPage('overview')
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


  const showHomePage = () => {
    console.log('🏡 Showing home page')
    setCurrentUser(getCurrentUser())
    setCurrentPage('home')
    localStorage.setItem('financeflow_current_page', 'home')
  }

  const showGoalsPage = () => {
    console.log('ok')
    setCurrentPage('goals')
  }
  const showCashFlowPage = () => {
    console.log('ok')
    setCurrentPage('cashflow')
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
    localStorage.removeItem('financeflow_current_page') // Clear saved page
    setCurrentUser(null)
    showToast('See you later!', 'success')
    setTimeout(() => showOverviewPage(), 200)
  }

  // Navigation to placeholder pages
  const navigateToPage = (page) => {
    if (page === 'home') {
      showHomePage()
    } else if (page === 'goals') {
      setCurrentPage('goals')
      localStorage.setItem('financeflow_current_page', 'goals')
    } else {
      showToast(`Navigating to ${page} page...`, 'info')
      console.log(`Navigate to ${page} page`)
      // For future pages, save their state too
      localStorage.setItem('financeflow_current_page', page)
    }
  }

  // Props to pass to components
  const appProps = {
    showOverviewPage,
    showAuthPage,
    showHomePage,
    showToast,
    showGoalsPage,
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
      {currentPage === 'goals' && <Goals {...appProps} />}
      {currentPage === 'cashflow' && <CashFlow {...appProps} />}
      
      <Toast toasts={toasts} removeToast={removeToast} />
      <LoadingSpinner isLoading={isLoading} />
    </div>
  )
}

export default App