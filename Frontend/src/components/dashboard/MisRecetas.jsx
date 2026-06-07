//1.TRAE RECETAS DESDE LA API
//2. GUARDA LAS RECETAS EN EL ESTADO GLOBAL REDUX UseDispatch
//3. LEE LAS RECETAS DESDE EL ESTADO GLOBAL REDUX UseSelector
//4. MUESTRA LAS RECETAS EN LA PANTALLA


import React, { useEffect } from 'react'
import TarjetaReceta from './TarjetaReceta'
import { useDispatch, useSelector } from 'react-redux'
import { agregarReceta, eliminarReceta } from '../../features/recetas.slice'
import api from '../../api/api'
import ModalReceta from "./ModalReceta"

const MisRecetas = () => {

  const dispatch = useDispatch()

  const recetas = useSelector((state) => state.recetas.recetas)
  const [loading, setLoading] = React.useState(true)
  const [recetaSeleccionada, setRecetaSeleccionada] = React.useState(null)
  console.log("Receta seleccionada:", recetaSeleccionada)

  const categorias = useSelector((state) => state.categorias.categorias)
  const [categoriaFiltro, setCategoriaFiltro] = React.useState("")
  const [dificultadFiltro, setDificultadFiltro] = React.useState("")
  const [tiempoMaximoFiltro, setTiempoMaximoFiltro] = React.useState("")

  const [abrirEditando, setAbrirEditando] = React.useState(false)
  const actualizarRecetaEnVista = (recetaActualizada) => {
    setRecetaSeleccionada(recetaActualizada)
  }

  const eliminarR = async (id) => {
    try {
      console.log("Eliminar receta:", id)

      await api.delete(`/recetas/${id}`)

      dispatch(eliminarReceta(id))

      console.log("Receta eliminada")
    } catch (error) {
      console.log(error.response?.data || error.message)
    }

  }

  const filtrarRecetas = (categoria, dificultad, tiempoMaximo) => {
    api.get("/recetas/filtros", {
      params: {
        categoria: categoria || undefined,
        dificultad: dificultad || undefined,
        tiempoMax: tiempoMaximo || undefined,
        limit: 100
      }
    })
      .then((r) => {
        console.log("RECETAS FILTRADAS", r.data)
        dispatch(agregarReceta(r.data.recetas))
      })
      .catch((error) => {
        console.log(error.response?.data || error.message)
      })
  }


  useEffect(() => {
    api
      .get("/recetas/mias")
      .then((r) => {

        console.log("RESPUESTA COMPLETA:", r.data)
        console.log("RECETAS:", r.data.recetas)

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

          <select
            style={{ maxWidth: 160, margin: 0 }}
            value={categoriaFiltro}
            onChange={(e) => {
              const categoriaSeleccionada = e.target.value

              console.log("Categoria elegida:", categoriaSeleccionada)

              setCategoriaFiltro(categoriaSeleccionada)

              filtrarRecetas(categoriaSeleccionada, dificultadFiltro, tiempoMaximoFiltro)
            }}
          >
            <option value="">Todas</option>

            {categorias.map((categoria) => (
              <option
                key={categoria._id}
                value={categoria._id}
              >
                {categoria.nombre}
              </option>
            ))}
          </select>

          <select
            style={{ maxWidth: 160, margin: 0 }}
            value={dificultadFiltro}
            onChange={(e) => {
              const dificultadSeleccionada = e.target.value

              console.log("Dificultad elegida:", dificultadSeleccionada)

              setDificultadFiltro(dificultadSeleccionada)

              filtrarRecetas(categoriaFiltro, dificultadSeleccionada, tiempoMaximoFiltro)
            }}
          >
            <option value="">Todas</option>
            <option value="facil">Fácil</option>
            <option value="media">Media</option>
            <option value="dificil">Difícil</option>
          </select>

          <select
            style={{ maxWidth: 160, margin: 0 }}
            value={tiempoMaximoFiltro}
            onChange={(e) => {
              const tiempoMaximoSeleccionado = e.target.value

              console.log("Tiempo máximo elegido:", tiempoMaximoSeleccionado)

              setTiempoMaximoFiltro(tiempoMaximoSeleccionado)

              filtrarRecetas(categoriaFiltro, dificultadFiltro, tiempoMaximoSeleccionado)
            }}
          >
            <option value="">Todas</option>
            <option value="30">Hasta 30 min</option>
            <option value="60">Hasta 60 min</option>
            <option value="90">Hasta 90 min</option>
          </select>
        </div>

        <div className="recipes">
          {loading ? <p>Cargando recetas...</p> :
            recetas.length > 0 ? (
              recetas.map((receta) => (
                <TarjetaReceta
                  key={receta._id}
                  receta={receta}
                  onClick={() => {
                    setAbrirEditando(false)
                    setRecetaSeleccionada(receta)
                  }}
                  onEliminar={eliminarR}
                  onEditar={() => {
                    setAbrirEditando(true)
                    setRecetaSeleccionada(receta)
                  }}
                />
              ))
            ) : (
              <p className="muted">No hay recetas para mostrar</p>
            )}
        </div>
        <ModalReceta
  receta={recetaSeleccionada}
  abrirEditando={abrirEditando}
  onClose={() => {
    setRecetaSeleccionada(null)
    setAbrirEditando(false)
  }}
  onEliminar={eliminarR}
/>
      </div>

    </article>
  )
}

export default MisRecetas
