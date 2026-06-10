import React from 'react'
import { Outlet } from 'react-router'
import BarraNavegacion from '../components/dashboard/BarraNavegacion'
import AdminNavBar from '../components/admin/gestionUsuarios/AdminNavBar'

const ContainerPage = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'))
  const esAdmin = usuario?.rol === 'administrador'

  return (
    <div>
      {esAdmin ? <AdminNavBar /> : <BarraNavegacion />}

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2026 Mi Aplicación. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default ContainerPage
