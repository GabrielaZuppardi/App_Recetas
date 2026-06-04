import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorias: [],
};

export const categoriasSlice = createSlice({
  name: "categorias",
  initialState,
  reducers: {
    agregarCategorias: (state, action) => {
      // Reemplaza todas las categorías
      state.categorias = action.payload;
    },

   
  }
});

export const { agregarCategorias } = categoriasSlice.actions;

export default categoriasSlice.reducer;