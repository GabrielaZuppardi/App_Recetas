import React from 'react'

const RegisterForm = () => {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="name">Nombre Completo</label>

        <div className="input-wrap">
          <span className="input-icon">👤</span>

          <input
            id="name"
            type="text"
            placeholder="Ingresa tu nombre"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Correo electrónico</label>

        <div className="input-wrap">
          <span className="input-icon">✉️</span>

          <input
            id="email"
            type="email"
            placeholder="chef@gourmet.io"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña</label>

        <div className="input-wrap">
          <span className="input-icon">🔒</span>

          <input
            id="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">
          Confirmar Contraseña
        </label>

        <div className="input-wrap">
          <span className="input-icon">🔒</span>

          <input
            id="confirmPassword"
            type="password"
            placeholder="Repite la contraseña"
          />
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Crear mi Cuenta Gratis
      </button>
    </form>
  )
}

export default RegisterForm