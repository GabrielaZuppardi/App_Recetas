//LA ÚNICA RESPONSABILIDAD DE ESTE ARCHIVO ES CONFIGURAR LA INSTANCIA DE AXIOS PARA HACER LAS PETICIONES AL BACKEND

import axios from "axios";

const api = axios.create({
    baseURL: 'https://obligatorio-fullstack-mu.vercel.app/v1',         

});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;