import React from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import api from '../../api/api'
import { crearUsuarioSchema } from '../../validators/usuario.validators'
import { guardarUsuarioLogueado } from '../../features/usuarios.slice'

const RegisterForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(crearUsuarioSchema)
  })

  const procesarForm = (data) => {
    api.post('/auth/registro', data)
      .then(() => {
        return api.post('/auth/login', {
          email: data.email,
          password: data.password
        })
      })
      .then(res => {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("usuario", JSON.stringify(res.data.usuario))

        dispatch(guardarUsuarioLogueado(res.data.usuario))

        navigate('/dashboard')
      })
      .catch(err => {
        console.error('Error al registrar o iniciar sesión:', err)
      })
  }

  return (
    <form onSubmit={handleSubmit(procesarForm)}>

      <div className="form-group">
        <label htmlFor="nombre">
          Nombre Completo
        </label>

        <div className="input-wrap">
          <span className="icon">👤</span>

          <input
            id="nombre"
            type="text"
            placeholder="Ingresa tu nombre"
            {...register('nombre')}
          />

          {errors.nombre &&
            <span className="error">
              {errors.nombre.message}
            </span>
          }
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">
          Correo electrónico
        </label>

        <div className="input-wrap">
          <span className="icon">✉️</span>

          <input
            id="email"
            type="email"
            placeholder="chef@gourmet.io"
            {...register('email')}
          />

          {errors.email &&
            <span className="error">
              {errors.email.message}
            </span>
          }
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="password">
          Contraseña
        </label>

        <div className="input-wrap">
          <span className="icon">🔒</span>

          <input
            id="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
            {...register('password')}
          />

          {errors.password &&
            <span className="error">
              {errors.password.message}
            </span>
          }
        </div>
      </div>

      <button
        type="submit"
        className="submit-btn"
      >
        Crear mi Cuenta Gratis
      </button>

    </form>
  )
}

export default RegisterForm