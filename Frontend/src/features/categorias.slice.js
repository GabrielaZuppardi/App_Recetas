import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorias: [],
};

export const categoriasSlice = createSlice({
  name: "categorias",
  initialState,
  reducers: {
    agregarCategorias: (state, action) => {
      // Reemplaza todas las categorías.
      state.categorias = action.payload;
    },

    eliminarCategoria: (state, action) => {
      // Elimina una categoría según su id.
      state.categorias = state.categorias.filter(
        categoria => categoria._id !== action.payload
      );
    },

    editarCategoria: (state, action) => {
      // Actualiza una categoría existente dentro del listado.
      state.categorias = state.categorias.map(categoria =>
        categoria._id === action.payload._id ? action.payload : categoria
      );
    }
  }
});

export const {
  agregarCategorias,
  eliminarCategoria,
  editarCategoria
} = categoriasSlice.actions;

export default categoriasSlice.reducer;