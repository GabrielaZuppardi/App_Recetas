import React from 'react'
import { useDispatch } from 'react-redux'
import api from '../../../api/api'
import { crearAdmin as crearAdminAction } from '../../../features/usuarios.slice'
import CrearUsuarioForm from './CrearAdminForm'

const CrearUsuarioAdmin = () => {
  const dispatch = useDispatch()

  const crearU = (nuevoUsuario, setError, reset) => {
    api.post('/usuarios', nuevoUsuario)
      .then((res) => {
        dispatch(crearAdminAction(res.data.usuario))
        reset()
      })
      .catch(err => {

        setError('root', {
          type: 'manual',
          message:
            err.response?.data?.message ||
            'No se pudo crear el administrador'
        })

        console.error('Error al crear administrador:', err)
      })
  }

  return (
    <section className="admin-card">
      <h2>Crear administrador</h2>

      <CrearUsuarioForm crearU={crearU} />
    </section>
  )
}

export default CrearUsuarioAdmin