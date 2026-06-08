import React, { useState } from 'react'
import api from '../../../api/api'

const CrearUsuarioAdmin = () => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'administrador',
    plan: 'premium'
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const crearUsuario = (e) => {
    e.preventDefault()

    api.post('/usuarios', form)
      .then(res => {
        alert('Usuario administrador creado correctamente')

        setForm({
          nombre: '',
          email: '',
          password: '',
          rol: 'administrador',
          plan: 'premium'
        })

        console.log(res.data)
      })
      .catch(err => {
        console.error(err.response?.data || err.message)
        alert('Error al crear usuario')
      })
  }

  return (
    <section className="crear-usuario-admin">
      <h2>Crear administrador</h2>

      <form onSubmit={crearUsuario} className="form-admin">

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-admin">
          Crear administrador
        </button>

      </form>
    </section>
  )
}

export default CrearUsuarioAdmin