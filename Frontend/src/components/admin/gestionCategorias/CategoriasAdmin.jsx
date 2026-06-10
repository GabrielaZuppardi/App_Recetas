import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from '../../../api/api'
import {
  agregarCategorias,
  eliminarCategoria,
  editarCategoria
} from '../../../features/categorias.slice'
import ModalCategoria from './ModalCategoria'
import CategoriasTabla from './CategoriasTabla'

const CategoriasAdmin = () => {
  // Obtiene la lista de categorías desde Redux y permite despachar acciones al store.
  const categorias = useSelector((state) => state.categorias.categorias)
  const dispatch = useDispatch()

  // Estado de la categoría actualmente seleccionada en el modal.
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)

  // Obtiene todas las categorías del backend al cargar el componente.
  useEffect(() => {
    api
      .get('/categorias')
      .then((res) => {
        // Actualiza la lista global de categorías en Redux.
        dispatch(agregarCategorias(res.data.categorias))
      })
      .catch((err) => {
        console.error('Error al obtener categorías:', err)
      })
  }, [dispatch])

  // Elimina una categoría y actualiza Redux para reflejar el cambio en pantalla.
  const eliminarC = (id) => {
    const confirmar = window.confirm('¿Desea eliminar esta categoría?')

    if (!confirmar) return

    api
      .delete(`/categorias/${id}`)
      .then(() => {
        dispatch(eliminarCategoria(id))
      })
      .catch((err) => {
        console.error(err.response?.data || err.message)
      })
  }

  // Envía los cambios de la categoría al backend y actualiza Redux con la versión modificada.
  const editarC = (id, datosActualizados, setError, onClose) => {
    api
      .patch(`/categorias/${id}`, datosActualizados)
      .then((res) => {
        dispatch(editarCategoria(res.data.categoria))
        onClose()
      })
      .catch((err) => {
        setError('root', {
          type: 'manual',
          message: err.response?.data?.message || 'No se pudo editar la categoría'
        })

        console.error('Error al editar categoría:', err)
      })
  }

  return (
    <section className="categorias-admin">
      <h2>Categorías registradas</h2>

      <CategoriasTabla
        categorias={categorias}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
        eliminarC={eliminarC}
      />

      <ModalCategoria
        categoria={categoriaSeleccionada}
        editarC={editarC}
        onClose={() => setCategoriaSeleccionada(null)}
      />
    </section>
  )
}

export default CategoriasAdmin
