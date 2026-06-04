import React from 'react'
import LoginHeader from './LoginHeader'
import LoginForm from './LoginForm'
import LoginFooter from './LoginFooter'

const Login = () => {
   return (
    <main className="login-card">
      <LoginHeader />
      <LoginForm />
      <LoginFooter />
    </main>
  );
}

export default Login