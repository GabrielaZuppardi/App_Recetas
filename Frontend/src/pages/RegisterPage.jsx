import React from 'react'
import { Link } from 'react-router'
import RegisterForm from '../components/Registro/RegisterForm'

const RegisterPage = () => {
  return (
    <div>

      <h1>Registro</h1>

      <RegisterForm />

      <Link to="/">
        ¿Ya tienes una cuenta? Inicia sesión aquí
      </Link>

    </div>
  )
}

export default RegisterPage