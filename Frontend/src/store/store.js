//ACÁ ES DONDE CREO EL STORE DE REDUX, POR AHÍ VOY A AGREGAR LOS REDUCERS QUE NECESITE PARA MI APLICACIÓN
//STORE ES QUIEN NUCLEA LOS REDUCERS, ES DECIR, ES QUIEN LOS JUNTA PARA QUE DESDE CUALQUIER COMPONENTE PUEDA ACCEDER A ELLOS

import { configureStore } from '@reduxjs/toolkit'
import recetasReducer from '../features/recetas.slice'
import usuariosReducer from '../features/usuarios.slice'
import categoriasReducer from '../features/categorias.slice'

export const store = configureStore({
  reducer: {
    recetas: recetasReducer,
    usuarios: usuariosReducer,
    categorias: categoriasReducer
  }
})

export default store
