import { Link } from 'react-router-dom';

const ListaItem = ({ lista }) => (
    <li className="lista-item">
        <Link to={`/listas/${lista._id}`}>{lista.nombre}</Link>
    </li>
);

export default ListaItem;