import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from '../../../api/api'
import { agregarUsuarios, eliminarUsuario, editarUsuario } from '../../../features/usuarios.slice'
import ModalUsuario from './ModalUsuario'
import UsuariosFiltros from './UsuariosFiltros'
import UsuariosTabla from './UsuariosTabla'
import Paginado from '../../../pages/Paginado'

const UsuariosAdmin = () => {
  // Obtiene la lista de usuarios desde Redux y permite despachar acciones al store.
  const usuarios = useSelector((state) => state.usuarios.usuarios)
  const dispatch = useDispatch()

  // Estado del usuario actualmente seleccionado en el modal.
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)

  // Estados utilizados para el paginado.
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)

  // Estados de los filtros de búsqueda.
  const [filtroBusqueda, setFiltroBusqueda] = useState('')
  const [filtroRol, setFiltroRol] = useState('')
  const [filtroPlan, setFiltroPlan] = useState('')

  // Obtiene usuarios del backend cada vez que cambian la página o los criterios de búsqueda.
  useEffect(() => {
    api
      .get('/usuarios', {
        params: {
          page: paginaActual,
          limit: 10,
          busqueda: filtroBusqueda,
          rol: filtroRol,
          plan: filtroPlan
        }
      })
      .then((res) => {
        // Actualiza la lista global de usuarios en Redux.
        dispatch(agregarUsuarios(res.data.usuarios))

        // Actualiza la cantidad total de páginas.
        if (res.data.totalPages) {
          setTotalPaginas(res.data.totalPages)
        }
      })
      .catch((err) => {
        console.error('Error al obtener usuarios:', err)
      })
  }, [dispatch, paginaActual, filtroBusqueda, filtroRol, filtroPlan])

  // Elimina un usuario y actualiza Redux para reflejar el cambio en pantalla.
  const eliminarU = (id) => {
    const confirmar = window.confirm('¿Desea eliminar este usuario?')

    if (!confirmar) return

    api
      .delete(`/usuarios/${id}`)
      .then(() => {
        dispatch(eliminarUsuario(id))
      })
      .catch((err) => {
        console.error(err.response?.data || err.message)
      })
  }

  // Envía los cambios del usuario al backend y actualiza Redux con la versión modificada.
  const editarU = (id, datosActualizados, setError, onClose) => {
    api
      .patch(`/usuarios/${id}`, datosActualizados)
      .then((res) => {
        dispatch(editarUsuario(res.data.usuario))
        onClose()
      })
      .catch((err) => {
        setError('root', {
          type: 'manual',
          message: err.response?.data?.message || 'No se pudo editar el usuario'
        })

        console.error('Error al editar usuario:', err)
      })
  }

  // Navegación entre páginas del listado.
  const paginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1)
    }
  }

  const paginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1)
    }
  }

  return (
    <section className="usuarios-admin">
      <h2>Usuarios registrados</h2>

      <UsuariosFiltros
        filtroBusqueda={filtroBusqueda}
        setFiltroBusqueda={setFiltroBusqueda}
        filtroRol={filtroRol}
        setFiltroRol={setFiltroRol}
        filtroPlan={filtroPlan}
        setFiltroPlan={setFiltroPlan}
        setPaginaActual={setPaginaActual}
      />

      <UsuariosTabla
        usuarios={usuarios}
        setUsuarioSeleccionado={setUsuarioSeleccionado}
        editarU={editarU}
        eliminarU={eliminarU}
      />

      <Paginado
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        paginaAnterior={paginaAnterior}
        paginaSiguiente={paginaSiguiente}
      />

      <ModalUsuario
        usuario={usuarioSeleccionado}
        editarU={editarU}
        onClose={() => setUsuarioSeleccionado(null)}
      />
    </section>
  )
}

export default UsuariosAdmin
