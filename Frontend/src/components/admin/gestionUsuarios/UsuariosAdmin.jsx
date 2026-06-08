import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from '../../../api/api'
import { agregarUsuarios, eliminarUsuario, editarUsuario } from '../../../features/usuarios.slice'
import ModalUsuario from './ModalUsuario'
import UsuariosFiltros from './UsuariosFiltros'
import UsuariosTabla from './UsuariosTabla'
import Paginado from './Paginado'

const UsuariosAdmin = () => {

  const usuarios = useSelector(state => state.usuarios.usuarios)
  const dispatch = useDispatch()

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [filtroBusqueda, setFiltroBusqueda] = useState('')
  const [filtroRol, setFiltroRol] = useState('')
  const [filtroPlan, setFiltroPlan] = useState('')

  useEffect(() => {
    api.get('/usuarios', {
      params: {
        page: paginaActual,
        limit: 10,
        busqueda: filtroBusqueda,
        rol: filtroRol,
        plan: filtroPlan
      }
    })
      .then(res => {
        const listaUsuarios =
          res.data.usuarios ||
          res.data.data ||
          []

        dispatch(agregarUsuarios(listaUsuarios))

        if (res.data.totalPages) {
          setTotalPaginas(res.data.totalPages)
        }
      })
      .catch(err => {
        console.error('Error al obtener usuarios:', err)
      })

  }, [dispatch, paginaActual, filtroBusqueda, filtroRol, filtroPlan])

  const eliminarU = (id) => {
    const confirmar = window.confirm('¿Desea eliminar este usuario?')

    if (!confirmar) return

    api.delete(`/usuarios/${id}`)
      .then(() => {
        dispatch(eliminarUsuario(id))
      })
      .catch(err => {
        console.error(err.response?.data || err.message)
      })
  }

  const editarU = (id, datosActualizados) => {
    api.patch(`/usuarios/${id}`, datosActualizados)
      .then((res) => {
        dispatch(editarUsuario(res.data.usuario))
      })
      .catch(err => {
        console.error(err.response?.data || err.message)
      })
  }

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