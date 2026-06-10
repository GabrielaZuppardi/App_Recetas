import React, { useEffect } from 'react'
import TarjetaReceta from './TarjetaReceta'
import { useDispatch, useSelector } from 'react-redux'
import { agregarReceta, eliminarReceta } from '../../features/recetas.slice'
import api from '../../api/api'
import ModalReceta from './ModalReceta'
import Paginado from '../../pages/Paginado'

const MisRecetas = () => {
  const dispatch = useDispatch()

  const recetas = useSelector((state) => state.recetas.recetas)
  const categorias = useSelector((state) => state.categorias.categorias)

  const [loading, setLoading] = React.useState(true)
  const [recetaSeleccionada, setRecetaSeleccionada] = React.useState(null)
  const [abrirEditando, setAbrirEditando] = React.useState(false)

  const [categoriaFiltro, setCategoriaFiltro] = React.useState('')
  const [dificultadFiltro, setDificultadFiltro] = React.useState('')
  const [tiempoMaximoFiltro, setTiempoMaximoFiltro] = React.useState('')

  const [paginaActual, setPaginaActual] = React.useState(1)
  const [totalPaginas, setTotalPaginas] = React.useState(1)

  const limite = 4

  const obtenerMisRecetas = async () => {
    try {
      setLoading(true)

      const respuesta = await api.get('/recetas/mias', {
        params: {
          page: paginaActual,
          limit: limite,
          categoria: categoriaFiltro || undefined,
          dificultad: dificultadFiltro || undefined,
          tiempoMax: tiempoMaximoFiltro || undefined
        }
      })

      dispatch(agregarReceta(respuesta.data.recetas))
      setTotalPaginas(respuesta.data.totalPages || 1)
    } catch (error) {
      console.log(error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    obtenerMisRecetas()
  }, [paginaActual, categoriaFiltro, dificultadFiltro, tiempoMaximoFiltro])

  const paginaAnterior = () => {
    setPaginaActual((prev) => prev - 1)
  }

  const paginaSiguiente = () => {
    setPaginaActual((prev) => prev + 1)
  }

  const eliminarR = async (id) => {
    try {
      await api.delete(`/recetas/${id}`)

      dispatch(eliminarReceta(id))

      obtenerMisRecetas()
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

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
              setCategoriaFiltro(e.target.value)
              setPaginaActual(1)
            }}
          >
            <option value="">Todas</option>

            {categorias.map((categoria) => (
              <option key={categoria._id} value={categoria._id}>
                {categoria.nombre}
              </option>
            ))}
          </select>

          <select
            style={{ maxWidth: 160, margin: 0 }}
            value={dificultadFiltro}
            onChange={(e) => {
              setDificultadFiltro(e.target.value)
              setPaginaActual(1)
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
              setTiempoMaximoFiltro(e.target.value)
              setPaginaActual(1)
            }}
          >
            <option value="">Todas</option>
            <option value="30">Hasta 30 min</option>
            <option value="60">Hasta 60 min</option>
            <option value="90">Hasta 90 min</option>
          </select>
        </div>

        <div className="recipes">
          {loading ? (
            <p>Cargando recetas...</p>
          ) : recetas.length > 0 ? (
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

        <Paginado
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          paginaAnterior={paginaAnterior}
          paginaSiguiente={paginaSiguiente}
        />

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
