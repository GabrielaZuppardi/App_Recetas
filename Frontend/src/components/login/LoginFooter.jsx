import React from 'react'
import { Link } from 'react-router'

const LoginFooter = () => {
  return (
    <section className="footer">
      <Link to="/registro">¿No tienes una cuenta? Regístrate aquí</Link>
    </section>
  )
}

export default LoginFooter