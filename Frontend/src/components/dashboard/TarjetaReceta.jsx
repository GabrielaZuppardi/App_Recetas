import React from 'react'

const TarjetaReceta = ({receta}) => {
      console.log(receta)
  return (
   <div className="recipe">
    <img
      src={receta.imagenUrl || "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=80"}
        alt={receta.titulo}
    />
    <div className="recipe-body">
      <h4>{receta.titulo}</h4>
      <p>
        {receta.descripcion} 
      </p>
      <div className="recipe-footer">
        <span>⏱ {receta.tiempoPreparacion} min</span>
        <span>👥 {receta.porciones} porciones</span>
      </div>
    </div>
  </div>
  )
}

export default TarjetaReceta