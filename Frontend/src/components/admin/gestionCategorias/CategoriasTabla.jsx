import { FaTrash } from 'react-icons/fa'

const CategoriasTabla = ({ categorias, setCategoriaSeleccionada, eliminarC }) => {
  return (
    <div className="tabla-scroll">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(categorias) &&
            categorias.map((categoria) => (
              <tr key={categoria._id}>
                <td>{categoria.nombre}</td>
                <td>{categoria.descripcion}</td>

                <td>
                  <div className="acciones">
                    <button className="btn-admin" onClick={() => setCategoriaSeleccionada(categoria)}>
                      Ver detalle
                    </button>

                    <button className="btn-delete" onClick={() => eliminarC(categoria)}>
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default CategoriasTabla
