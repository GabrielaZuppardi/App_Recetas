import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { editarRecetaFormSchema } from '../../validators/receta.validators'
import api from '../../api/api'
import { useSelector, useDispatch } from 'react-redux'
import { modificarReceta } from '../../features/recetas.slice'

const ModalReceta = ({ receta, onClose, abrirEditando, onEliminar }) => {
  const [modoEdicion, setModoEdicion] = useState(false)

  const [descripcionSugerida, setDescripcionSugerida] = useState('')

  const categorias = useSelector((state) => state.categorias.categorias)

  const activarEdicion = () => {
    reset({
      titulo: receta.titulo || '',
      descripcion: receta.descripcion || '',
      dificultad: receta.dificultad || 'facil',
      tiempoPreparacion: receta.tiempoPreparacion || 1,
      porciones: receta.porciones || 1,
      categoria: receta.categoria?._id || receta.categoria || '',
      ingredientesTexto: receta.ingredientes?.join('\n') || '',
      pasosTexto: receta.pasos?.join('\n') || '',
      imagen: null
    })

    setModoEdicion(true)
  }
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(editarRecetaFormSchema)
  })

  const nombreCategoria = receta?.categoria?.nombre || categorias.find((cat) => cat._id === receta?.categoria)?.nombre || 'Sin categoría'

  const mejorarDescripcionIA = async () => {
    try {
      console.log('Click en mejorar IA')

      const respuesta = await api.post(`/recetas/${receta._id}/sugerir-descripcion`)

      console.log('Respuesta IA:', respuesta.data)

      setDescripcionSugerida(respuesta.data.descripcion)
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  const guardarCambios = async (data) => {
    try {
      const formData = new FormData()

      formData.append('titulo', data.titulo)
      formData.append('categoria', data.categoria)
      formData.append('descripcion', data.descripcion)
      formData.append('dificultad', data.dificultad)
      formData.append('tiempoPreparacion', data.tiempoPreparacion)
      formData.append('porciones', data.porciones)

      const ingredientes = data.ingredientesTexto
        .split('\n')
        .map((i) => i.trim())
        .filter((i) => i !== '')

      ingredientes.forEach((ingrediente) => {
        formData.append('ingredientes', ingrediente)
      })

      const pasos = data.pasosTexto
        .split('\n')
        .map((p) => p.trim())
        .filter((p) => p !== '')

      pasos.forEach((paso) => {
        formData.append('pasos', paso)
      })

      if (data.imagen && data.imagen.length > 0) {
        formData.append('imagen', data.imagen[0])
      }
      console.log('Imagen enviada:', data.imagen)
      const respuesta = await api.patch(`/recetas/${receta._id}`, formData)

      const recetaActualizada = respuesta.data.receta

      dispatch(modificarReceta(recetaActualizada))

      setModoEdicion(false)
      onClose()
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  useEffect(() => {
    if (receta) {
      reset({
        titulo: receta.titulo,
        descripcion: receta.descripcion,
        dificultad: receta.dificultad,
        tiempoPreparacion: receta.tiempoPreparacion,
        porciones: receta.porciones,
        categoria: receta.categoria?._id || receta.categoria,
        ingredientesTexto: receta.ingredientes.join('\n'),
        pasosTexto: receta.pasos.join('\n'),
        imagen: null
      })

      setModoEdicion(abrirEditando)
    }
  }, [receta, abrirEditando, reset])

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
            <h2>{modoEdicion ? 'Editar receta' : receta.titulo}</h2>
          </div>
        </div>

        <div className="modal-content">
          {modoEdicion ? (
            <div className="modal-edit-form">
              <label>Título</label>
              <input {...register('titulo')} />
              {errors.titulo && <span className="error">{errors.titulo.message}</span>}

              <label>
                Categoría
                <select {...register('categoria')}>
                  {categorias.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
                {errors.categoria && <span className="error">{errors.categoria.message}</span>}
              </label>

              <label>Descripción</label>
              <textarea {...register('descripcion')} />
              {errors.descripcion && <span className="error">{errors.descripcion.message}</span>}

              <label>Dificultad</label>
              <select {...register('dificultad')}>
                <option value="facil">Fácil</option>
                <option value="media">Media</option>
                <option value="dificil">Difícil</option>
              </select>

              {errors.dificultad && <span className="error">{errors.dificultad.message}</span>}

              <label>Tiempo de preparación</label>
              <input type="number" {...register('tiempoPreparacion', { valueAsNumber: true })} />
              {errors.tiempoPreparacion && <span className="error">{errors.tiempoPreparacion.message}</span>}

              <label>Porciones</label>
              <input type="number" {...register('porciones', { valueAsNumber: true })} />
              {errors.porciones && <span className="error">{errors.porciones.message}</span>}

              <label>Ingredientes</label>
              <small>Ingrese un ingrediente por línea</small>
              <textarea {...register('ingredientesTexto')} rows={6} />
              {errors.ingredientesTexto && <span className="error">{errors.ingredientesTexto.message}</span>}

              <label>Pasos</label>
              <small>Ingrese un paso por línea</small>
              <textarea {...register('pasosTexto')} rows={8} />
              {errors.pasosTexto && <span className="error">{errors.pasosTexto.message}</span>}
              <label>Imagen</label>
              <input
                type="file"
                accept="image/*"
                {...register('imagen', {
                  onChange: (e) => {
                    console.log('Archivo seleccionado:', e.target.files)
                  }
                })}
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
                      activarEdicion()
                      setValue('descripcion', descripcionSugerida)
                      setDescripcionSugerida('')
                    }}
                  >
                    Usar esta descripción
                  </button>

                  <button type="button" onClick={() => setDescripcionSugerida('')}>
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
              <button type="button" className="btn secondary" onClick={handleSubmit(guardarCambios)}>
                Guardar
              </button>

              <button type="button" className="btn secondary" onClick={() => setModoEdicion(false)}>
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn secondary" onClick={activarEdicion}>
                Editar
              </button>
              <button
                type="button"
                className="btn secondary"
                onClick={() => {
                  onEliminar(receta)
                  onClose()
                }}
              >
                Eliminar
              </button>

              <button type="button" type="button" className="btn secondary" onClick={mejorarDescripcionIA}>
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
