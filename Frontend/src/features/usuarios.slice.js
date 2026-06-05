import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuarios: [],
  usuarioLogueado: null,
};

export const usuariosSlice = createSlice({
  name: "usuarios",
  initialState,
  reducers: {
    agregarUsuarios: (state, action) => {
      state.usuarios = action.payload;
    },

    guardarUsuario: (state, action) => {
      state.usuarios.push(action.payload);
    },

    guardarUsuarioLogueado: (state, action) => {
      state.usuarioLogueado = action.payload;
    },

    cerrarSesion: (state) => {
      state.usuarioLogueado = null;
    },
  },
});

export const {
  agregarUsuarios,
  guardarUsuario,
  guardarUsuarioLogueado,
  cerrarSesion,
} = usuariosSlice.actions;

export default usuariosSlice.reducer;