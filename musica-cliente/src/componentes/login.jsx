import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { iniciarSesion } from '../servicios/api';


const Login = () => {
    const [formData, setFormData] = useState({ correo: '', contrasena: '' });
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
            const response = await iniciarSesion(formData);
            const { token } = response.data;

            localStorage.setItem('token_usuario', token);
            navigate('/'); // Redirección a la ruta principal (canciones)
        } catch (err) {
            setError(err.response?.data?.mensaje || 'Ocurrió un error al iniciar sesión.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Iniciar sesión</h2>
            {error && <p className="error-mensaje-centrado">{error}</p>}
            <form onSubmit={handleSubmit}>
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
                    placeholder="Contraseña"
                    value={formData.contrasena}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={cargando}>
                    {cargando ? 'Ingresando...' : 'Ingresar'}
                </button>
            </form>
            <p>¿No tienes cuenta? <Link to="/registro">Registrate!</Link></p>
        </div>
    );
};

export default Login;
