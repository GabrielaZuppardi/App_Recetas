import React from 'react'
import BarraNavegacion from './BarraNavegacion'
import Membresia from './Membresia'
import Contenido from './Contenido'
import Estadisticas from './Estadisticas'
import Cuenta from './Cuenta'
import BotonIncrementar from './BotonIncrementar'

const Dashboard = () => {
  return (
    <>
      <BarraNavegacion />
      {/*<Cuenta/>
      <BotonIncrementar/>*/}
      <Membresia />
      <Contenido />
      <Estadisticas />
    </>
  )
}

export default Dashboard