import { useEffect, useState } from 'react'
import api from '../../../api/api'
import PlanesChart from './PlanesChart'

const DataUsuarios = () => {
  const [usuariosGraficas, setUsuariosGraficas] = useState([])

  // Obtiene todos los usuarios para las gráficas, no solo los de la página actual.
  useEffect(() => {
    api
      .get('/usuarios', {
        params: {
          page: 1,
          limit: 10000
        }
      })
      .then((res) => {
        setUsuariosGraficas(res.data.usuarios)
      })
      .catch((error) => {
        console.error('Error al obtener usuarios para gráficas:', error)
      })
  }, [])

  return <PlanesChart usuarios={usuariosGraficas} />
}

export default DataUsuarios
