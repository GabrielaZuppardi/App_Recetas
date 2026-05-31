//ACÁ ES DONDE CREO EL STORE DE REDUX, POR AHÍ VOY A AGREGAR LOS REDUCERS QUE NECESITE PARA MI APLICACIÓN
//STORE ES QUIEN NUCLEA LOS REDUCERS, ES DECIR, ES QUIEN LOS JUNTA PARA QUE DESDE CUALQUIER COMPONENTE PUEDA ACCEDER A ELLOS

import { configureStore } from "@reduxjs/toolkit";
import contadorReducer from "../features/contador.slice";
import recetasReducer from "../features/recetas.slice";

export const store = configureStore({
  reducer: {
    contador: contadorReducer,
    recetas: recetasReducer,
  },
}); 
export default store;