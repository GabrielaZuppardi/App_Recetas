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
      <label>Nombre</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" className="btn-admin">
        Crear administrador
      </button>
    </form>
  )
}

export default CrearUsuarioForm