import React from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { crearCategoriaSchema } from '../../../validators/categoria.validators'

const EditarCategoriaForm = ({ categoria, editarC, cancelarEdicion, onClose }) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(crearCategoriaSchema),
    mode: 'onChange',
    defaultValues: {
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    }
  })

  const procesarForm = (data) => {
    clearErrors('root')

    editarC(categoria._id, data, setError, onClose)
  }

  return (
    <form className="form-modal" onSubmit={handleSubmit(procesarForm)}>
      <label>Nombre</label>
      <input
        type="text"
        {...register('nombre', {
          onChange: () => clearErrors('root')
        })}
      />
      {errors.nombre && <span className="error">{errors.nombre.message}</span>}

      <label>Descripción</label>
      <textarea
        rows="4"
        {...register('descripcion', {
          onChange: () => clearErrors('root')
        })}
      />

      {errors.root && <span className="error error-general">{errors.root.message}</span>}

      <div className="modal-actions">
        <button type="submit" className="btn-admin">
          Guardar cambios
        </button>

        <button type="button" className="btn secondary" onClick={cancelarEdicion}>
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default EditarCategoriaForm
