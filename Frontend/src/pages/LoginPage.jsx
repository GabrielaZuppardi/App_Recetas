import React from 'react'
import { Link } from 'react-router'
import LoginForm from '../components/login/LoginForm'

import LoginFooter from '../components/login/LoginFooter'


const LoginPage = () => {
  return (
    <div >
      <header>
        <h1>🍳 App Recetas</h1>
        <p className="subtitle">Plataforma Inteligente para la Gestión de Recetas</p>
      </header>
      <LoginForm />
      <LoginFooter />
    </div>
  )
}

export default LoginPage