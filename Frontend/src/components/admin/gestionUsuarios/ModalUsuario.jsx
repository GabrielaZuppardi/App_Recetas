import React, { useEffect, useState } from 'react'
import EditarUsuarioForm from './EditarUsuarioForm'
import TarjetaUsuario from './TarjetaUsuario'

const ModalUsuario = ({ usuario, editarU, onClose }) => {

  // Determina si el modal está mostrando el detalle del usuario o el formulario de edición.
  const [modoEdicion, setModoEdicion] = useState(false)

  useEffect(() => {
    setModoEdicion(false)
  }, [usuario])

  // Si no hay usuario seleccionado, no se renderiza el modal.
  if (!usuario) return null

  return (
    <div className="modal-overlay">
      <div className="modal-card">

        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-header-admin">
          <h2>{modoEdicion ? 'Editar usuario' : 'Detalle del usuario'}</h2>
        </div>

        {!modoEdicion ? (
          <TarjetaUsuario
            usuario={usuario}
            onEditar={() => setModoEdicion(true)}
            onClose={onClose}
          />
        ) : (
          <EditarUsuarioForm
            usuario={usuario}
            editarU={editarU}
            cancelarEdicion={() => setModoEdicion(false)}
            onClose={onClose}
          />
        )}

      </div>
    </div>
  )
}

export default ModalUsuario