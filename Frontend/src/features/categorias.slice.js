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

    guardarCategoria: (state, action) => {
      // Agrega una categoría nueva
      state.categorias.push(action.payload);
    },
  },
});

export const { agregarCategorias, guardarCategoria } = categoriasSlice.actions;

export default categoriasSlice.reducer;