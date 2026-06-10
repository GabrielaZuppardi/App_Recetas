import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  recetas: []
}

export const recetasSlice = createSlice({
  name: 'recetas',
  initialState,
  reducers: {
    agregarReceta: (state, action) => {
      // Reemplaza todas las recetas (las que vienen de la API)
      state.recetas = action.payload
    },

    guardarReceta: (state, action) => {
      // Agrega una receta nueva
      state.recetas.push(action.payload)
    },
    eliminarReceta: (state, action) => {
      state.recetas = state.recetas.filter((receta) => receta._id !== action.payload)
    },
    modificarReceta: (state, action) => {
      state.recetas = state.recetas.map((receta) =>
        receta._id === action.payload._id ? action.payload : receta
      )
    }
  }
})

export const { agregarReceta, guardarReceta, eliminarReceta, modificarReceta } =
  recetasSlice.actions

export default recetasSlice.reducer
