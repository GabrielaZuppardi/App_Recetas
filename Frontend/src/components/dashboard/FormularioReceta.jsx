
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import { crearRecetaSchema } from '../../validators/receta.validators'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { guardarReceta } from '../../features/recetas.slice'



const CrearRecetaForm = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm({
    resolver: joiResolver(crearRecetaSchema),
    mode: "onChange"
  });

const procesarForm = async (data) => {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMWM5MzE1YTdmMTg1NTA5N2NkNWFhMiIsImVtYWlsIjoicGx1c18xNzgwMjU3NTU3NzAzQG1haWwuY29tIiwicm9sIjoidXN1YXJpbyIsImlhdCI6MTc4MDI1NzU1NywiZXhwIjoxNzgwMzQzOTU3fQ.tJwWqaQHmmj8GlmjZ4MF1TL_iQtRew97Xe_Vx-A3sQQ"
    const recetaParaEnviar = {
      ...data,
      ingredientes: data.ingredientes
        .split(",")
        .map(i => i.trim())
        .filter(i => i !== ""),

      pasos: data.pasos
        .split(",")
        .map(p => p.trim())
        .filter(p => p !== "")
    };

    const respuesta = await axios.post(
      "http://localhost:3000/v1/recetas",
      recetaParaEnviar,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("RECETA CREADA");
    console.log(respuesta.data);
dispatch(guardarReceta(respuesta.data))
  } catch (error) {
    console.log(error.response?.data);
  }
};
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

        <input type="text" placeholder="Ej. Pollo, tomate, albahaca" />

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

    <article className="card">
      <div className="section-title">
        <h3>➕ Crear nueva receta</h3>
      </div>

      <form onSubmit={handleSubmit(procesarForm)}>
        <label>Título de la receta</label>
        <input
          type="text"
          placeholder="Ej. Pasta cremosa con tomates"
          {...register("titulo")}
        />
  {errors.titulo && <span className="error">{errors.titulo.message}</span>}
        <div className="two-cols">
          <div>
            <label>Categoría</label>
             <select {...register("categoria")}>
              <option value="">Seleccionar categoría</option>
        <option value="69e9a399573aa09bced00c25">Desayunos</option>
        <option value="Carnes">Carnes</option>
        <option value="Pescados">Pescados</option>
        <option value="Postres">Postres</option>
      </select>
            {errors.categoria && <span className="error">{errors.categoria.message}</span>}   
          </div>

          <div>
            <label>Dificultad</label>
            <select {...register("dificultad")}>
              <option value="">Seleccionar dificultad</option>
              <option value="facil">Fácil</option>
              <option value="media">Media</option>
              <option value="dificil">Difícil</option>
            </select>
            {errors.dificultad && <span className="error">{errors.dificultad.message}</span>}
          </div>
        </div>

        <div className="two-cols">
          <div>
            <label>Tiempo</label>
            <input
              type="number"
              defaultValue={30}
                 {...register("tiempoPreparacion", { valueAsNumber: true })}
            />
              {errors.tiempoPreparacion && <span className="error">{errors.tiempoPreparacion.message}</span>}
          </div>

          <div>
            <label>Porciones</label>
            <input
              type="number"
              defaultValue={2}
              {...register("porciones", { valueAsNumber: true })}
            />
              {errors.porciones && <span className="error">{errors.porciones.message}</span>} 
            
          </div>
        </div>

        <label>Ingredientes</label>
        <textarea
          {...register("ingredientes")}
          placeholder="Ej. 200 g de pasta, 2 tomates, albahaca fresca..."
          defaultValue=""
        />
        {errors.ingredientes && <span className="error">{errors.ingredientes.message}</span>}

        <label>Pasos</label>
        <textarea
          {...register("pasos")   }
          placeholder="Ej. 1. Hervir la pasta. 2. Preparar la salsa. 3. Mezclar y servir."
          defaultValue=""
        />
        {errors.pasos && <span className="error">{errors.pasos.message}</span>}

        <label>Descripción</label>
        <textarea
          {...register("descripcion")             }
          placeholder="Describí la preparación..."
          defaultValue=""
        />
        {errors.descripcion && <span className="error">{errors.descripcion.message}</span>}

        <label>URL de imagen</label>
        <input
          type="url"
          placeholder="https://ejemplo.com/imagen.jpg"
          {...register("imageUrl")}
        />
        {errors.imageUrl && <span className="error">{errors.imageUrl.message}</span>}

        <button
          type="submit"
         
          style={{ width: "100%" }}
        >
          Guardar receta
        </button>
      </form>
    </article>

  </div>
)
}

export default CrearRecetaForm