const ModalConfirmacion = ({ titulo, mensaje, onConfirmar, onCancelar }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>{titulo}</h2>

        <p>{mensaje}</p>

        <div className="modal-actions">
          <button className="btn-admin btn-danger" onClick={onConfirmar}>
            Eliminar
          </button>

          <button className="btn secondary" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirmacion
