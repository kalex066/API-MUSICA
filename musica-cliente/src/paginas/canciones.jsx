import { useState, useEffect } from 'react';
import { obtenerCanciones } from '../servicios/api';
import CancionItem from '../componentes/CancionItem';

const Canciones = () => {
    const [canciones, setCanciones] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [cargando, setCargando] = useState(true);

  // Cargar canciones al montar el componente
    useEffect(() => {
        const fetchCanciones = async () => {
        try {
            const { data } = await obtenerCanciones();
            setCanciones(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error al obtener las canciones:', error);
            setCanciones([]);
        } finally {
            setCargando(false);
        }
        };
        fetchCanciones();
    }, []);

  // Filtro que compara el texto de búsqueda contra título, artista y género
    const cancionesFiltradas = canciones.filter((cancion) => {
        const texto = busqueda.toLowerCase();
        return (
        cancion.titulo?.toLowerCase().includes(texto) ||
        cancion.artista?.toLowerCase().includes(texto) ||
        cancion.genero?.toLowerCase().includes(texto)
        );
    });

    return (
        <div className="page-container">
        <h1>Todas las Canciones</h1>

        <input
            type="text"
            placeholder="Busca canciones por nombre, artista o genero"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input"
        />
        {cargando ? (
            <p>Cargando canciones...</p>
        ) : cancionesFiltradas.length > 0 ? (
            <ul className="song-list">
            {cancionesFiltradas.map((cancion) => (
                <CancionItem key={cancion._id} cancion={cancion} />
            ))}
            </ul>
        ) : (
            <p>No hay canciones que coincidan con la búsqueda.</p>
        )}
        </div>
    );
    };

export default Canciones;