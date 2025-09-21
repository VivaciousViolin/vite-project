// Demo users for the application
const DEMO_USERS = [
  {
    id: 1,
    username: 'demo',
    password: 'demo123',
    created: new Date().toISOString()
  },
  {
    id: 2,
    username: 'testuser',
    password: 'password',
    created: new Date().toISOString()
  }
]

// Initialize demo data in localStorage if it doesn't exist
export const initializeDemoData = () => {
  try {
    const existingUsers = localStorage.getItem('financeflow_users')
    if (!existingUsers) {
      localStorage.setItem('financeflow_users', JSON.stringify(DEMO_USERS))
      console.log('Demo data initialized')
    }
  } catch (error) {
    console.error('Error initializing demo data:', error)
  }
}

// Get all users from localStorage
const getUsers = () => {
  try {
    const users = localStorage.getItem('financeflow_users')
    return users ? JSON.parse(users) : []
  } catch (error) {
    console.error('Error getting users:', error)
    return []
  }
}

// Save users to localStorage
const saveUsers = (users) => {
  try {
    localStorage.setItem('financeflow_users', JSON.stringify(users))
  } catch (error) {
    console.error('Error saving users:', error)
  }
}

// Handle user login
export const handleLogin = async (username, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  try {
    const users = getUsers()
    const user = users.find(u => u.username === username && u.password === password)
    
    if (user) {
      // Save current user to localStorage (without password)
      const userSession = {
        id: user.id,
        username: user.username,
        loginTime: new Date().toISOString()
      }
      localStorage.setItem('financeflow_current_user', JSON.stringify(userSession))
      
      return {
        success: true,
        user: userSession
      }
    } else {
      return {
        success: false,
        error: 'Invalid username or password'
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      success: false,
      error: 'Login failed. Please try again.'
    }
  }
}

// Handle user signup
export const handleSignup = async (username, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  try {
    const users = getUsers()
    
    // Check if username already exists
    const existingUser = users.find(u => u.username === username)
    if (existingUser) {
      return {
        success: false,
        error: 'Username already exists'
      }
    }
    
    // Create new user
    const newUser = {
      id: users.length + 1,
      username,
      password,
      created: new Date().toISOString()
    }
    
    // Add to users array and save
    users.push(newUser)
    saveUsers(users)
    
    // Create user session (without password)
    const userSession = {
      id: newUser.id,
      username: newUser.username,
      loginTime: new Date().toISOString()
    }
    localStorage.setItem('financeflow_current_user', JSON.stringify(userSession))
    
    return {
      success: true,
      user: userSession
    }
  } catch (error) {
    console.error('Signup error:', error)
    return {
      success: false,
      error: 'Signup failed. Please try again.'
    }
  }
}

// Check if user is authenticated
export const checkAuthState = () => {
  try {
    const currentUser = localStorage.getItem('financeflow_current_user')
    if (currentUser) {
      const user = JSON.parse(currentUser)
      return {
        isAuthenticated: true,
        user
      }
    }
    return {
      isAuthenticated: false,
      user: null
    }
  } catch (error) {
    console.error('Error checking auth state:', error)
    return {
      isAuthenticated: false,
      user: null
    }
  }
}

// Get current user
export const getCurrentUser = () => {
  try {
    const currentUser = localStorage.getItem('financeflow_current_user')
    return currentUser ? JSON.parse(currentUser) : null
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

// Logout user
export const logout = () => {
  try {
    localStorage.removeItem('financeflow_current_user')
    return true
  } catch (error) {
    console.error('Error logging out:', error)
    return false
  }
}