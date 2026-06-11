import React from 'react'
import LoginForm from '../components/auth/loginUsuario/LoginForm'
import LoginFooter from '../components/auth/loginUsuario/LoginFooter'
import LoginHeader from '../components/auth/loginUsuario/LoginHeader'
import { GiChefToque } from 'react-icons/gi'
import { MdRestaurantMenu } from 'react-icons/md'
import { LuCookingPot } from 'react-icons/lu'
import { TbToolsKitchen2 } from 'react-icons/tb'
import LoginAdminHeader from '../components/auth/loginAdmin/LoginAdminHeader'

const LoginPage = () => {
  return (
    <div className="login-page">
      <section className="login-card">
        <LoginHeader />
        <LoginForm />
        <LoginFooter />
      </section>
    </div>
  )
}

export default LoginPage
