import React from 'react'

const LoginForm = () => {
  return (
    <form>
      <div className="form-group">
        <label>Correo electrónico</label>
        <div className="input-wrap">
          <span className="icon">✉️</span>
          <input type="email" placeholder="ejemplo@gourmet.com" />
        </div>
      </div>
      <div className="form-group">
        <div className="top-row">
          <label>Contraseña</label>
          <button type="button" className="forgot">
            ¿Olvidó contraseña?
          </button>
        </div>
        <div className="input-wrap">
          <span className="icon">🔒</span>
          <input type="password" placeholder="••••••••" />
        </div>
      </div>
      <button type="submit" className="submit-btn">
        Ingresar a la Plataforma →
      </button>
    </form>
  )
}

export default LoginForm
