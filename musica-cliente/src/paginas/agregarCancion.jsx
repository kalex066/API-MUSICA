import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearCancion } from '../servicios/api';

const AgregarCancion = () => {
    const [cancion, setCancion] = useState({
        titulo: '',
        artista: '',
        anioLanzamiento: '',
        genero: '',
        album: ''
    });

    // Errores de validación del formulario en tiempo real
    const [erroresFormulario, setErroresFormulario] = useState({
        titulo: 'El título es obligatorio',
        artista: 'El nombre del artista es obligatorio',
        anioLanzamiento: 'El año de lanzamiento es obligatorio',
        genero: 'El género es obligatorio',
    });

    //Errores que puedan venir directamente del backend
    const [erroresServidor, setErroresServidor] = useState({});
    
    const navigate = useNavigate();

    //Validaciones en tiempo real por cada campo
    const validarCampo = (name, value) => {
        let mensajeError = '';

        switch (name) {
            case 'titulo':
                if (!value.trim()) {
                    mensajeError = 'El título es obligatorio';
                } else if (value.trim().length < 5) {
                    mensajeError = 'El título debe tener al menos 5 caracteres';
                }
                break;
            case 'artista':
                if (!value.trim()) {
                    mensajeError = 'El nombre del artista es obligatorio';
                } else if (value.trim().length < 5) {
                    mensajeError = 'El artista debe tener al menos 5 caracteres';
                }
                break;
            case 'anioLanzamiento':
                if (!String(value).trim()) {
                    mensajeError = 'El año de lanzamiento es obligatorio';
                } else if (Number.isNaN(Number(value))) {
                    mensajeError = 'El año debe ser un número válido';
                } else if (!/^\d{4}$/.test(String(value).trim())) {
                    mensajeError = 'El año de lanzamiento debe tener 4 dígitos';
                }
                break;
            case 'genero':
                if (!value.trim()) {
                    mensajeError = 'El género es obligatorio';
                }
                break;
            default:
                break;
        }

        return mensajeError;
    };

    // Actualizar el estado y validar en tiempo real
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCancion(prev => ({ ...prev, [name]: value }));

        // Si el campo tiene validación, se actualiza
        if (name in erroresFormulario) {
            const errorValidacion = validarCampo(name, value);
            setErroresFormulario(prev => ({ ...prev, [name]: errorValidacion }));
        }
    };

    // El formulario es válido cuando todos los mensajes de error del formulario están vacíos
    const validarFormularioCompleto = () => {
        return Object.values(erroresFormulario).every((valor) => valor === '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validarFormularioCompleto()) return;

        const nuevaCancion = { 
            ...cancion, 
            anioLanzamiento: Number(cancion.anioLanzamiento)
        };

        try {
            await crearCancion(nuevaCancion);
            navigate('/canciones');
        } catch (error) {
            console.error('Error al crear la canción:', error);
            const erroresBackend = error?.response?.data?.errores;
            if (erroresBackend) {
                setErroresServidor(erroresBackend);
            } else {
                setErroresServidor({ general: error?.response?.data?.mensaje || 'No se pudo crear la canción. Intenta de nuevo.' });
            }
        }
    };

    return (
        <div className="page-container">
            <h1>Nueva Canción</h1>

            {erroresServidor.general && <p className="error-general">{erroresServidor.general}</p>}

            <form onSubmit={handleSubmit} noValidate>
                <label>Título:</label>
                <input
                    type="text"
                    name="titulo"
                    value={cancion.titulo}
                    onChange={handleChange}
                />
                {erroresFormulario.titulo && <span className="error-mensaje">{erroresFormulario.titulo}</span>}
                {erroresServidor.titulo && <span className="error-mensaje">{erroresServidor.titulo}</span>}

                <label>Artista:</label>
                <input
                    type="text"
                    name="artista"
                    value={cancion.artista}
                    onChange={handleChange}
                />
                {erroresFormulario.artista && <span className="error-mensaje">{erroresFormulario.artista}</span>}
                {erroresServidor.artista && <span className="error-mensaje">{erroresServidor.artista}</span>}

                <label>Año de Lanzamiento:</label>
                <input
                    type="number"
                    name="anioLanzamiento"
                    value={cancion.anioLanzamiento}
                    onChange={handleChange}
                    placeholder="Ej: 1991"
                />
                {erroresFormulario.anioLanzamiento && <span className="error-mensaje">{erroresFormulario.anioLanzamiento}</span>}
                {erroresServidor.anioLanzamiento && <span className="error-mensaje">{erroresServidor.anioLanzamiento}</span>}

                <label>Género:</label>
                <input
                    type="text"
                    name="genero"
                    value={cancion.genero}
                    onChange={handleChange}
                />
                {erroresFormulario.genero && <span className="error-mensaje">{erroresFormulario.genero}</span>}
                {erroresServidor.genero && <span className="error-mensaje">{erroresServidor.genero}</span>}

                <label>Álbum:</label>
                <input
                    type="text"
                    name="album"
                    value={cancion.album}
                    onChange={handleChange}
                />

                <button type="submit" disabled={!validarFormularioCompleto()}>Agregar Canción</button>
            </form>
        </div>
    );
};

export default AgregarCancion;