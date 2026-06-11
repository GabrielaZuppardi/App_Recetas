import React from 'react'
import { FaTrash } from 'react-icons/fa'

const UsuariosTabla = ({ usuarios, setUsuarioSeleccionado, eliminarU, editarU }) => {
  return (
    <div className="tabla-scroll">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Plan</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario._id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td>{usuario.rol === 'administrador' ? 'No aplica' : usuario.plan} </td>

              <td>
                <div className="acciones">
                  <button className="btn-admin" onClick={() => setUsuarioSeleccionado(usuario)}>
                    Ver detalle
                  </button>

                  <button className="btn-delete" onClick={() => eliminarU(usuario._id)}>
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsuariosTabla
