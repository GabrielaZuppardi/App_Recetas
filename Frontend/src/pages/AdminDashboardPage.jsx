import React from 'react'
import UsuariosAdmin from '../components/admin/UsuariosAdmin'
import CrearUsuarioAdmin from '../components/admin/CrearUsuarioAdmin'

const AdminDashboardPage = () => {
  return (
    <div className="admin-dashboard">

      {/* Gestión de usuarios */}
      <section className="admin-card">
        <UsuariosAdmin />
      </section>

      {/* Formularios */}
      <div className="admin-form-row">

        <section className="admin-card">
          <CrearUsuarioAdmin />
        </section>

        <section className="admin-card">
          <h2>Crear Categoría</h2>
        </section>

      </div>

      {/* Gestión categorías */}
      <section className="admin-card">
        <h2>Gestión de Categorías</h2>
      </section>

    </div>
  )
}

export default AdminDashboardPage