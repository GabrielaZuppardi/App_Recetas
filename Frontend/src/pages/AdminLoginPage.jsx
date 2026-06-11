import LoginADminHeader from '../components/auth/loginAdmin/LoginAdminHeader'
import LoginForm from '../components/auth/loginAdmin/LoginAdminForm'
import LoginFooter from '../components/auth/loginAdmin/LoginAdminFooter'

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
