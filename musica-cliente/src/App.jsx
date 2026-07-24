import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './componentes/encabezado';
import Canciones from './paginas/canciones';
import CancionDetalle from './paginas/cancionDetalle';
import AgregarCancion from './paginas/agregarCancion';
import EditarCancion from './paginas/editarCancion';
import Playlists from './paginas/listas';
import PlaylistDetalle from './paginas/listaDetalle';
import EditarPlaylist from './paginas/editarLista';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        
        <Route path="/" element={<Canciones />} />
        <Route path="/canciones" element={<Canciones />} />
        <Route path="/canciones/new" element={<AgregarCancion />} />
        <Route path="/canciones/:id" element={<CancionDetalle />} />
        <Route path="/canciones/:id/edit" element={<EditarCancion />} /> 
        
        <Route path="/listas" element={<Playlists />} />
        <Route path="/listas/:id" element={<PlaylistDetalle />} />
        <Route path="/listas/new" element={<EditarPlaylist />} />
        <Route path="/listas/:id/edit" element={<EditarPlaylist />} />
      </Routes>
    </Router>
  );
};

export default App;