import React, { useState } from 'react'

const EditarCategoriaForm = ({
  categoria,
  editarC,
  cancelarEdicion,
  onClose
}) => {

  // Estados locales inicializados con los datos actuales de la categoría.
  const [nombre, setNombre] = useState(categoria.nombre)
  const [descripcion, setDescripcion] = useState(categoria.descripcion)

  // Envía los cambios al componente padre para actualizar la categoría.
  const handleSubmit = (e) => {
    e.preventDefault()

    editarC(categoria._id, {
      nombre,
      descripcion
    })

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

      <label>Descripción</label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        rows="4"
      />

      <div className="modal-actions">

        <button type="submit" className="btn-admin">
          Guardar cambios
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

export default EditarCategoriaForm