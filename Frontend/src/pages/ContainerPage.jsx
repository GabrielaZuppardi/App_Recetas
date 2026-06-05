import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../components/dashboard/BarraNavegacion'

const ContainerPage = () => {
  return (
    <div>
      <NavBar />

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