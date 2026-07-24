import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//importaciones de ccs globales
import './css/encabezado.css';
import './css/canciones.css';
import './css/playlists.css';
import './css/detalleCancion.css';
import './css/forms.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
