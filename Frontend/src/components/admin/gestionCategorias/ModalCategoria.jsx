import { useEffect, useState } from 'react'
import EditarCategoriaForm from './EditarCategoriaForm'
import TarjetaCategoria from './TarjetaCategoria'

const ModalCategoria = ({ categoria, editarC, onClose }) => {
  // Determina si el modal está mostrando el detalle de la categoría o el formulario de edición.
  const [modoEdicion, setModoEdicion] = useState(false)

  /* Cada vez que se selecciona una categoría distinta, el modal vuelve al modo visualización.
  De esta forma evito que el modo edición quede persistido entre categorías distintas y garantizo que cada categoría se abra inicialmente en modo visualización */
  useEffect(() => {
    setModoEdicion(false)
  }, [categoria])

  // Si no hay categoría seleccionada, no se renderiza el modal.
  if (!categoria) return null

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-header-admin">
          <h2>{modoEdicion ? 'Editar categoría' : 'Detalle de la categoría'}</h2>
        </div>

        {!modoEdicion ? (
          <TarjetaCategoria categoria={categoria} onEditar={() => setModoEdicion(true)} onClose={onClose} />
        ) : (
          <EditarCategoriaForm categoria={categoria} editarC={editarC} cancelarEdicion={() => setModoEdicion(false)} onClose={onClose} />
        )}
      </div>
    </div>
  )
}

export default ModalCategoria
