import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    obtenerCancionPorId,
    obtenerPlaylists,
    actualizarPlaylist,
    eliminarCancion,
} from '../servicios/api';

const CancionDetalle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cancion, setCancion] = useState(null);
    const [listas, setListas] = useState([]);
    const [listaSeleccionada, setListaSeleccionada] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const fetchDatos = async () => {
        try {
            const [resCancion, resListas] = await Promise.all([
            obtenerCancionPorId(id),
            obtenerPlaylists(),
            ]);
            setCancion(resCancion.data);
            setListas(resListas.data);
        } catch (error) {
            console.error('Error al obtener el detalle:', error);
        }
        };
        fetchDatos();
    }, [id]);

    const agregarPlaylist = async () => {
        if (!listaSeleccionada) {
        setMensaje('Selecciona una lista primero.');
        return;
        }
        const lista = listas.find((l) => l._id === listaSeleccionada);
        const yaExiste = lista.canciones?.includes(id);
        if (yaExiste) {
        setMensaje('Esta canción ya está en la lista.');
        return;
        }
        const nuevasCanciones = [...(lista.canciones || []), id];
        try {
        await actualizarPlaylist(listaSeleccionada, { canciones: nuevasCanciones });
        setMensaje(`Canción agregada a "${lista.nombre}"`);
        } catch (error) {
        console.error('Error al agregar a la lista:', error);
        setMensaje('Ocurrió un error al agregar la canción.');
        }
    };

    // Elimina la canción tras confirmación y vuelve al Home
    const handleEliminar = async () => {
        const confirmar = window.confirm('¿Seguro que deseas eliminar esta canción?');
        if (!confirmar) return;

        try {
        await eliminarCancion(id);
        navigate('/canciones'); // Home
        } catch (error) {
        console.error('Error al eliminar la canción:', error);
        setMensaje('No se pudo eliminar la canción.');
        }
    };

    if (!cancion) return <p>Cargando...</p>;

    return (
        <div className="page-container">
        <h1>{cancion.titulo}</h1>
        <p><strong>Artista:</strong> {cancion.artista}</p>
        <p><strong>Género:</strong> {cancion.genero}</p>
        <p><strong>Año de Lanzamiento:</strong> {cancion.anioLanzamiento}</p>
        <p><strong>Álbum:</strong> {cancion.album}</p>

        <div className="detail-actions">
            <Link to={`/canciones/${id}/edit`} className="btn-edit">Edit Song</Link>
            <button onClick={handleEliminar} className="btn-delete">Delete Song</button>
        </div>

        <div className="add-to-playlist">
            <select value={listaSeleccionada} onChange={(e) => setListaSeleccionada(e.target.value)}>
                <option value="">-- Selecciona una playlist --</option>
                    {listas.map((l) => (
                <option key={l._id} value={l._id}>{l.nombre}</option>
                ))}
            </select>
            <button onClick={agregarPlaylist}>Add to Playlist</button>
        </div>

        {mensaje && <p className="mensaje-info">{mensaje}</p>}
        </div>
    );
};

export default CancionDetalle;