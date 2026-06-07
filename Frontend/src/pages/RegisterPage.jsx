import React from 'react'
import RegisterForm from '../components/registro/RegisterForm'
import RegisterFooter from '../components/registro/RegisterFooter'
import RegisterHeader from '../components/registro/RegisterHeader'


const RegisterPage = () => {
  return (
    <div className="register-page">
      <section className="register-card">

        <RegisterHeader />
        <RegisterForm />
        <RegisterFooter />

      </section>
    </div>
  )
}

export default RegisterPage