import React, { useState } from 'react'
import api from '../../../api/api'
import { useDispatch } from 'react-redux'
import { agregarCategorias } from '../../../features/categorias.slice'
import CrearCategoriaForm from './CrearCategoriaForm'

const CrearCategoria = () => {

  const dispatch = useDispatch()

  // Estados del formulario de creación de categoría.
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')

  // Envía los datos al backend para crear una nueva categoría.
  const crearCategoria = (e) => {
    e.preventDefault()

    const nuevaCategoria = {
      nombre,
      descripcion
    }

    api.post('/categorias', nuevaCategoria)
      .then(() => {
        // Luego de crear la categoría, vuelve a obtener el listado completo desde el backend.
        return api.get('/categorias')
      })
      .then(res => {
        const listaCategorias = res.data.categorias || res.data

        // Actualiza la lista global de categorías en Redux.
        dispatch(agregarCategorias(listaCategorias))

        // Limpia los campos del formulario.
        setNombre('')
        setDescripcion('')
      })
      .catch(err => {
        console.error('Error al crear categoría:', err.response?.data || err.message)
      })
  }

  return (
    <section className="admin-card">
      <h2>Crear categoría</h2>

      <CrearCategoriaForm
        nombre={nombre}
        setNombre={setNombre}
        descripcion={descripcion}
        setDescripcion={setDescripcion}
        crearCategoria={crearCategoria}
      />
    </section>
  )
}

export default CrearCategoria