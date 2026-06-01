import React from 'react'
import RegisterHeader from '../components/RegisterHeader'
import RegisterForm from '../components/RegisterForm'
import RegisterFooter from '../components/RegisterFooter'

const Registro = () => {
  return (
    <main className="register-card">
      <RegisterHeader />
      <RegisterForm />
      <RegisterFooter />
    </main>
  )
}

export default Registro