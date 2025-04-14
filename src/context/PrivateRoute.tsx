import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import isTokenValid from './ValidToken'

const PrivateRoute: React.FC = () => {
  const isAuthenticated = isTokenValid()
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute
