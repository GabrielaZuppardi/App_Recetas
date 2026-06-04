import React from 'react'
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
 const isAuth = localStorage.getItem("usuario") !== null;
    
if(!isAuth) return <Navigate to="/"  replace/>

return <Outlet />
}

export default ProtectedRoute