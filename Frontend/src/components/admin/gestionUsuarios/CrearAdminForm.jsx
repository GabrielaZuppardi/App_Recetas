import React, { useState } from 'react'

const CrearUsuarioForm = ({ crearU }) => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const nuevoUsuario = {
      nombre,
      email,
      password,
      rol: 'administrador'
    }

    crearU(nuevoUsuario)

    setNombre('')
    setEmail('')
    setPassword('')
  }

  return (
    <form className="form-admin" onSubmit={handleSubmit}>

      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Ej: Ana Pérez"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Ej: ana.perez@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Mínimo 8 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="btn-admin">
        Crear administrador
      </button>

    </form>
  )
}

export default CrearUsuarioForm