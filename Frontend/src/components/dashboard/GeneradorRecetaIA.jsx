import React from 'react'
import api from '../../api/api'

const GeneradorRecetaIA = () => {
    const [ingredientesTexto, setIngredientesTexto] = React.useState("")
    const [recetaGenerada, setRecetaGenerada] = React.useState(null)
    const [fallback, setFallback] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const generarRecetaIA = async () => {
        try {
            const ingredientes = ingredientesTexto
                .split(",")
                .map((i) => i.trim())
                .filter((i) => i !== "")

            const datos = {
                ingredientes,
                dificultad: "facil",
                tiempoMaximo: 30,
            }
            setLoading(true)
            setFallback(false)
            setRecetaGenerada(null)
            const respuesta = await api.post("/recetas/generar", datos)

            console.log("Respuesta IA:", respuesta.data)

            if (respuesta.data.fallback) {
                setFallback(true)
                setRecetaGenerada(null)
                return
            }

            setFallback(false)
            setRecetaGenerada(respuesta.data.receta)
        } catch (error) {
            console.log(error.response?.data || error.message)
            setFallback(true)
            setRecetaGenerada(null)
        } finally {
            setLoading(false)
        }
    }

    const mostrarIngrediente = (ingrediente) => {
        if (typeof ingrediente === "string") {
            return ingrediente
        }

        return `${ingrediente.cantidad || ""} ${ingrediente.unidad || ""} ${ingrediente.nombre || ""} ${ingrediente.preparacion || ""}`.trim()
    }

    return (
        <div className="formulario-receta">
            <article className="card">
                <div className="section-title">
                    <h3>🤖 ¿Sin ideas?</h3>
                </div>

                <form>
                    <label>
                        Dejá que la IA cree una receta simple con los ingredientes de tu heladera
                    </label>

                    <input
                        type="text"
                        placeholder="Ej. Pollo, tomate, albahaca"
                        value={ingredientesTexto}
                        onChange={(e) => setIngredientesTexto(e.target.value)}
                    />

                    <button
                        type="button"
                        className="btn"
                        style={{ width: "100%", marginBottom: 16 }}
                        onClick={generarRecetaIA}
                        disabled={loading}
                    >
                        {loading ? "Generando receta..." : "✨ Generar receta con IA"}
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
                                    ⏱ {recetaGenerada.tiempoPreparacion} min · ⭐ {recetaGenerada.dificultad} · 👥 {recetaGenerada.porciones}
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
                            </>
                        ) : (
                            <p>
                                La receta generada a partir de los ingredientes ingresados aparecerá aquí.
                            </p>
                        )}
                    </div>
                </form>
            </article>
        </div>
    )
}

export default GeneradorRecetaIA