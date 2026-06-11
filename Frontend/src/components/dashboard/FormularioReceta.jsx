import { useState } from 'react'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import { crearRecetaSchema } from '../../validators/receta.validators'
import api from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { guardarReceta } from '../../features/recetas.slice'
//FormularioReceta.jsx → usa categorías del store //FormularioReceta solo las lee con useSelector.

const CrearRecetaForm = () => {
  const dispatch = useDispatch()
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
 const [mensajeExito, setMensajeExito] = useState('')
  const categorias = useSelector((state) => state.categorias.categorias)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isValid }
  } = useForm({
    resolver: joiResolver(crearRecetaSchema),
    mode: 'onChange'
  })

  const procesarForm = async (data) => {
    try {
      // Construir FormData para enviar multipart/form-data (incluye el archivo)
      const formData = new FormData()

      formData.append('titulo', data.titulo)
      formData.append('descripcion', data.descripcion)
      formData.append('tiempoPreparacion', data.tiempoPreparacion)
      formData.append('dificultad', data.dificultad)
      formData.append('porciones', data.porciones)
      formData.append('categoria', data.categoria)

      // Ingredientes y pasos: enviar cada elemento como campo repetido para que multer los reciba como array
      const ingredientesArr = (data.ingredientes || '')
        .split(',')
        .map((i) => i.trim())
        .filter((i) => i !== '')
      ingredientesArr.forEach((i) => formData.append('ingredientes', i))

      const pasosArr = (data.pasos || '')
        .split(',')
        .map((p) => p.trim())
        .filter((p) => p !== '')
      pasosArr.forEach((p) => formData.append('pasos', p))

      // Archivo (campo 'imagen') — register('imagen') devuelve FileList
      if (data.imagen && data.imagen.length > 0) {
        formData.append('imagen', data.imagen[0])
      }

      const respuesta = await api.post('/recetas', formData)

      console.log('RECETA CREADA')
      console.log(respuesta.data)
      dispatch(guardarReceta(respuesta.data.receta))
      setMensajeExito('Receta creada con éxito.')
      reset() // Limpiar formulario
    } catch (error) {
      setMensajeExito('')
      setError('root', {
        type: 'manual',
        message:
          error.response?.data?.mensaje ||
          error.response?.data?.message ||
          'No se pudo crear la receta'
      })

      console.log(error.response?.data || error.message)
    }
  }
  return (
    <article className="card">
      <div
        className="section-title"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        style={{ cursor: 'pointer' }}
      >
        <h3>{mostrarFormulario ? '➖ Ocultar formulario' : '➕ Crear nueva receta'}</h3>
      </div>

      {mostrarFormulario && (
        <form onSubmit={handleSubmit(procesarForm)}>
          <label>Título de la receta</label>
          <input type="text" placeholder="Ej. Pasta cremosa con tomates" {...register('titulo')} />
          {errors.titulo && <span className="error">{errors.titulo.message}</span>}
          <div className="two-cols">
            <div>
              <label>Categoría</label>

              <select {...register('categoria')}>
                <option value="">Seleccionar categoría</option>

                {categorias.map((categoria) => (
                  <option key={categoria._id} value={categoria._id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>

              {errors.categoria && <span className="error">{errors.categoria.message}</span>}
            </div>

            <div>
              <label>Dificultad</label>
              <select {...register('dificultad')}>
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
              <input type="number" {...register('tiempoPreparacion', { valueAsNumber: true })} />
              {errors.tiempoPreparacion && (
                <span className="error">{errors.tiempoPreparacion.message}</span>
              )}
            </div>

            <div>
              <label>Porciones</label>
              <input type="number" {...register('porciones', { valueAsNumber: true })} />
              {errors.porciones && <span className="error">{errors.porciones.message}</span>}
            </div>
          </div>

          <label>Ingredientes</label>
          <textarea
            {...register('ingredientes')}
            placeholder="Ej. 200 g de pasta, 2 tomates, albahaca fresca..."
            defaultValue=""
          />
          {errors.ingredientes && <span className="error">{errors.ingredientes.message}</span>}

          <label>Pasos</label>
          <textarea
            {...register("pasos")}
            placeholder="Ej. Hervir la pasta, Preparar la salsa, Mezclar y servir."
            defaultValue=""
          />
          {errors.pasos && <span className="error">{errors.pasos.message}</span>}

          <label>Descripción</label>
          <textarea
            {...register('descripcion')}
            placeholder="Describí la preparación..."
            defaultValue=""
          />
          {errors.descripcion && <span className="error">{errors.descripcion.message}</span>}

          <label>Imagen</label>
          <input type="file" accept="image/*" {...register('imagen')} />


          {errors.imagen && <span className="error">{errors.imagen.message}</span>}

          {errors.root && (
            <span className="error">{errors.root.message}</span>
          )}

          {mensajeExito && (
  <span className="success-message">{mensajeExito}</span>
)}

          <button className="btn" type="submit" style={{ width: '100%' }}>
            Guardar receta
          </button>
        </form>
      )}
    </article>
  )
}

export default CrearRecetaForm
