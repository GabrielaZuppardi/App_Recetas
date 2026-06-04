import axios from 'axios';

const api = axios.create({
    baseURL: 'https://obligatorio-fullstack-mu.vercel.app/v1',         

});

export default api;