import React from 'react'

const TarjetaRecetaExterna = ({ receta }) => {
  return (
    <div className="recipe">
      <img src={receta.image} alt={receta.title} />

      <div className="recipe-body">
        <h4>{receta.title}</h4>

        <p>⏱ {receta.readyInMinutes} min</p>

        <p>👥 {receta.servings} porciones</p>

        <p>🌐 {receta.sourceName || 'Fuente externa'}</p>
      </div>

      <div className="recipe-actions">
        <a href={receta.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn-link">
          Ver receta ↗
        </a>
      </div>
    </div>
  )
}

export default TarjetaRecetaExterna
