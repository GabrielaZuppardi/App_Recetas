import { useDispatch, useSelector } from 'react-redux'
import { cerrarSesion } from '../../features/usuarios.slice'
import { NavLink, useNavigate } from 'react-router'
import { GiChefToque } from 'react-icons/gi'

const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const usuarioRedux = useSelector((state) => state.usuarios.usuarioLogueado)
  const usuarioLocal = JSON.parse(localStorage.getItem('usuario'))

  const usuario = usuarioRedux || usuarioLocal

  const handleCerrarSesion = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    dispatch(cerrarSesion())
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
          <p>Tus recetas, en un solo lugar.</p>
        </div>
      </div>

      <nav className="nav-links">
        {usuario?.rol === 'administrador' && <NavLink to="/dashboardAdmin">Admin</NavLink>}
      </nav>

      <div className="user-area">
        <span className="pill">Plan {usuario?.plan === 'premium' ? 'Premium' : 'Plus'}</span>

        <span className="pill">Bienvenidx, {usuario?.nombre || 'Usuario'}</span>

        <button type="button" className="btn secondary" onClick={handleCerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </header>
  )
}

export default NavBar
