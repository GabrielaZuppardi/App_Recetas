import React from 'react'

const TarjetaUsuario = ({ usuario, onEditar, onClose }) => {
  return (
    <>
      <div className="user-info">
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>
        <p><strong>Plan:</strong>{' '}  {usuario.rol === 'administrador' ? 'No aplica' : usuario.plan}</p>
      </div>

      <div className="modal-actions">
        <button
          className="btn secondary"
          onClick={onEditar}
        >
          Editar
        </button>

        <button
          className="btn secondary"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </>
  )
}

export default TarjetaUsuario