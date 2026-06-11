import React from 'react'
import { useForm } from 'react-hook-form'

const CrearAdminForm = ({ crearU, mensajeExito }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    clearErrors('root')
    crearU(data, setError, reset)
  }

  return (
    <form className="crear-usuario-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Nombre</label>
        <input type="text" placeholder="Ej: Administrador General" {...register('nombre', { required: 'El nombre es obligatorio' })} />
        {errors.nombre && <span className="error">{errors.nombre.message}</span>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" placeholder="Ej: admin@gourmet.com" {...register('email', { required: 'El email es obligatorio' })} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Mínimo 6 caracteres"
          {...register('password', {
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres'
            }
          })}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>

      {errors.root && <span className="error error-general">{errors.root.message}</span>}

      {mensajeExito && <span className="success-message">{mensajeExito}</span>}

      <button className="btn-admin" type="submit">
        Crear administrador
      </button>
    </form>
  )
}

export default CrearAdminForm
