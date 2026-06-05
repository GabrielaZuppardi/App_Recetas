import React, { useState } from 'react'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../../validators/usuario.validators'
import { useNavigate } from 'react-router'
import api from '../../api/api'

const LoginForm = () => {

  const navigate = useNavigate()


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(loginSchema)
  });

  const procesarForm = (data) => {
    console.log(data);

    api.post('/auth/login', data)
      .then(res => {
        console.log(res.data);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("usuario", JSON.stringify(res.data.usuario));

        navigate('/dashboard');
      })
      .catch(err => {
        console.error('Error al iniciar sesión:', err);
      });
  }

  return (
    <form onSubmit={handleSubmit(procesarForm)}>
      <div className="form-group">
        <label>Correo electrónico</label>
        <div className="input-wrap">
          <span className="icon">✉️</span>
          <input type="email" placeholder="ejemplo@gourmet.com" {...register('email')} />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>
      </div>
      <div className="form-group">
        <div className="top-row">
          <label>Contraseña</label>
         
        </div>
        <div className="input-wrap">
          <span className="icon">🔒</span>
          <input type="password" placeholder="••••••••" {...register('password')} />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>
      </div>
      <button type="submit" className="submit-btn">
        Ingresar a la Plataforma →
      </button>


    </form>
  )
}

export default LoginForm
