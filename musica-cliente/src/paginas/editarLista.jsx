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
    const [cargando, setCargando] = useState(true);
    const [erroresServidor, setErroresServidor] = useState({});

    // Estado de errores: si es creación, arranca con los mensajes de "requerido"
    const [erroresFormulario, setErroresFormulario] = useState({
        nombre: esEdicion ? '' : 'El nombre de la playlist debe tener al menos 3 caracteres',
        canciones: esEdicion ? '' : 'Se debe seleccionar al menos una canción',
    });

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                const { data: canciones } = await obtenerCanciones();
                setTodasLasCanciones(canciones);

                if (esEdicion) {
                    const { data: lista } = await obtenerPlaylistPorId(id);
                    setNombre(lista.nombre || '');
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

    //Manejador del nombre de la playlist con validación en tiempo real
    const manejadorNombre = (e) => {
        const valor = e.target.value;
        setNombre(valor);

        let mensajeError = '';
        if (!valor.trim()) {
            mensajeError = 'El nombre de la playlist es obligatorio';
        } else if (valor.trim().length < 3) {
            mensajeError = 'El nombre de la playlist debe tener al menos 3 caracteres';
        }
        setErroresFormulario({ ...erroresFormulario, nombre: mensajeError });
    };

    //Manejador de selección de canciones con validación
    const toggleCancion = (cancionId) => {
        const nuevasSeleccionadas = seleccionadas.includes(cancionId)
            ? seleccionadas.filter((sid) => sid !== cancionId)
            : [...seleccionadas, cancionId];

        setSeleccionadas(nuevasSeleccionadas);

        const mensajeError = nuevasSeleccionadas.length === 0 ? 'Se debe seleccionar al menos una canción' : '';
        setErroresFormulario({ ...erroresFormulario, canciones: mensajeError });
    };

    const validarFormulario = () => {
        return Object.values(erroresFormulario).every((valor) => valor === '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

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
            const erroresBackend = error?.response?.data?.errores;
            if (erroresBackend) {
                setErroresServidor(erroresBackend);
            } else {
                setErroresServidor({ general: error?.response?.data?.mensaje || 'No se pudo guardar la playlist' });
            }
        }
    };

    if (cargando) return <p>Cargando...</p>;

    return (
        <div className="page-container">
            <h1>{esEdicion ? 'Editar Playlist' : 'Crear Nueva Playlist'}</h1>

            {erroresServidor.general && <p className="error-general">{erroresServidor.general}</p>}

            <form onSubmit={handleSubmit} noValidate>
                <label>Nombre de la Playlist:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={manejadorNombre}
                />
                {erroresFormulario.nombre && <span className="error-mensaje">{erroresFormulario.nombre}</span>}
                {erroresServidor.nombre && <span className="error-mensaje">{erroresServidor.nombre}</span>}

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
                {erroresFormulario.canciones && <span className="error-mensaje">{erroresFormulario.canciones}</span>}
                {erroresServidor.canciones && <span className="error-mensaje">{erroresServidor.canciones}</span>}

                <button type="submit" disabled={!validarFormulario()}>
                    {esEdicion ? 'Guardar Cambios' : 'Crear Playlist'}
                </button>
            </form>
        </div>
    );
};

export default EditarPlaylist;