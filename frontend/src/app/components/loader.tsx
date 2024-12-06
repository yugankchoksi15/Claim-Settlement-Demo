import React from 'react'

function SmallLoadingSpinner({ container = "", loading = "" }) {
  return (
    <div className={`spinner-container-login ${container}`}>
      <div className={`loading-spinner-login ${loading}`}></div>
    </div>
  )
}

export default SmallLoadingSpinner