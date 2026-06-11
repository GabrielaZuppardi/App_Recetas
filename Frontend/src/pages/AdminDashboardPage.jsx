import React from 'react'
import UsuariosAdmin from '../components/admin/gestionUsuarios/UsuariosAdmin'
import CategoriasAdmin from '../components/admin/gestionCategorias/CategoriasAdmin'
import CrearUsuarioAdmin from '../components/admin/gestionUsuarios/CrearAdmin'
import CrearCategoria from '../components/admin/gestionCategorias/CrearCategoria'
import DataUsuarios from '../components/admin/estadisticas/DataUsuarios'

const AdminDashboardPage = () => {
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
