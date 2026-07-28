import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './componentes/encabezado';
import Canciones from './paginas/canciones';
import CancionDetalle from './paginas/cancionDetalle';
import AgregarCancion from './paginas/agregarCancion';
import EditarCancion from './paginas/editarCancion';
import Playlists from './paginas/listas';
import PlaylistDetalle from './paginas/listaDetalle';
import EditarPlaylist from './paginas/editarLista';
import Registro from './componentes/registro';
import Login from './componentes/login';
import RutaProtegida from './componentes/rutaProtegida';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Rutas públicas - sin protección */}
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas - requieren token válido */}
        <Route
          path="/"
          element={
            <RutaProtegida>
              <Canciones />
            </RutaProtegida>
          }
        />
        <Route
          path="/canciones"
          element={
            <RutaProtegida>
              <Canciones />
            </RutaProtegida>
          }
        />
        <Route
          path="/canciones/new"
          element={
            <RutaProtegida>
              <AgregarCancion />
            </RutaProtegida>
          }
        />
        <Route
          path="/canciones/:id"
          element={
            <RutaProtegida>
              <CancionDetalle />
            </RutaProtegida>
          }
        />
        <Route
          path="/canciones/:id/edit"
          element={
            <RutaProtegida>
              <EditarCancion />
            </RutaProtegida>
          }
        />

        <Route
          path="/listas"
          element={
            <RutaProtegida>
              <Playlists />
            </RutaProtegida>
          }
        />
        <Route
          path="/listas/:id"
          element={
            <RutaProtegida>
              <PlaylistDetalle />
            </RutaProtegida>
          }
        />
        <Route
          path="/listas/new"
          element={
            <RutaProtegida>
              <EditarPlaylist />
            </RutaProtegida>
          }
        />
        <Route
          path="/listas/:id/edit"
          element={
            <RutaProtegida>
              <EditarPlaylist />
            </RutaProtegida>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;


