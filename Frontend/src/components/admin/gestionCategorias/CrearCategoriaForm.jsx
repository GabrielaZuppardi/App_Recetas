import React from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { crearCategoriaSchema } from '../../../validators/categoria.validators'

const CrearCategoriaForm = ({ crearCategoria, mensajeExito }) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(crearCategoriaSchema),
    mode: 'onChange'
  })

  const procesarForm = (data) => {
    clearErrors('root')

    crearCategoria(data, setError, reset)
  }

  return (
    <form className="crear-categoria-form" onSubmit={handleSubmit(procesarForm)}>
      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Ej: Postres"
          {...register('nombre', {
            onChange: () => clearErrors('root')
          })}
        />

        {errors.nombre && <span className="error">{errors.nombre.message}</span>}
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <textarea
          placeholder="Ej: Recetas dulces para después de las comidas"
          {...register('descripcion', {
            onChange: () => clearErrors('root')
          })}
        />

        {errors.descripcion && <span className="error">{errors.descripcion.message}</span>}
      </div>

      {errors.root && <span className="error error-general">{errors.root.message}</span>}
      {mensajeExito && <span className="success-message">{mensajeExito}</span>}

      <button className="btn-admin" type="submit">
        Crear categoría
      </button>
    </form>
  )
}

export default CrearCategoriaForm
