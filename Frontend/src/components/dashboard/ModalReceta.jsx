import React from "react"
import api from "../../api/api"
import { useSelector, useDispatch } from "react-redux"
import { modificarReceta } from "../../features/recetas.slice"

const ModalReceta = ({ receta, onClose, abrirEditando, onEliminar }) => {
    const [modoEdicion, setModoEdicion] = React.useState(false)

    const [titulo, setTitulo] = React.useState("")
    const [descripcion, setDescripcion] = React.useState("")
    const [dificultad, setDificultad] = React.useState("")
    const [tiempoPreparacion, setTiempoPreparacion] = React.useState("")
    const [porciones, setPorciones] = React.useState("")
    const [categoria, setCategoria] = React.useState("")
    const [ingredientesTexto, setIngredientesTexto] = React.useState("")
    const [pasosTexto, setPasosTexto] = React.useState("")
    const [descripcionSugerida, setDescripcionSugerida] = React.useState("")

    const categorias = useSelector((state) => state.categorias.categorias)
    const dispatch = useDispatch()

    const nombreCategoria =
        receta?.categoria?.nombre ||
        categorias.find((cat) => cat._id === receta?.categoria)?.nombre ||
        "Sin categoría"

    const mejorarDescripcionIA = async () => {
        try {
            console.log("Click en mejorar IA")

            const respuesta = await api.post(
                `/recetas/${receta._id}/sugerir-descripcion`
            )

            console.log("Respuesta IA:", respuesta.data)

            setDescripcionSugerida(respuesta.data.descripcion)
        } catch (error) {
            console.log(error.response?.data || error.message)
        }
    }

    const guardarCambios = async () => {
        try {
            const datosActualizados = {
                titulo,
                categoria,
                descripcion,
                dificultad,
                tiempoPreparacion: Number(tiempoPreparacion),
                porciones: Number(porciones),
                ingredientes: ingredientesTexto
                    .split("\n")
                    .map((i) => i.trim())
                    .filter((i) => i !== ""),
                pasos: pasosTexto
                    .split("\n")
                    .map((p) => p.trim())
                    .filter((p) => p !== ""),
            }

            const respuesta = await api.patch(
                `/recetas/${receta._id}`,
                datosActualizados
            )

            const recetaActualizada = respuesta.data.receta

            dispatch(modificarReceta(recetaActualizada))

            setModoEdicion(false)
            onClose()
        } catch (error) {
            console.log(error.response?.data || error.message)
        }
    }

    React.useEffect(() => {
        if (receta) {
            setTitulo(receta.titulo)
            setDescripcion(receta.descripcion)
            setDificultad(receta.dificultad)
            setTiempoPreparacion(receta.tiempoPreparacion)
            setPorciones(receta.porciones)
            setCategoria(receta.categoria?._id || receta.categoria || "")
            setIngredientesTexto(receta.ingredientes.join("\n"))
            setPasosTexto(receta.pasos.join("\n"))
            setModoEdicion(abrirEditando)
        }
    }, [receta, abrirEditando])

    if (!receta) return null

    return (
        <div className="modal-overlay">
            <div className="modal-receta">
                <button className="modal-close" onClick={onClose}>
                    ×
                </button>

                <div className="modal-hero">
                    <img src={receta.imagenUrl} alt={receta.titulo} />

                    <div className="modal-hero-text">
                        <h2>{modoEdicion ? "Editar receta" : receta.titulo}</h2>
                    </div>
                </div>

                <div className="modal-content">
                    {modoEdicion ? (
                        <div className="modal-edit-form">
                            <label>Título</label>
                            <input
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />

                            <label>Categoría</label>
                            <select
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                            >
                                {categorias.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.nombre}
                                    </option>
                                ))}
                            </select>

                            <label>Descripción</label>
                            <textarea
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />

                            <label>Dificultad</label>
                            <select
                                value={dificultad}
                                onChange={(e) => setDificultad(e.target.value)}
                            >
                                <option value="facil">Fácil</option>
                                <option value="media">Media</option>
                                <option value="dificil">Difícil</option>
                            </select>

                            <label>Tiempo de preparación</label>
                            <input
                                type="number"
                                value={tiempoPreparacion}
                                onChange={(e) => setTiempoPreparacion(e.target.value)}
                            />

                            <label>Porciones</label>
                            <input
                                type="number"
                                value={porciones}
                                onChange={(e) => setPorciones(e.target.value)}
                            />

                            <label>Ingredientes</label>
                            <small>Ingrese un ingrediente por línea</small>
                            <textarea
                                value={ingredientesTexto}
                                onChange={(e) => setIngredientesTexto(e.target.value)}
                                rows={6}
                            />

                            <label>Pasos</label>
                            <small>Ingrese un paso por línea</small>
                            <textarea
                                value={pasosTexto}
                                onChange={(e) => setPasosTexto(e.target.value)}
                                rows={8}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="modal-stats">
                                <div>
                                    <small>Categoría</small>
                                    <strong>{nombreCategoria}</strong>
                                </div>

                                <div>
                                    <small>Dificultad</small>
                                    <strong>{receta.dificultad}</strong>
                                </div>

                                <div>
                                    <small>Tiempo</small>
                                    <strong>{receta.tiempoPreparacion} min</strong>
                                </div>

                                <div>
                                    <small>Porciones</small>
                                    <strong>{receta.porciones}</strong>
                                </div>
                            </div>

                            <h3>Descripción</h3>
                            <p className="modal-description">{receta.descripcion}</p>
                            {descripcionSugerida && (
                                <div className="ia-sugerencia">
                                    <h4>Sugerencia de IA</h4>

                                    <p>{descripcionSugerida}</p>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setDescripcion(descripcionSugerida)
                                            setDescripcionSugerida("")
                                            setModoEdicion(true)
                                        }}
                                    >
                                        Usar esta descripción
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setDescripcionSugerida("")}
                                    >
                                        Descartar
                                    </button>
                                </div>
                            )}

                            <h3>Ingredientes</h3>
                            <ul className="modal-list">
                                {receta.ingredientes.map((ingrediente, index) => (
                                    <li key={index}>{ingrediente}</li>
                                ))}
                            </ul>

                            <h3>Pasos</h3>
                            <ul className="modal-steps">
                                {receta.pasos.map((paso, index) => (
                                    <li key={index}>
                                        <span>{index + 1}</span>
                                        <p>{paso}</p>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>

                <div className="modal-actions">
                    {modoEdicion ? (
                        <>
                            <button type="button" onClick={guardarCambios}>
                                Guardar
                            </button>

                            <button type="button" onClick={() => setModoEdicion(false)}>
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <button type="button" onClick={() => setModoEdicion(true)}>
                                Editar
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    onEliminar(receta._id)
                                    onClose()
                                }}
                            >
                                Eliminar
                            </button>

                            <button type="button" onClick={mejorarDescripcionIA}>
                                Mejorar con IA
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ModalReceta