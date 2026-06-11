const TarjetaCategoria = ({ categoria, onEditar }) => {
  return (
    <div className="admin-info-card">
      <p>
        {' '}
        <strong>Nombre:</strong> {categoria.nombre}
      </p>

      <p>
        <strong>Descripción:</strong>
      </p>

      <p>{categoria.descripcion}</p>

      <button className="btn-admin" onClick={onEditar}>
        Editar categoría
      </button>
    </div>
  )
}

export default TarjetaCategoria
