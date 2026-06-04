import React from 'react'
import { useNavigate } from 'react-router'
import { useId, useRef } from 'react'

const LoginForm = () => {

  const navigate = useNavigate();
  const idCampo = useId();
  const refCampo = useRef(null);

  const ingresar = () => {
    const correoElectronico = refCampo.current.value;
    if (correoElectronico === "a@a.com") {
      localStorage.setItem("usuario", correoElectronico);
      navigate('/dashboard');
    } else {
    
    }
  }

  return (
    <form>
      <div className="form-group">
        <label>Correo electrónico</label>
        <div className="input-wrap">
          <span className="icon">✉️</span>
          <input type="email" placeholder="ejemplo@gourmet.com" id={idCampo} ref={refCampo} />
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
      <button type="subtmit" className="submit-btn" onClick={ingresar}>
        Ingresar a la Plataforma →
      </button>


    </form>
  )
}

export default LoginForm
