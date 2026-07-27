import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token_usuario');

    const handleLogout = () => {
        localStorage.removeItem('token_usuario');
        navigate('/login');
    };

    return (
        <header className="app-header">
            <nav className="app-nav-links">
                <Link to="/canciones">Canciones</Link>
                <Link to="/listas">Playlists</Link>
                <Link to="/canciones/new">Agregar Canciones</Link>
                <Link to="/listas/new">Agregar Playlists</Link>
            </nav>

            {token ? (
                <button className="btn-sesion" onClick={handleLogout}>Cerrar sesión</button>
            ) : (
                <Link className="btn-sesion" to="/login">Iniciar sesión</Link>
            )}
        </header>
    );
};

export default Header;
