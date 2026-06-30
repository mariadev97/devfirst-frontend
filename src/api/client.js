import axios from "axios";

// La URL del backend. En local apunta a tu servidor Express;
// cuando despleguemos, cambiaremos esto a la URL de producción (Render).
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// Antes de cada petición, si hay un token guardado, lo añadimos
// automáticamente en el header Authorization. Así no hay que
// repetirlo manualmente en cada llamada.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("devfirst_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
