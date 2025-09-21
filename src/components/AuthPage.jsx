import React, { useState } from 'react'
import { handleLogin, handleSignup } from '../utils/auth.jsx'

function AuthPage({ showOverviewPage, showHomePage, showToast, showLoading, authTab, setAuthTab }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const clearForm = () => {
    setFormData({
      username: '',
      password: '',
      confirmPassword: ''
    })
  }

  const onLogin = async (e) => {
    e.preventDefault()
    
    if (!formData.username || !formData.password) {
      showToast('Please fill in all fields', 'error')
      return
    }

    showLoading(true)

    try {
      const result = await handleLogin(formData.username, formData.password)
      
      if (result.success) {
        showToast('Welcome back!', 'success')
        clearForm()
        setTimeout(() => showHomePage(), 300)
      } else {
        showToast(result.error, 'error')
      }
    } catch (error) {
      showToast('Login failed. Please try again.', 'error')
    } finally {
      showLoading(false)
    }
  }

  const onSignup = async (e) => {
    e.preventDefault()
    
    if (!formData.username || !formData.password || !formData.confirmPassword) {
      showToast('Please fill in all fields', 'error')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error')
      return
    }

    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error')
      return
    }

    showLoading(true)

    try {
      const result = await handleSignup(formData.username, formData.password)
      
      if (result.success) {
        showToast('Welcome to FinanceFlow!', 'success')
        clearForm()
        setTimeout(() => showHomePage(), 300)
      } else {
        showToast(result.error, 'error')
      }
    } catch (error) {
      showToast('Signup failed. Please try again.', 'error')
    } finally {
      showLoading(false)
    }
  }

  return (
    <div className="page-auth">
      <div className="auth-container">
        <div className="auth-header">
          <div className="logo">
            <i className="fas fa-chart-line"></i>
            <span>FinanceFlow</span>
          </div>
          <button 
            className="btn btn-outline btn-small" 
            onClick={showOverviewPage}
          >
            Back to Home
          </button>
        </div>
        
        <div className="auth-card">
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${authTab === 'login' ? 'active' : ''}`}
              onClick={() => setAuthTab('login')}
            >
              Login
            </button>
            <button 
              className={`auth-tab ${authTab === 'signup' ? 'active' : ''}`}
              onClick={() => setAuthTab('signup')}
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          {authTab === 'login' && (
            <div className="auth-section active">
              <h2>Welcome Back!</h2>
              <p className="auth-subtitle">Sign in to continue to your dashboard</p>
              
              <form onSubmit={onLogin} className="auth-form">
                <div className="form-group">
                  <label>
                    <i className="fas fa-user"></i>
                    Username
                  </label>
                  <input 
                    type="text" 
                    name="username"
                    placeholder="Enter your username" 
                    value={formData.username}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>
                    <i className="fas fa-lock"></i>
                    Password
                  </label>
                  <input 
                    type="password" 
                    name="password"
                    placeholder="Enter your password" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <button type="submit" className="btn btn-login">
                  <i className="fas fa-sign-in-alt"></i>
                  Login
                </button>
              </form>
              
              <div className="auth-divider">
                <span>Don't have an account?</span>
                <button 
                  className="switch-btn" 
                  onClick={() => setAuthTab('signup')}
                >
                  Sign up here
                </button>
              </div>
            </div>
          )}

          {/* Signup Form */}
          {authTab === 'signup' && (
            <div className="auth-section active">
              <h2>Create Account</h2>
              <p className="auth-subtitle">Join FinanceFlow and start managing your money better</p>
              
              <form onSubmit={onSignup} className="auth-form">
                <div className="form-group">
                  <label>
                    <i className="fas fa-user"></i>
                    Username
                  </label>
                  <input 
                    type="text" 
                    name="username"
                    placeholder="Choose a username" 
                    value={formData.username}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>
                    <i className="fas fa-lock"></i>
                    Password
                  </label>
                  <input 
                    type="password" 
                    name="password"
                    placeholder="Create a password" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>
                    <i className="fas fa-lock"></i>
                    Confirm Password
                  </label>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    placeholder="Confirm your password" 
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <button type="submit" className="btn btn-signup">
                  <i className="fas fa-user-plus"></i>
                  Create Account
                </button>
              </form>
              
              <div className="auth-divider">
                <span>Already have an account?</span>
                <button 
                  className="switch-btn" 
                  onClick={() => setAuthTab('login')}
                >
                  Login here
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthPage