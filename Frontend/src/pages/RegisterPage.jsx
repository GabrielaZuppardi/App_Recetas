import RegisterForm from '../components/auth/registro/RegisterForm'
import RegisterFooter from '../components/auth/registro/RegisterFooter'
import RegisterHeader from '../components/auth/registro/RegisterHeader'

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
