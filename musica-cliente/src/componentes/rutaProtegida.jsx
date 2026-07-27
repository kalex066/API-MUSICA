import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ children }) => {
    const token = localStorage.getItem('token_usuario');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default RutaProtegida;