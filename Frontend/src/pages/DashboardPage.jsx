//DashboardPage.jsx → lógica de página / carga datos globales
//DashboardPage carga las categorías y las guarda con dispatch en el store para que estén disponibles en todo el dashboard, incluyendo el formulario de creación de recetas
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { agregarCategorias } from "../features/categorias.slice"
import api from "../api/api"

import BarraNavegacion from '../components/dashboard/BarraNavegacion'
import Membresia from '../components/dashboard/Membresia'
import Contenido from '../components/dashboard/Contenido'
import Estadisticas from '../components/dashboard/Estadisticas'
import Dashboard from "../components/dashboard/Dashboard"



const DashboardPage = () => {
const dispatch = useDispatch()

useEffect(() => {
  api.get("/categorias")
    .then((r) => {
      console.log("CATEGORIAS DEL BACKEND", r.data)
      dispatch(agregarCategorias(r.data.categorias || r.data))
    })
    .catch((error) => {
      console.log(error.response?.data || error.message)
    })
}, [])

  return (
    <>
     <Dashboard />
    </>
  )
}

export default DashboardPage


