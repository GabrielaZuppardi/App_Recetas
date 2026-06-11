import React from 'react'
import { useDispatch } from 'react-redux'
import api from '../../../api/api'
import { crearAdmin as crearAdminAction } from '../../../features/usuarios.slice'
import CrearAdminForm from './CrearAdminForm'

const [mensajeExito, setMensajeExito] = useState('')

const CrearUsuarioAdmin = () => {
  const dispatch = useDispatch()

  const crearU = (nuevoUsuario, setError, reset) => {
    api
      .post('/usuarios', nuevoUsuario)
      .then((res) => {
        const adminCreado = res.data.administrador

        dispatch(crearAdminAction(adminCreado))
        setMensajeExito('Administrador creado correctamente')

        reset()

        setTimeout(() => {
        setMensajeExito('')
      }, 2000)
      })
      .catch((err) => {
        setError('root', {
          type: 'manual',
          message:
            err.response?.data?.message ||
            err.response?.data?.errores?.[0] ||
            'No se pudo crear el administrador'
        })

        console.error('Error al crear administrador:', err)
      })
  }

  return (
    <section className="admin-card">
      <h2>Crear administrador</h2>
      <CrearAdminForm crearU={crearU} mensajeExito={mensajeExito} />
    </section>
  )
}

export default CrearUsuarioAdmin
