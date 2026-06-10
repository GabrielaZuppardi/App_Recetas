import React from 'react'
import api from '../../api/api'

const GeneradorRecetaIA = () => {
  const [ingredientesTexto, setIngredientesTexto] = React.useState('')
  const [recetaGenerada, setRecetaGenerada] = React.useState(null)
  const [fallback, setFallback] = React.useState(false)

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const generarRecetaIA = async () => {
    const ingredientes = ingredientesTexto
      .split(',')
      .map((i) => i.trim())
      .filter((i) => i !== '')

    if (ingredientes.length === 0) {
      setError('Ingresá al menos un ingrediente.')
      setFallback(false)
      setRecetaGenerada(null)
      return
    }

    const ingredientesInvalidos = ingredientes.filter((ingrediente) => ingrediente.length < 3)

    if (ingredientesInvalidos.length > 0) {
      setError('Cada ingrediente debe tener al menos 3 caracteres.')
      setFallback(false)
      setRecetaGenerada(null)
      return
    }

    try {
      setLoading(true)
      setError('')
      setFallback(false)
      setRecetaGenerada(null)

      const datos = {
        ingredientes,
        dificultad: 'facil',
        tiempoMaximo: 30
      }

      const respuesta = await api.post('/recetas/generar', datos)

      if (respuesta.data.fallback) {
        setFallback(true)
        setRecetaGenerada(null)
        return
      }

      setRecetaGenerada(respuesta.data.receta)
      setIngredientesTexto('')
      setError('')
    } catch (error) {
      setError(
        error.response?.data?.mensaje ||
          'Ocurrió un error al generar la receta. Intentá nuevamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  const mostrarIngrediente = (ingrediente) => {
    if (typeof ingrediente === 'string') {
      return ingrediente
    }

    return `${ingrediente.cantidad || ''} ${ingrediente.unidad || ''} ${ingrediente.nombre || ''} ${ingrediente.preparacion || ''}`.trim()
  }

  return (
    <div className="formulario-receta">
      <article className="card">
        <div className="section-title">
          <h3>🤖 ¿Sin ideas?</h3>
        </div>

        <form>
          <label>Dejá que la IA cree una receta simple con los ingredientes de tu heladera</label>

          <input
            type="text"
            placeholder="Ej. Pollo, tomate, albahaca"
            value={ingredientesTexto}
            onChange={(e) => {
              setIngredientesTexto(e.target.value)
              setError('')
            }}
          />

          {error && <p className="error">{error}</p>}

          <button
            type="button"
            className="btn"
            style={{ width: '100%', marginBottom: 16 }}
            onClick={generarRecetaIA}
            disabled={loading}
          >
            {loading ? 'Generando receta...' : '✨ Generar receta con IA'}
          </button>

          <div className="ai-result">
            {loading ? (
              <p>⏳ Generando receta...</p>
            ) : fallback ? (
              <div className="warning">
                ⚠️ No fue posible contactar el servicio de IA. Intentá nuevamente en unos segundos.
              </div>
            ) : recetaGenerada ? (
              <>
                <h4>{recetaGenerada.titulo}</h4>

                <p>{recetaGenerada.descripcion}</p>

                <p>
                  ⏱ {recetaGenerada.tiempoPreparacion} min · ⭐ {recetaGenerada.dificultad} · 👥{' '}
                  {recetaGenerada.porciones}
                </p>

                <h5>Ingredientes</h5>
                <ul>
                  {recetaGenerada.ingredientes.map((ingrediente, index) => (
                    <li key={index}>{mostrarIngrediente(ingrediente)}</li>
                  ))}
                </ul>

                <h5>Pasos</h5>
                <ol>
                  {recetaGenerada.pasos.map((paso, index) => (
                    <li key={index}>{paso}</li>
                  ))}
                </ol>

                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setRecetaGenerada(null)
                    setIngredientesTexto('')
                  }}
                >
                  ✨ Generar otra receta
                </button>
              </>
            ) : (
              <p>La receta generada a partir de los ingredientes ingresados aparecerá aquí.</p>
            )}
          </div>
        </form>
      </article>
    </div>
  )
}

export default GeneradorRecetaIA
