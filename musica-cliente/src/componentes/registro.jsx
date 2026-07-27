import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registrarUsuario } from '../servicios/api';


const Registro = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        contrasena: ''
    });
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        try {
            const response = await registrarUsuario(formData);
            const { token } = response.data;

            localStorage.setItem('token_usuario', token);
            navigate('/'); // Redirección a la ruta principal (canciones)
        } catch (err) {
            if (err.response?.data?.errores) {
                // Errores de validación
                setError(err.response.data.errores.join(', '));
            } else if (err.response?.data?.mensaje) {
                setError(err.response.data.mensaje);
            } else {
                setError('Ocurrió un error al registrar el usuario.');
            }
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Registro</h2>
            {error && <p className="error-mensaje-centrado">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="contrasena"
                    placeholder="Contraseña (mínimo 8 caracteres)"
                    value={formData.contrasena}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={cargando}>
                    {cargando ? 'Registrando...' : 'Registrarse'}
                </button>
            </form>
            <p>¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link></p>
        </div>
    );
};

export default Registro;