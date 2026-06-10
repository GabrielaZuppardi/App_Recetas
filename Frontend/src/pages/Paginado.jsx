import React from 'react'

const Paginado = ({ paginaActual, totalPaginas, paginaAnterior, paginaSiguiente }) => {
  return (
    <div className="paginado">
      <button onClick={paginaAnterior} disabled={paginaActual === 1}>
        Anterior
      </button>

      <span>
        Página {paginaActual} de {totalPaginas}
      </span>

      <button onClick={paginaSiguiente} disabled={paginaActual === totalPaginas}>
        Siguiente
      </button>
    </div>
  )
}

export default Paginado
