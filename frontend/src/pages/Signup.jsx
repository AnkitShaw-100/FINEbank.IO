import React from 'react'
import { Navigate } from 'react-router-dom'

// Signup page removed — if someone navigates to /signup, redirect to /login
const Signup = () => {
  return <Navigate to="/login" replace />
}

export default Signup
