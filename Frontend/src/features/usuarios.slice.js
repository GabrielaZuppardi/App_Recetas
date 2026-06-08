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

    guardarUsuarioLogueado: (state, action) => {
      state.usuarioLogueado = action.payload;
    }, //si bien guardamos la sesion con localStorage, mantenemos esto para que se renderice el cambio en la UI al pasar a premium en Membresía.jsx

    cerrarSesion: (state) => {
      state.usuarioLogueado = null;
    }, //aunque también se borra la sesión del localStorage, esto es para mantener coherencia con guardarUsuarioLogueado.

    eliminarUsuario: (state, action) => {
      state.usuarios = state.usuarios.filter(
        usuario => usuario._id !== action.payload
      )
    },

    editarUsuario: (state, action) => {
      const usuarioActualizado = action.payload;

      const index = state.usuarios.findIndex(
        usuario => usuario._id === usuarioActualizado._id
      );

      if (index !== -1) {
        state.usuarios[index] = usuarioActualizado;
      }
    }
  },
});

export const {
  agregarUsuarios,
  guardarUsuarioLogueado,
  cerrarSesion,
  eliminarUsuario,
  editarUsuario
} = usuariosSlice.actions;

export default usuariosSlice.reducer;