import React from 'react'

const CrearCategoriaForm = ({
  nombre,
  setNombre,
  descripcion,
  setDescripcion,
  crearCategoria
}) => {
  return (
    <form className="crear-categoria-form" onSubmit={crearCategoria}>

      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Ej: Postres"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <textarea
          placeholder="Ej: Recetas dulces para después de las comidas"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <button className="btn-admin" type="submit">
        Crear categoría
      </button>

    </form>
  )
}

export default CrearCategoriaForm