import React from 'react'

const TarjetaUsuario = ({ usuario, onEditar }) => {
  return (
    <div className="admin-info-card">
      <p>
        <strong>Nombre:</strong> {usuario.nombre}
      </p>

      <p>
        <strong>Email:</strong> {usuario.email}
      </p>

      <p>
        <strong>Rol:</strong> {usuario.rol}
      </p>

      <p>
        <strong>Plan:</strong> {usuario.rol === 'administrador' ? 'No aplica' : usuario.plan}
      </p>

      <button className="btn-admin" onClick={onEditar}>
        Editar usuario
      </button>
    </div>
  )
}

export default TarjetaUsuario
