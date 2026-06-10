import React from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { crearUsuarioSchema } from '../../../validators/usuario.validators'

const CrearUsuarioForm = ({ crearU }) => {

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(crearUsuarioSchema),
    mode: 'onChange'
  })

  const procesarForm = (data) => {
    clearErrors('root')

    const nuevoUsuario = {
      ...data,
      rol: 'administrador'
    }

    crearU(nuevoUsuario, setError, reset)
  }

  return (
    <form className="form-admin" onSubmit={handleSubmit(procesarForm)}>

      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Ej: Ana Pérez"
          {...register('nombre', {
            onChange: () => clearErrors('root')
          })}
        />
        {errors.nombre && (
          <span className="error">
            {errors.nombre.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Ej: ana.perez@email.com"
          {...register('email', {
            onChange: () => clearErrors('root')
          })}
        />
        {errors.email && (
          <span className="error">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Mínimo 6 caracteres"
          {...register('password', {
            onChange: () => clearErrors('root')
          })}
        />
        {errors.password && (
          <span className="error">
            {errors.password.message}
          </span>
        )}
      </div>

      {errors.root && (
        <span className="error error-general">
          {errors.root.message}
        </span>
      )}

      <button type="submit" className="btn-admin">
        Crear administrador
      </button>

    </form>
  )
}

export default CrearUsuarioForm