import React from 'react'
import LoginADminHeader from '../components/loginAdmin/LoginAdminHeader'
import LoginForm from '../components/loginAdmin/LoginAdminForm'
import LoginFooter from '../components/loginAdmin/LoginAdminFooter'

const AdminLoginPage = () => {
  return (
    <div className="login-page">
      <section className="login-card">
        <LoginADminHeader />
        <LoginForm />
        <LoginFooter />
      </section>
    </div>
  )
}

export default AdminLoginPage
