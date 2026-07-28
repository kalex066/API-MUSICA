import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

// Interceptor de REQUEST: agrega el token a cada petición saliente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token_usuario');
  if (token) {
    config.headers['token_usuario'] = token;
  }
  return config;
});

// Interceptor de RESPONSE: si el token es inválido/expiró (401), redirige al login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token_usuario');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Autenticación
export const registrarUsuario = (datos) => api.post('/registro', datos);
export const iniciarSesion = (datos) => api.post('/login', datos);

// Canciones
export const obtenerCanciones = () => api.get('/canciones');
export const obtenerCancionPorId = (id) => api.get(`/canciones/${id}`);
export const crearCancion = (cancion) => api.post('/canciones', cancion);
export const actualizarCancion = (id, cancion) => api.put(`/canciones/${id}`, cancion);
export const eliminarCancion = (id) => api.delete(`/canciones/${id}`);

// Playlists
export const obtenerPlaylists = () => api.get('/listas');
export const obtenerPlaylistPorId = (id) => api.get(`/listas/${id}`);
export const crearPlaylist = (playlist) => api.post('/listas', playlist);
export const actualizarPlaylist = (id, playlist) => api.put(`/listas/${id}`, playlist);
export const eliminarPlaylist = (id) => api.delete(`/listas/${id}`);

export default api;