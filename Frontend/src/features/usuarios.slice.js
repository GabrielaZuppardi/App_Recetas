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
      // Reemplaza todos los usuarios
      state.usuarios = action.payload;
    },

    guardarUsuario: (state, action) => {
      // Agrega un usuario nuevo
      state.usuarios.push(action.payload);
    },

    guardarUsuarioLogueado: (state, action) => {
      // Guarda el usuario que inició sesión
      state.usuarioLogueado = action.payload;
    },

    cerrarSesion: (state) => {
      // Elimina el usuario logueado
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