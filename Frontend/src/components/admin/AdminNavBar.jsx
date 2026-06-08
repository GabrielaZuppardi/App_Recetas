import React from 'react'
import { useNavigate } from 'react-router'
import { GiChefToque } from "react-icons/gi";

const AdminNavBar = () => {
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

            <div className="user-area">
                <span className="pill">
                    Bienvenidx, {usuario?.nombre || 'Admin'}
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

export default AdminNavBar