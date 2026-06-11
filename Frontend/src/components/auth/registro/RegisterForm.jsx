import React from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import api from '../../../api/api'
import { registroSchema } from '../../../validators/auth.validators'
import { guardarUsuarioLogueado } from '../../../features/usuarios.slice'
import { FiUser, FiMail, FiLock } from 'react-icons/fi'

const RegisterForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isDirty, isValid }
  } = useForm({
    resolver: joiResolver(registroSchema),
    mode: 'onChange'
  })

  const procesarForm = (data) => {
    clearErrors('root')

    api
      .post('/auth/registro', data)
      .then(() => {
        return api.post('/auth/login', {
          email: data.email,
          password: data.password
        })
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('usuario', JSON.stringify(res.data.usuario))

        dispatch(guardarUsuarioLogueado(res.data.usuario))

        navigate('/dashboard')
      })
      .catch((err) => {
        setError('root', {
          type: 'manual',
          message: err.response?.data?.message || 'No se pudo completar el registro'
        })

        console.error('Error al registrar:', err)
      })
  }

  return (
    <form onSubmit={handleSubmit(procesarForm)} noValidate>
      <div className="form-group">
        <label htmlFor="nombre">Nombre Completo</label>

        <div className="input-wrap">
          <span className="icon">
            <FiUser />
          </span>

          <input
            id="nombre"
            type="text"
            placeholder="Ingresa tu nombre"
            {...register('nombre', {
              onChange: () => clearErrors('root')
            })}
          />
        </div>
        {errors.nombre && <span className="error">{errors.nombre.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Correo electrónico</label>

        <div className="input-wrap">
          <span className="icon">
            <FiMail />{' '}
          </span>

          <input
            id="email"
            type="email"
            placeholder="chef@gourmet.io"
            {...register('email', {
              onChange: () => clearErrors('root')
            })}
          />
        </div>
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña</label>

        <div className="input-wrap">
          <span className="icon">
            <FiLock />
          </span>

          <input
            id="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
            {...register('password', {
              onChange: () => clearErrors('root')
            })}
          />
        </div>
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>

      {errors.root && <span className="error error-general">{errors.root.message}</span>}

      <button type="submit" className="submit-btn">
        Crear mi Cuenta Gratis
      </button>
    </form>
  )
}

export default RegisterForm
