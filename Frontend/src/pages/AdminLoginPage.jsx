import React from 'react'
import { Link } from 'react-router'
import LoginForm from '../components/loginAdmin/LoginAdminForm'

import LoginFooter from '../components/loginAdmin/LoginAdminFooter'


const AdminLoginPage = () => {
  return (
    <div >
      <header>
        <h1>🍳 Acceso Administradores</h1>
        <p className="subtitle">Plataforma Inteligente para la Gestión de Recetas</p>
      </header>
      <LoginForm />
      <LoginFooter />
    </div>
  )
}

export default AdminLoginPage