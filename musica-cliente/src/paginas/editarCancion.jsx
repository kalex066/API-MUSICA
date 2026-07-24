import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerCancionPorId, actualizarCancion } from '../servicios/api';

    const EditarCancion = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [cancion, setCancion] = useState({
        titulo: '',
        artista: '',
        anioLanzamiento: '',
        genero: '',
        album: ''
    });

    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchCancion = async () => {
        try {
            const { data } = await obtenerCancionPorId(id);
            setCancion({
            titulo: data.titulo || '',
            artista: data.artista || '',
            anioLanzamiento: data.anioLanzamiento ?? '',
            genero: data.genero || '',
            album: data.album || ''
            });
        } catch (error) {
            console.error('Error al cargar la canción:', error);
        } finally {
            setCargando(false);
        }
        };
        fetchCancion();
    }, [id]);

        //actualizar el objeto de estado
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCancion(prev => ({ ...prev, [name]: value }));
    };

        //Validaciones
    const validar = () => {
        const nuevosErrores = {};

        if (!cancion.titulo.trim()) nuevosErrores.titulo = 'El título es obligatorio';
        if (!cancion.artista.trim()) nuevosErrores.artista = 'El nombre del artista es obligatorio';
        if (!String(cancion.anioLanzamiento).trim()) {
        nuevosErrores.anioLanzamiento = 'El año de lanzamiento es obligatorio';
        } else if (Number.isNaN(Number(cancion.anioLanzamiento))) {
        nuevosErrores.anioLanzamiento = 'El año debe ser un número válido';
        }
        if (!cancion.genero.trim()) nuevosErrores.genero = 'El género es obligatorio';

        return nuevosErrores;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const erroresEncontrados = validar();
        setErrores(erroresEncontrados);

        if (Object.keys(erroresEncontrados).length > 0) {
        return;
        }

        const cancionActualizada = {
        ...cancion,
        anioLanzamiento: Number(cancion.anioLanzamiento),
        };

        try {
        await actualizarCancion(id, cancionActualizada);
        navigate('/canciones');
        } catch (error) {
        console.error('Error al actualizar la canción:', error);
        setErrores({ general: 'No se pudo actualizar la canción. Intenta de nuevo.' });
        }
    };

    if (cargando) return <p>Cargando...</p>;

    return (
        <div className="page-container">
        <h1>Editar Canción</h1>

        {errores.general && <p className="error-general">{errores.general}</p>}

        <form onSubmit={handleSubmit} noValidate>
            <label>Título:</label>
            <input
            type="text"
            name="titulo"
            value={cancion.titulo}
            onChange={handleChange}
            />
            {errores.titulo && <span className="error-mensaje">{errores.titulo}</span>}

            <label>Artista:</label>
            <input
            type="text"
            name="artista"
            value={cancion.artista}
            onChange={handleChange}
            />
            {errores.artista && <span className="error-mensaje">{errores.artista}</span>}

            <label>Año de Lanzamiento:</label>
            <input
            type="number"
            name="anioLanzamiento"
            value={cancion.anioLanzamiento}
            onChange={handleChange}
            />
            {errores.anioLanzamiento && <span className="error-mensaje">{errores.anioLanzamiento}</span>}

            <label>Género:</label>
            <input
            type="text"
            name="genero"
            value={cancion.genero}
            onChange={handleChange}
            />
            {errores.genero && <span className="error-mensaje">{errores.genero}</span>}

            <label>Álbum:</label>
            <input
            type="text"
            name="album"
            value={cancion.album}
            onChange={handleChange}
            />

            <button type="submit">Guardar Cambios</button>
        </form>
        </div>
    );
};

export default EditarCancion;