import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    obtenerCanciones,
    obtenerPlaylistPorId,
    crearPlaylist,
    actualizarPlaylist,
} from '../servicios/api';

const EditarPlaylist = () => {
    const { id } = useParams();
    const esEdicion = Boolean(id);
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [todasLasCanciones, setTodasLasCanciones] = useState([]);
    const [seleccionadas, setSeleccionadas] = useState([]);
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchDatos = async () => {
        try {
            const { data: canciones } = await obtenerCanciones();
            setTodasLasCanciones(canciones);

            if (esEdicion) {
            const { data: lista } = await obtenerPlaylistPorId(id);
            setNombre(lista.nombre);
            setSeleccionadas(lista.canciones.map((c) => c._id || c));
            }
        } catch (error) {
            console.error('Error al cargar datos del editor:', error);
        } finally {
            setCargando(false);
        }
        };
        fetchDatos();
    }, [id, esEdicion]);

    const toggleCancion = (cancionId) => {
        setSeleccionadas((prev) =>
        prev.includes(cancionId)
            ? prev.filter((sid) => sid !== cancionId)
            : [...prev, cancionId]
        );
    };

    // Validar nombre 
    const validar = () => {
        const nuevosErrores = {};
        if (!nombre.trim()) nuevosErrores.nombre = 'El nombre de la playlist es obligatorio';
        return nuevosErrores;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const erroresEncontrados = validar();
        setErrores(erroresEncontrados);
        if (Object.keys(erroresEncontrados).length > 0) return;

        const datosLista = { nombre, canciones: seleccionadas };

        try {
        if (esEdicion) {
            await actualizarPlaylist(id, datosLista);
        } else {
            await crearPlaylist(datosLista);
        }
        navigate('/listas');
        } catch (error) {
        console.error('Error al guardar la playlist:', error);
        setErrores({ general: 'No se pudo guardar la playlist. Intenta de nuevo.' });
        }
    };

    if (cargando) return <p>Cargando...</p>;

    return (
        <div className="page-container">
        <h1>{esEdicion ? 'Editar Playlist' : 'Crear Nueva Playlist'}</h1>

        {errores.general && <p className="error-general">{errores.general}</p>}
        {errores.nombre && <span className="error-mensaje">{errores.nombre}</span>}

        <form onSubmit={handleSubmit} noValidate>
            <label>Nombre de la Playlist:</label>
            <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            />

            <h2>Canciones</h2>
            <div className="checklist">
            {todasLasCanciones.map((cancion) => (
                <label key={cancion._id} className="checklist-item">
                <input
                    type="checkbox"
                    checked={seleccionadas.includes(cancion._id)}
                    onChange={() => toggleCancion(cancion._id)}
                />
                {cancion.titulo}
                </label>
            ))}
            </div>

            <button type="submit">
            {esEdicion ? 'Guardar Cambios' : 'Crear Playlist'}
            </button>
        </form>
        </div>
    );
};

export default EditarPlaylist;