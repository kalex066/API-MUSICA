import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="app-header">
        <nav className="app-nav">
            <Link to="/canciones">CANCIONES</Link>
            <Link to="/listas">PLAYLISTS</Link>
            <Link to="/canciones/new">AGREGAR CANCIONES</Link>
            <Link to="/listas/new">AGREGAR PLAYLISTS</Link>
        </nav>
        </header>
    );
};

export default Header;