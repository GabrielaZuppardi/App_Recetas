import React from 'react'
import { useDispatch } from 'react-redux'
import api from '../../../api/api'
import { crearAdmin } from '../../../features/usuarios.slice'
import CrearUsuarioForm from './CrearAdminForm'

const CrearUsuarioAdmin = () => {
  const dispatch = useDispatch()

  const crearAdmin = (nuevoUsuario) => {
    api.post('/usuarios', nuevoUsuario)
      .then((res) => {
        dispatch(crearAdmin(res.data.usuario))
      })
      .catch(err => {
        console.error(err.response?.data || err.message)
      })
  }

  return (
    <section className="admin-card">
      <h2>Crear administrador</h2>

      <CrearUsuarioForm crearU={crearAdmin} />
    </section>
  )
}

export default CrearUsuarioAdmin