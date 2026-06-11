import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = ({ rolPermitido }) => {
  const token = localStorage.getItem('token')
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  if (!token) {
    return <Navigate to={rolPermitido === 'administrador' ? '/loginAdmin' : '/'} replace />
  }

  if (usuario?.rol !== rolPermitido) {
    if (usuario?.rol === 'administrador') {
      return <Navigate to="/dashboardAdmin" replace />
    }

    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
