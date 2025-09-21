import React from 'react'

function Toast({ toasts, removeToast }) {
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    warning: 'fas fa-exclamation-triangle',
    info: 'fas fa-info-circle'
  }

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type} show`}>
          <div className="toast-icon">
            <i className={icons[toast.type] || icons.info}></i>
          </div>
          <div className="toast-message">{toast.message}</div>
          <button 
            className="toast-close"
            onClick={() => removeToast(toast.id)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toast