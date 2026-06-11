import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from '../../../api/api'
import { agregarCategorias, eliminarCategoria, editarCategoria } from '../../../features/categorias.slice'
import ModalCategoria from './ModalCategoria'
import CategoriasTabla from './CategoriasTabla'
import ModalConfirmacion from '../../utils/ModalConfirmacion'

const CategoriasAdmin = () => {
  // Obtiene la lista de categorías desde Redux y permite despachar acciones al store.
  const categorias = useSelector((state) => state.categorias.categorias)
  const dispatch = useDispatch()

  // Estado de la categoría actualmente seleccionada en el modal.
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null)

  // Mensajes
  const [mensajeError, setMensajeError] = useState('')
  const [mensajeExito, setMensajeExito] = useState('')

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
        setMensajeError('No se pudieron cargar las categorías')
      })
  }, [dispatch])

  // Elimina una categoría y actualiza Redux para reflejar el cambio en pantalla.
  const solicitarEliminarC = (categoria) => {
    setMensajeError('')
    setMensajeExito('')
    setCategoriaAEliminar(categoria)
  }

  const cancelarEliminarC = () => {
    setCategoriaAEliminar(null)
  }

  const confirmarEliminarC = () => {
    api
      .delete(`/categorias/${categoriaAEliminar._id}`)
      .then(() => {
        dispatch(eliminarCategoria(categoriaAEliminar._id))
        setMensajeExito('Categoría eliminada correctamente')
        setCategoriaAEliminar(null)

        setTimeout(() => {
          setMensajeExito('')
        }, 1500)
      })
      .catch((err) => {
        setMensajeError(err.response?.data?.message || 'No se pudo eliminar la categoría')
        setCategoriaAEliminar(null)
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

      {mensajeError && <span className="error error-general">{mensajeError}</span>}
      {mensajeExito && <span className="success-message">{mensajeExito}</span>}

      <CategoriasTabla categorias={categorias} setCategoriaSeleccionada={setCategoriaSeleccionada} eliminarC={solicitarEliminarC} />

      <ModalCategoria categoria={categoriaSeleccionada} editarC={editarC} onClose={() => setCategoriaSeleccionada(null)} />

      {categoriaAEliminar && (
        <ModalConfirmacion
          titulo="Eliminar categoría"
          mensaje={`¿Desea eliminar la categoría ${categoriaAEliminar.nombre}?`}
          onConfirmar={confirmarEliminarC}
          onCancelar={cancelarEliminarC}
        />
      )}
    </section>
  )
}

export default CategoriasAdmin
