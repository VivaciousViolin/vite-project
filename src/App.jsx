<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import OverviewPage from './components/OverviewPage.jsx'
import AuthPage from './components/AuthPage.jsx'
import HomePage from './components/HomePage.jsx'
import Toast from './components/Toast.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import { checkAuthState, getCurrentUser, initializeDemoData } from './utils/auth.jsx'
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Test from './components/Test'
import CashFlow from './components/CashFlow'
import Budgeting from './components/Budgeting'
import Login from './components/Login'
import Home from './components/Home'
import Overview1 from './components/Overview1'
import Goals from './components/Goals'
>>>>>>> 9b813e170982a4544df22c8f0ba05728ab0c8117

function App() {
  const [currentPage, setCurrentPage] = useState('overview')
  const [currentUser, setCurrentUser] = useState(null)
  const [authTab, setAuthTab] = useState('login')
  const [isLoading, setIsLoading] = useState(false)
  const [toasts, setToasts] = useState([])

  // Initialize app on mount
  useEffect(() => {
    initializeDemoData()
    
    // Always start with overview page as home page
    setCurrentPage('overview')
    
    // Check if user is logged in for later use
    const authState = checkAuthState()
    if (authState.isAuthenticated) {
      setCurrentUser(authState.user)
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
    authTab,
    setAuthTab,
    // Add these new navigation functions
    isLoggedIn: !!currentUser
  }

  return (
<<<<<<< HEAD
    <div className="app">
      {currentPage === 'overview' && <OverviewPage {...appProps} />}
      {currentPage === 'auth' && <AuthPage {...appProps} />}
      {currentPage === 'home' && <HomePage {...appProps} />}
      
      <Toast toasts={toasts} removeToast={removeToast} />
      <LoadingSpinner isLoading={isLoading} />
    </div>
=======
    <Routes>
        <Route path="/test" element={<Test/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/overview" element={<Overview1/>} />
        <Route path="/cash-flow" element={<CashFlow/>} />
        <Route path="/budgeting" element={<Budgeting/>} />
        <Route path="/goals" element={<Goals/>} />
        
    </Routes>
>>>>>>> 9b813e170982a4544df22c8f0ba05728ab0c8117
  )
}

export default App
