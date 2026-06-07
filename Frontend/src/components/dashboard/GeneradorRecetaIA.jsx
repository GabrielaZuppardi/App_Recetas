import React from 'react'

const GeneradorRecetaIA = () => {


    const [ingredientesTexto, setIngredientesTexto] = React.useState("")

console.log(ingredientesTexto)


    return (
        <div className="formulario-receta">

            <article className="card">
                <div className="section-title">
                    <h3>🤖 ¿Sin ideas?</h3>
                </div>

                <form>
                    <label>
                        Dejá que la IA te sugiera una receta con los ingredientes de tu heladera
                    </label>

                    <input type="text" placeholder="Ej. Pollo, tomate, albahaca"
                        value={ingredientesTexto}
                        onChange={(e) => setIngredientesTexto(e.target.value)} />

                    <button
                        type="button"
                        className="btn"
                        style={{ width: "100%", marginBottom: 16 }}
                    >
                        ✨ Generar receta con IA
                    </button>

                    <div className="ai-result">
                        <p>
                            La receta generada a partir de los ingredientes ingresados aparecerá aquí.
                        </p>
                    </div>
                </form>
            </article>
        </div>
    )
}

export default GeneradorRecetaIA






