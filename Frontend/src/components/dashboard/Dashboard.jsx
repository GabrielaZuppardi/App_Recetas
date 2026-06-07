
//Dashboard.jsx → estructura visual del dashboard

import FormularioReceta from './FormularioReceta'
import MisRecetas from './MisRecetas'
import Membresia from './Membresia'
import Estadisticas from './Estadisticas'
import GeneradorRecetaIA from './GeneradorRecetaIA'


const Dashboard = () => {


  return (
    <>
      <Membresia />
      <div className="grid">
        <div>
          <GeneradorRecetaIA />
          <FormularioReceta />
        </div>

        <MisRecetas />
      </div>

      <Estadisticas />
    </>
  )
}

export default Dashboard