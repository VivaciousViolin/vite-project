import React from 'react'

function LoadingSpinner({ isLoading }) {
  if (!isLoading) return null

  return (
    <div className="loading-overlay show">
      <div className="spinner">
        <i className="fas fa-spinner fa-spin"></i>
      </div>
    </div>
  )
}

export default LoadingSpinner