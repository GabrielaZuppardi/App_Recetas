import React, { useState } from 'react'

const EditarUsuarioForm = ({ usuario, editarU, cancelarEdicion, onClose }) => {

  // Estados locales del formulario inicializados con los datos actuales del usuario.
  const [nombre, setNombre] = useState(usuario.nombre)
  const [email, setEmail] = useState(usuario.email)
  const [rol, setRol] = useState(usuario.rol)

  // Si el usuario no tiene plan, por ejemplo porque es administrador,
  // se usa 'plus' como valor por defecto para cuando pase a rol usuario.
  const [plan, setPlan] = useState(usuario.plan || 'plus')

  // Maneja el cambio de rol y mantiene coherente el campo plan.
  // Los administradores no tienen plan, por eso se limpia.
  // Si vuelve a ser usuario y no hay plan seleccionado, se asigna 'plus'.
  const handleCambioRol = (e) => {
    const nuevoRol = e.target.value
    setRol(nuevoRol)
    if (nuevoRol === 'administrador') { setPlan('') }
    if (nuevoRol === 'usuario' && !plan) { setPlan('plus') }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const usuarioEditado = {
      nombre,
      email,
      rol,
      plan: rol === 'usuario' ? plan : undefined
    }

    editarU(usuario._id, usuarioEditado)
    onClose()

  }

  return (
    <form className="form-modal" onSubmit={handleSubmit}>

      <label>Nombre</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Rol</label>
      <select value={rol} onChange={handleCambioRol}>
        <option value="usuario">Usuario</option>
        <option value="administrador">Administrador</option>
      </select>

      <label>Plan</label>
      <select
        value={plan}
        onChange={(e) => setPlan(e.target.value)}
        disabled={rol !== 'usuario'}
      >
        <option value="plus">Plus</option>
        <option value="premium">Premium</option>
      </select>


      <div className="modal-actions">
        <button type="submit" className="btn-admin">
          Guardar
        </button>

        <button
          type="button"
          className="btn secondary"
          onClick={cancelarEdicion}
        >
          Cancelar
        </button>
      </div>

    </form>
  )
}

export default EditarUsuarioForm