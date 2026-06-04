import React from 'react'
import { NavLink, Outlet } from 'react-router'

const ContainerPage = () => {
    return (
        <div>
            <header>
                <h3> 🍳 App Recetas</h3>
                <nav>

                    <NavLink to="/dashboard">Inicio</NavLink>
                    <NavLink to="/">Login</NavLink>
                    <NavLink to="/registro">Registro</NavLink>

                </nav>
            </header>
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