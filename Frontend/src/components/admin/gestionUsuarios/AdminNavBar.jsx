import { useDispatch } from 'react-redux'
import { cerrarSesion } from '../../../features/usuarios.slice'
import { useNavigate } from 'react-router'
import { GiChefToque } from 'react-icons/gi'

const AdminNavBar = () => {
  const navigate = useNavigate()
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  const dispatch = useDispatch()

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
        </div>
      </div>

      <div className="user-area">
        <span className="pill">Bienvenidx, {usuario?.nombre || 'Admin'}</span>

        <button type="button" className="btn secondary" onClick={handleCerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </header>
  )
}

export default AdminNavBar
