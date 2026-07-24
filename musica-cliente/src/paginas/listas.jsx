import { useState, useEffect } from 'react';
import { obtenerPlaylists } from '../servicios/api';
import ListaItem from '../componentes/ListaItem';

const Playlists = () => {
    const [playlists, setPlaylists] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchPlaylists = async () => {
        try {
            const { data } = await obtenerPlaylists();
            setPlaylists(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error al obtener playlists:', error);
            setPlaylists([]);
        } finally {
            setCargando(false);
        }
        };
        fetchPlaylists();
    }, []);

    const playlistsFiltradas = playlists.filter((p) =>
        p.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="page-container">
        <h1>Todas las Listas de Reproduccion</h1>

        <input
            type="text"
            placeholder="Search playlists"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input"
        />

        {cargando ? (
            <p>Cargando listas de reproducción...</p>
        ) : playlistsFiltradas.length > 0 ? (
            <ul className="playlist-list">
            {playlistsFiltradas.map((p) => (
                <ListaItem key={p._id} lista={p} />
            ))}
            </ul>
        ) : (
            <p>No hay listas de reproduccion disponibles.</p>
        )}
        </div>
    );
};

export default Playlists;