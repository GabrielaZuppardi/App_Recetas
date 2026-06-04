//1.TRAE RECETAS DESDE LA API
//2. GUARDA LAS RECETAS EN EL ESTADO GLOBAL REDUX UseDispatch
//3. LEE LAS RECETAS DESDE EL ESTADO GLOBAL REDUX UseSelector
//4. MUESTRA LAS RECETAS EN LA PANTALLA


import React, { useEffect } from 'react'
import TarjetaReceta from './TarjetaReceta'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { agregarReceta } from '../features/recetas.slice'

const Recetas = () => {
  const dispatch = useDispatch()

  const recetas = useSelector((state) => state.recetas.recetas)
  const[loading, setLoading] = React.useState(true)

  useEffect(() => {
    axios
      .get("http://localhost:3000/v1/recetas-test")
      .then((r) => {
        console.log(r.data.recetas)
        dispatch(agregarReceta(r.data.recetas))
        
      })
      .catch((error) => {
        console.log(error)
        
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <article className="card">
      <div className="section-title">
        <h3>📖 Mis recetas personales</h3>
      </div>

      <div className="content">
        <div className="filters">
          <span className="muted">Filtrar recetas</span>

          <select style={{ maxWidth: 160, margin: 0 }}>
            <option>Todas</option>
            <option>Pasta</option>
            <option>Carnes</option>
            <option>Postres</option>
          </select>

          <select style={{ maxWidth: 160, margin: 0 }}>
            <option>Todas</option>
            <option>Fácil</option>
            <option>Media</option>
            <option>Difícil</option>
          </select>
        </div>

        <div className="recipes">
          {loading ? <p>Cargando recetas...</p> : 
          recetas.length > 0 ? (
            recetas.map((receta) => (
              <TarjetaReceta key={receta._id}
                receta={receta}
              />
            ))
          ) : (
            <p className="muted">No hay recetas para mostrar</p>
          )}
        </div>
      </div>

    </article>
  )
}

export default Recetas