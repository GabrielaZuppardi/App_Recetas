import LoginForm from '../components/auth/loginUsuario/LoginForm'
import LoginFooter from '../components/auth/loginUsuario/LoginFooter'
import LoginHeader from '../components/auth/loginUsuario/LoginHeader'

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