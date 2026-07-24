import { Link } from 'react-router-dom';

const CancionItem = ({ cancion }) => {
    if (!cancion) return null;

    return (
        <li className="song-item">
            <Link to={`/canciones/${cancion._id}`}>
                {cancion.titulo} por {cancion.artista} ({cancion.genero})
            </Link>
        </li>
    );
};

export default CancionItem;