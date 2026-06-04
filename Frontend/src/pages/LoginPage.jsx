import React from 'react'
import { Link } from 'react-router'
import LoginForm from '../components/login/LoginForm'
import LoginHeader from '../components/login/LoginHeader'
import LoginFooter from '../components/login/LoginFooter'


const LoginPage = () => {
  return (
    <div>

      <LoginHeader />
      <h1>Login</h1>
      <LoginForm />
      <LoginFooter/>
        
        
    </div>
  )
}

export default LoginPage