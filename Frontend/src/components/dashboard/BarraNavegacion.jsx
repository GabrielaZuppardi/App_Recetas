import React from 'react'
import { NavLink, useNavigate } from 'react-router'
import { GiChefToque } from "react-icons/gi";
import { MdRestaurantMenu } from "react-icons/md";


const NavBar = () => {
    const navigate = useNavigate()

    const usuario = JSON.parse(localStorage.getItem('usuario'))

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')

        navigate('/')
    }

    return (
        <header className="navbar card">
            <div className="brand">
                <div className="logo">
                     <GiChefToque />              
                </div>
                  <div>
                       <h1>ChefsMate</h1>
                    
                </div>
            </div>

            <nav className="nav-links">


                {usuario?.rol === 'administrador' && (
                    <NavLink to="/dashboardAdmin">
                        Admin
                    </NavLink>
                )}
            </nav>

            <div className="user-area">
                <span className="pill">
                    Plan {usuario?.plan || 'Plus'}
                </span>

                <span className="pill">
                    Bienvenidx, {usuario?.nombre || 'Usuario'}
                </span>

                <button
                    type="button"
                    className="btn secondary"
                    onClick={cerrarSesion}
                >
                    Cerrar sesión
                </button>
            </div>
        </header>
    )
}

export default NavBar