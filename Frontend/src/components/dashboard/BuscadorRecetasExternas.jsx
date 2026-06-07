import React from 'react'
import api from '../../api/api'
import TarjetaRecetaExterna from './TarjetaRecetaExterna'

const BuscadorRecetasExternas = () => {
    const [query, setQuery] = React.useState("")
    const [maxReadyTime, setMaxReadyTime] = React.useState("")
    const [recetasExternas, setRecetasExternas] = React.useState([])
    const [total, setTotal] = React.useState(0)
    const [loading, setLoading] = React.useState(false)

    const buscarRecetaExterna = async () => {
        try {
            setLoading(true)

            const datos = {
                query: query || undefined,
                maxReadyTime: maxReadyTime || undefined,
            }

            const respuesta = await api.get("/recetas/externas", {
                params: datos,
            })

            console.log(respuesta.data)

            setRecetasExternas(respuesta.data.resultados)
            setTotal(respuesta.data.total)
        } catch (error) {
            console.log(error.response?.data || error.message)
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

            <p className="muted">
                Buscá inspiración en recetas externas según ingredientes o nombre.
            </p>

            <input
                type="text"
                placeholder="Ej. pasta, pollo, ensalada"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <select
                value={maxReadyTime}
                onChange={(e) => setMaxReadyTime(e.target.value)}
            >
                <option value="">Cualquier tiempo</option>
                <option value="15">Hasta 15 min</option>
                <option value="30">Hasta 30 min</option>
                <option value="60">Hasta 60 min</option>
            </select>
            <button
                type="button"
                 className="btn"
                  style={{ width: "25%", marginBottom: 16 }}
                onClick={buscarRecetaExterna}
                disabled={loading}
            >
                {loading ? "Buscando..." : "🔍 Buscar recetas"}
            </button>

            {recetasExternas.length > 0 && (
                <p className="muted">
                    Se encontraron {total} recetas. Mostrando {recetasExternas.length}.
                </p>
            )}

            {recetasExternas.length > 0 && (
                <div className="external-results">
                    {recetasExternas.map((receta) => (
                        <TarjetaRecetaExterna
                            key={receta.id}
                            receta={receta}
                        />
                    ))}
                </div>
            )}

        </article>
    )
}

export default BuscadorRecetasExternas