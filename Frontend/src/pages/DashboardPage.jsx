
import BarraNavegacion from '../components/dashboard/BarraNavegacion'
import Membresia from '../components/dashboard/Membresia'
import Contenido from '../components/dashboard/Contenido'
import Estadisticas from '../components/dashboard/Estadisticas'



const DashboardPage = () => {
  return (
    <>
      <BarraNavegacion />
         <Membresia />
      <Contenido />
      <Estadisticas />
    </>
  )
}

export default DashboardPage


