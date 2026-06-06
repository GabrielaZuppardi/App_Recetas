import React from 'react'
import { LuUtensilsCrossed } from "react-icons/lu"; //iconos react

const TarjetaReceta = ({ receta }) => {
  return (
    <div className="recipe">
      {receta.imagenUrl ? (
        <img
          src={receta.imagenUrl}
          alt={receta.titulo}
        />
      ) : (
        <div className="recipe-placeholder">
  <LuUtensilsCrossed className="recipe-placeholder-icon" />
</div>
      )}

      <div className="recipe-body">
        <h4>{receta.titulo}</h4>
        <p>
          {receta.descripcion}
        </p>

        <div className="recipe-actions">
          <button type="button" onClick={() => onEditar(receta)}>
            ✏️
          </button>

          <button type="button" onClick={() => onEliminar(receta._id)}>
            🗑️
          </button>

          <button type="button" onClick={() => onPulirIA(receta)}>
            ✨ Mejorar
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