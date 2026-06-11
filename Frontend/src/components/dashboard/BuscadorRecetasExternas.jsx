import { useState } from 'react'
import api from '../../api/api'
import TarjetaRecetaExterna from './TarjetaRecetaExterna'

const BuscadorRecetasExternas = () => {
  const [query, setQuery] = useState('')
  const [maxReadyTime, setMaxReadyTime] = useState('')
  const [recetasExternas, setRecetasExternas] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const buscarRecetaExterna = async () => {
    if (query.trim() === '') {
      setError('Ingresá un ingrediente o nombre de receta para buscar.')
      setRecetasExternas([])
      setTotal(0)
      return
    }
    if (query.trim().length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres.')
      setRecetasExternas([])
      setTotal(0)
      return
    }

    try {
      setLoading(true)
      setError('')

      const datos = {
        query: query.trim(),
        maxReadyTime: maxReadyTime || undefined
      }

      const respuesta = await api.get('/recetas/externas', {
        params: datos
      })

      setRecetasExternas(respuesta.data.resultados)
      setTotal(respuesta.data.total)
      setQuery('')
      setMaxReadyTime('')

      if (respuesta.data.resultados.length === 0) {
        setError('No se encontraron recetas con esos criterios.')
      }
    } catch (error) {
      setError(
        error.response?.data?.mensaje ||
          'Ocurrió un error al buscar recetas externas. Intentá nuevamente.'
      )

      setRecetasExternas([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }

  return (
    <article className="card">
      <div className="section-title">
        <h3>🌍 Explorar recetas externas</h3>
      </div>

      <p className="muted">Buscá inspiración en recetas externas según ingredientes o nombre.</p>

      <input
        type="text"
        placeholder="Ej. pasta, pollo, ensalada"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setError('')
        }}
      />

      <select
        value={maxReadyTime}
        onChange={(e) => {
          setMaxReadyTime(e.target.value)
          setError('')
        }}
      >
        <option value="">Cualquier tiempo</option>
        <option value="15">Hasta 15 min</option>
        <option value="30">Hasta 30 min</option>
        <option value="60">Hasta 60 min</option>
      </select>

      {error && <p className="error">{error}</p>}

      <button
        type="button"
        className="btn"
        style={{ width: '25%', marginBottom: 16 }}
        onClick={buscarRecetaExterna}
        disabled={loading}
      >
        {loading ? 'Buscando...' : '🔍 Buscar recetas'}
      </button>

      {recetasExternas.length > 0 && (
        <p className="muted">
          Se encontraron {total} recetas. Mostrando {recetasExternas.length}.
        </p>
      )}

      {recetasExternas.length > 0 && (
        <div className="external-results">
          {recetasExternas.map((receta) => (
            <TarjetaRecetaExterna key={receta.id} receta={receta} />
          ))}
        </div>
      )}
    </article>
  )
}

export default BuscadorRecetasExternas
