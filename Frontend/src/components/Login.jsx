import React from 'react'
import LoginHeader from './LoginHeader'
import LoginForm from './LoginForm'
import DemoBox from './DemoBox'
import LoginFooter from './LoginFooter'

const Login = () => {
   return (
    <main className="login-card">
      <LoginHeader />
      <DemoBox />
      <LoginForm />
      <LoginFooter />
    </main>
  );
}

export default Login