
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { modificarUsuarioSchema } from '../../../validators/usuario.validators'

const EditarUsuarioForm = ({ usuario, editarU, cancelarEdicion, onClose }) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(modificarUsuarioSchema),
    mode: 'onChange',
    defaultValues: {
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      plan: usuario.plan || 'plus'
    }
  })

  const rol = watch('rol')

  const handleCambioRol = (e) => {
    const nuevoRol = e.target.value

    setValue('rol', nuevoRol)
    clearErrors('root')

    if (nuevoRol === 'administrador') {
      setValue('plan', '')
    }

    if (nuevoRol === 'usuario') {
      setValue('plan', 'plus')
    }
  }

  const procesarForm = (data) => {
    clearErrors('root')

    const usuarioEditado = {
      nombre: data.nombre,
      email: data.email,
      rol: data.rol,
      plan: data.rol === 'usuario' ? data.plan : undefined
    }

    editarU(usuario._id, usuarioEditado, setError, onClose)
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

      <label>Email</label>
      <input
        type="email"
        {...register('email', {
          onChange: () => clearErrors('root')
        })}
      />
      {errors.email && <span className="error">{errors.email.message}</span>}

      <label>Rol</label>
      <select {...register('rol')} onChange={handleCambioRol}>
        <option value="usuario">Usuario</option>
        <option value="administrador">Administrador</option>
      </select>
      {errors.rol && <span className="error">{errors.rol.message}</span>}

      <label>Plan</label>
      <select
        {...register('plan', {
          onChange: () => clearErrors('root')
        })}
        disabled={rol !== 'usuario'}
      >
        <option value="plus">Plus</option>
        <option value="premium">Premium</option>
      </select>

      {errors.root && <span className="error error-general">{errors.root.message}</span>}

      <div className="modal-actions">
        <button type="submit" className="btn-admin">
          Guardar
        </button>

        <button type="button" className="btn secondary" onClick={cancelarEdicion}>
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default EditarUsuarioForm
