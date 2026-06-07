import React from 'react'
import { LuChefHat } from "react-icons/lu"

const TarjetaReceta = ({ receta, onClick, onEliminar, onEditar }) => {
  return (
    <div className="recipe" onClick={onClick}>
      {receta.imagenUrl ? (
        <img
          src={receta.imagenUrl}
          alt={receta.titulo}
        />
      ) : (
        <div className="recipe-placeholder">
          <LuChefHat className="recipe-placeholder-icon" />
        </div>
      )}

      <div className="recipe-body">
        <h4>{receta.titulo}</h4>

        <p>
          {receta.descripcion?.length > 120
            ? receta.descripcion.slice(0, 120) + "..."
            : receta.descripcion}
        </p>
        <div className="recipe-actions">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onEditar()
            }}
          >
            ✏️
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onEliminar(receta._id)
            }}
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="recipe-footer">
        <span>⏱ {receta.tiempoPreparacion} min</span>
        <span>👥 {receta.porciones} porciones</span>
      </div>
    </div>
  )
}

export default TarjetaReceta