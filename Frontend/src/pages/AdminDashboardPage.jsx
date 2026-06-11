import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import UsuariosAdmin from '../components/admin/gestionUsuarios/UsuariosAdmin'
import CategoriasAdmin from '../components/admin/gestionCategorias/CategoriasAdmin'
import CrearUsuarioAdmin from '../components/admin/gestionUsuarios/CrearAdmin'
import CrearCategoria from '../components/admin/gestionCategorias/CrearCategoria'
import DataUsuarios from '../components/admin/estadisticas/DataUsuarios'

import api from '../api/api'
import { agregarReceta } from '../features/recetas.slice'

const AdminDashboardPage = () => {
  const dispatch = useDispatch()

useEffect(() => {
  const cargarRecetas = async () => {
    try {
      const respuesta = await api.get('/recetas?page=1&limit=2000')

      console.log('URL usada:', respuesta.config.url)
      console.log('RECETAS RECIBIDAS:', respuesta.data.recetas.length)

      dispatch(agregarReceta(respuesta.data.recetas))
    } catch (error) {
      console.error('Error al cargar recetas para estadísticas:', error)
    }
  }

  cargarRecetas()
}, [dispatch])
  return (
    <div className="admin-dashboard">
      <section className="admin-card">
        <UsuariosAdmin />
      </section>

      <div className="admin-form-row">
        <section className="admin-card">
          <CrearUsuarioAdmin />
        </section>

        <section className="admin-card">
          <CrearCategoria />
        </section>
      </div>

      <section className="admin-card">
        <CategoriasAdmin />
      </section>

      <section className="admin-card">
        <DataUsuarios />
      </section>
    </div>
  )
}

export default AdminDashboardPage
