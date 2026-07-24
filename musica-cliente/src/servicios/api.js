import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

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