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

    const [cargando, setCargando] = useState(true);
    const [erroresServidor, setErroresServidor] = useState({});

    // Como los datos se precargan desde la API, arranca con errores vacíos
    const [erroresFormulario, setErroresFormulario] = useState({
        titulo: '',
        artista: '',
        genero: '',
        anioLanzamiento: '',
    });

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

    //Manejadores y validación en tiempo real
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCancion(prev => ({ ...prev, [name]: value }));

        let mensajeError = '';

        if (name === 'titulo') {
            if (!value.trim()) mensajeError = 'El título es obligatorio';
            else if (value.trim().length < 5) mensajeError = 'El título debe tener al menos 5 caracteres';
        } else if (name === 'artista') {
            if (!value.trim()) mensajeError = 'El artista es obligatorio';
            else if (value.trim().length < 5) mensajeError = 'El artista debe tener al menos 5 caracteres';
        } else if (name === 'genero') {
            if (!value.trim()) mensajeError = 'El género es obligatorio';
        } else if (name === 'anioLanzamiento') {
            const patronAnio = /^\d{4}$/;
            if (!String(value).trim()) {
                mensajeError = 'El año de lanzamiento es obligatorio';
            } else if (!patronAnio.test(String(value).trim())) {
                mensajeError = 'El año de lanzamiento debe tener 4 caracteres';
            }
        }

        if (name in erroresFormulario) {
            setErroresFormulario(prev => ({ ...prev, [name]: mensajeError }));
        }
    };

    const validarFormulario = () => {
        return Object.values(erroresFormulario).every((valor) => valor === '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        const cancionActualizada = {
            ...cancion,
            anioLanzamiento: Number(cancion.anioLanzamiento),
        };

        try {
            await actualizarCancion(id, cancionActualizada);
            navigate('/canciones');
        } catch (error) {
            console.error('Error al actualizar la canción:', error);
            const erroresBackend = error?.response?.data?.errores;
            if (erroresBackend) {
                setErroresServidor(erroresBackend);
            } else {
                setErroresServidor({ general: error?.response?.data?.mensaje || 'No se pudo actualizar la canción' });
            }
        }
    };

    if (cargando) return <p>Cargando...</p>;

    return (
        <div className="page-container">
            <h1>Editar Canción</h1>

            {erroresServidor.general && <p className="mensaje-error mensaje-error-general">{erroresServidor.general}</p>}

            <form onSubmit={handleSubmit} noValidate>
                <label>Título:</label>
                <input
                    type="text"
                    name="titulo"
                    value={cancion.titulo}
                    onChange={handleChange}
                />
                {erroresFormulario.titulo && <p className="mensaje-error">{erroresFormulario.titulo}</p>}
                {erroresServidor.titulo && <p className="mensaje-error">{erroresServidor.titulo}</p>}

                <label>Artista:</label>
                <input
                    type="text"
                    name="artista"
                    value={cancion.artista}
                    onChange={handleChange}
                />
                {erroresFormulario.artista && <p className="mensaje-error">{erroresFormulario.artista}</p>}
                {erroresServidor.artista && <p className="mensaje-error">{erroresServidor.artista}</p>}

                <label>Género:</label>
                <input
                    type="text"
                    name="genero"
                    value={cancion.genero}
                    onChange={handleChange}
                />
                {erroresFormulario.genero && <p className="mensaje-error">{erroresFormulario.genero}</p>}
                {erroresServidor.genero && <p className="mensaje-error">{erroresServidor.genero}</p>}

                <label>Año de Lanzamiento:</label>
                <input
                    type="number"
                    name="anioLanzamiento"
                    value={cancion.anioLanzamiento}
                    onChange={handleChange}
                />
                {erroresFormulario.anioLanzamiento && <p className="mensaje-error">{erroresFormulario.anioLanzamiento}</p>}
                {erroresServidor.anioLanzamiento && <p className="mensaje-error">{erroresServidor.anioLanzamiento}</p>}

                <label>Álbum:</label>
                <input
                    type="text"
                    name="album"
                    value={cancion.album}
                    onChange={handleChange}
                />

                <button type="submit" disabled={!validarFormulario()}>Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditarCancion;