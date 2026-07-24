import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { obtenerPlaylistPorId, eliminarPlaylist } from '../servicios/api';

const PlaylistDetalle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lista, setLista] = useState(null);

    useEffect(() => {
        const fetchLista = async () => {
        try {
            const { data } = await obtenerPlaylistPorId(id);
            setLista(data);
        } catch (error) {
            console.error('Error al obtener la lista:', error);
        }
        };
        fetchLista();
    }, [id]);

    const handleEliminar = async () => {
        const confirmar = window.confirm('¿Seguro que deseas eliminar esta playlist?');
        if (!confirmar) return;

        try {
        await eliminarPlaylist(id);
        navigate('/listas'); // Redirige al Home tras eliminar
        } catch (error) {
        console.error('Error al eliminar la playlist:', error);
        }
    };

    if (!lista) return <p>Cargando...</p>;

    return (
        <div className="page-container">
        <h1>{lista.nombre}</h1>

        <h2>Songs</h2>
        {lista.canciones?.length > 0 ? (
            <ul className="song-list">
            {lista.canciones.map((cancion) => (
                <li key={cancion._id || cancion}>{cancion.titulo || cancion}</li>
            ))}
            </ul>
        ) : (
            <p>Esta playlist todavía no tiene canciones.</p>
        )}

        <div className="detail-actions">
            <Link to={`/listas/${id}/edit`} className="btn-edit">Editar Playlist</Link>
            <button onClick={handleEliminar} className="btn-delete">Eliminar Playlist</button>
        </div>
        </div>
    );
};

export default PlaylistDetalle;