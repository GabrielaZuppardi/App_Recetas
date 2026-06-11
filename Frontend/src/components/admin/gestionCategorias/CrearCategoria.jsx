import { useState } from 'react'
import api from '../../../api/api'
import { useDispatch } from 'react-redux'
import { agregarCategorias } from '../../../features/categorias.slice'
import CrearCategoriaForm from './CrearCategoriaForm'

const CrearCategoria = () => {
  const dispatch = useDispatch()
  const [mensajeExito, setMensajeExito] = useState('')

  const crearCategoria = (nuevaCategoria, setError, reset) => {
    api
      .post('/categorias', nuevaCategoria)
      .then(() => {
        return api.get('/categorias')
      })
      .then((res) => {
        const listaCategorias = res.data.categorias || res.data

        dispatch(agregarCategorias(listaCategorias))
        setMensajeExito('Categoria creada correctamente')

        reset()
        setTimeout(() => {
          setMensajeExito('')
        }, 1500)
      })
      .catch((err) => {
        setError('root', {
          type: 'manual',
          message: err.response?.data?.message || 'No se pudo crear la categoría'
        })

        console.error('Error al crear categoría:', err)
      })
  }

  return (
    <section className="admin-card">
      <h2>Crear categoría</h2>

      <CrearCategoriaForm crearCategoria={crearCategoria} mensajeExito={mensajeExito} />
    </section>
  )
}

export default CrearCategoria
