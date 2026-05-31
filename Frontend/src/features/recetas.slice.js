import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recetas: [],
};

export const recetasSlice = createSlice({
  name: "recetas",
  initialState,
  reducers: {
    agregarReceta: (state, action) => {
      // Reemplaza todas las recetas (las que vienen de la API)
      state.recetas = action.payload;
    },

    guardarReceta: (state, action) => {
      // Agrega una receta nueva
      state.recetas.push(action.payload);
    }
  }
});

export const { agregarReceta, guardarReceta } = recetasSlice.actions;

export default recetasSlice.reducer;