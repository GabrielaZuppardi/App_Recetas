import React from 'react'
import BarraNavegacion from './BarraNavegacion'
import Membresia from './Membresia'
import Contenido from './Contenido'
import Estadisticas from './Estadisticas'

const Dashboard = () => {
  return (
    <>
      <BarraNavegacion />
      <Membresia />
      <Contenido />
      <Estadisticas />
    </>
  )
}

export default Dashboard