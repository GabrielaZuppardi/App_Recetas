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
        <p>© Obligatorio Full Stack 2026 - 331770 - 240962</p>
      </footer>
    </div>
  )
}

export default ContainerPage
