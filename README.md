# 🎵 Music App — MERN Stack

Aplicación web para explorar canciones, crear listas de reproducción (playlists) y gestionar una biblioteca musical personal. Construida con el stack **MERN** (MongoDB, Express, React, Node.js).

---

## 📋 Tabla de contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Requisitos previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Variables de entorno](#-variables-de-entorno)
- [Ejecución](#-ejecución)
- [Documentación de la API](#-documentación-de-la-api)
- [Rutas del frontend](#-rutas-del-frontend)
- [Modelos de datos](#-modelos-de-datos)
- [Estilos (CSS)](#-estilos-css)
- [Solución de problemas comunes](#-solución-de-problemas-comunes)
- [Notas y decisiones de diseño](#-notas-y-decisiones-de-diseño)

---

## ✨ Características

- Ver todas las canciones de la biblioteca, con búsqueda por título, artista o género.
- Ver el detalle de una canción individual.
- Agregar nuevas canciones mediante un formulario.
- Crear y editar listas de reproducción, seleccionando canciones desde un checklist.
- Ver el detalle de una playlist con sus canciones asociadas.
- Navegación fluida entre vistas mediante React Router, con un header global persistente.
- Soporte de variables CSS para modo claro / oscuro.

---

## 🛠️ Tecnologías

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv, cors

**Frontend**
- React (Vite)
- React Router DOM
- Axios

---

## 📁 Estructura del proyecto

```
music-app/
├── server/
│   ├── config/              # Conexión a la base de datos
│   ├── controllers/
│   │   ├── cancion.controller.js
│   │   └── lista.controller.js
│   ├── models/
│   │   ├── Cancion.js
│   │   └── Lista.js
│   ├── routes/
│   │   ├── canciones.routes.js
│   │   └── listas.routes.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Header.css
│   │   │   ├── SongItem.jsx
│   │   │   └── PlaylistItem.jsx
│   │   ├── pages/
│   │   │   ├── Songs.jsx
│   │   │   ├── Songs.css
│   │   │   ├── SongDetail.jsx
│   │   │   ├── SongDetail.css
│   │   │   ├── AddSong.jsx
│   │   │   ├── Playlists.jsx
│   │   │   ├── Playlists.css
│   │   │   ├── PlaylistDetail.jsx
│   │   │   ├── PlaylistEditor.jsx
│   │   │   └── Forms.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

> ⚠️ **Importante:** los nombres de archivos e imports deben coincidir EXACTAMENTE (mayúsculas/minúsculas incluidas). Si usas carpetas o nombres en español (`componentes/`, `paginas/`), asegúrate de que todos los `import` en el proyecto usen esa misma convención — mezclar `componentes/encabezado.css` con archivos guardados como `components/Header.css` es la causa más común del error `Failed to resolve import`.

---

## ✅ Requisitos previos

- Node.js (v18 o superior recomendado)
- npm
- Una instancia de MongoDB (local o Atlas)

---

## 📦 Instalación

Clona el repositorio y luego instala las dependencias de cada parte por separado.

### Backend

```bash
cd server
npm install
```

### Frontend

```bash
cd client
npm install
```

---

## 🔐 Variables de entorno

Crea un archivo `.env` dentro de la carpeta `server/` con el siguiente contenido:

```env
PUERTO=3000
MONGODB_URI=mongodb+srv://usuario:<password>@cluster.mongodb.net/musicapp?retryWrites=true&w=majority
```

> ⚠️ No subas este archivo al repositorio. Asegúrate de que `.env` esté incluido en `.gitignore`.

---

## ▶️ Ejecución

Se necesitan **dos terminales** corriendo en simultáneo (una para el backend y otra para el frontend).

**Terminal 1 — Backend**

```bash
cd server
npm run dev
```

El servidor quedará disponible en `http://localhost:3000`.

**Terminal 2 — Frontend**

```bash
cd client
npm run dev
```

El cliente quedará disponible en `http://localhost:5173`. Las peticiones a `/canciones` y `/listas` se redirigen automáticamente al backend gracias al proxy configurado en `vite.config.js`.

---

## 📡 Documentación de la API

### Canciones

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/canciones` | Obtiene todas las canciones |
| GET | `/canciones/:id` | Obtiene una canción por id |
| POST | `/canciones` | Crea una nueva canción |
| PUT | `/canciones/:id` | Actualiza una canción existente |
| DELETE | `/canciones/:id` | Elimina una canción |

**Body de ejemplo (POST/PUT `/canciones`):**

```json
{
  "titulo": "Enter Sandman",
  "artista": "Metallica",
  "genero": "Rock",
  "anioLanzamiento": 1991
}
```

### Listas (playlists)

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/listas` | Obtiene todas las playlists |
| GET | `/listas/:id` | Obtiene una playlist por id (con canciones populadas) |
| POST | `/listas` | Crea una nueva playlist |
| PUT | `/listas/:id` | Actualiza nombre y/o canciones de una playlist |
| DELETE | `/listas/:id` | Elimina una playlist |

**Body de ejemplo (POST/PUT `/listas`):**

```json
{
  "nombre": "Guns",
  "canciones": ["64f1a2b3c4d5e6f7a8b9c0d1", "64f1a2b3c4d5e6f7a8b9c0d2"]
}
```

---

## 🧭 Rutas del frontend

| Ruta | Componente | Descripción |
|---|---|---|
| `/` , `/songs` | `Songs` | Biblioteca de música completa |
| `/songs/:id` | `SongDetail` | Detalle de una canción |
| `/songs/new` | `AddSong` | Formulario para agregar canción |
| `/playlists` | `Playlists` | Listado de playlists |
| `/playlists/:id` | `PlaylistDetail` | Detalle de una playlist |
| `/playlists/new` | `PlaylistEditor` | Crear nueva playlist |
| `/playlists/:id/edit` | `PlaylistEditor` | Editar playlist existente |

---

## 🗄️ Modelos de datos

### Cancion

| Campo | Tipo | Descripción |
|---|---|---|
| `titulo` | String | Nombre de la canción |
| `artista` | String | Nombre del artista |
| `genero` | String | Género musical |
| `anioLanzamiento` | Number | Año de lanzamiento |

### Lista

| Campo | Tipo | Descripción |
|---|---|---|
| `nombre` | String | Nombre de la playlist |
| `canciones` | [ObjectId] | Referencias a documentos de `Cancion` |

---

## 🎨 Estilos (CSS)

| Archivo | Contenido |
|---|---|
| `src/index.css` | Variables de color (modo claro/oscuro), reseteo global, contenedor de página |
| `src/components/Header.css` | Header oscuro, navegación, botón de tema |
| `src/pages/Songs.css` | Buscador y lista de canciones |
| `src/pages/Playlists.css` | Lista de playlists |
| `src/pages/SongDetail.css` | Detalle de canción y selector para agregar a playlist |
| `src/pages/Forms.css` | Formularios compartidos (Add Song / Playlist Editor) y checklist de canciones |

Import recomendado (una sola vez, en `main.jsx`):

```jsx
import './index.css';
import './components/Header.css';
import './pages/Songs.css';
import './pages/Playlists.css';
import './pages/SongDetail.css';
import './pages/Forms.css';
```

El modo oscuro se activa agregando el atributo `data-theme="dark"` a `<html>` o `<body>` (pendiente de conectar con un `useState` en `Header.jsx`).

---

## 🩹 Solución de problemas comunes

**`Failed to resolve import ".../archivo.css" from "src/main.jsx"`**
Significa que la ruta del import no coincide con la ubicación/nombre real del archivo (Vite distingue mayúsculas y minúsculas). Verifica: 1) que el archivo exista, 2) que el nombre de carpeta y archivo estén escritos exactamente igual en el `import`, 3) que no estés mezclando nombres en español e inglés entre carpetas.

**CORS bloqueado en el navegador**
Confirma que `cors()` esté configurado en `server.js` y que el proxy de `vite.config.js` apunte al puerto correcto del backend (3000 en este proyecto).

**Una playlist no muestra canciones**
Verifica que el endpoint `GET /listas/:id` esté haciendo `.populate('canciones')` en el controlador; de lo contrario solo devuelve ids.

---

## 📝 Notas y decisiones de diseño

- Los endpoints y campos están en español para mantener consistencia con las rutas de canciones ya definidas en el backend original.
- `GET /listas/:id` hace `populate('canciones')` para devolver los datos completos de cada canción; `GET /listas` devuelve solo los ids, útil para listados livianos.
- La búsqueda de canciones y playlists se realiza en el cliente (filtrado en memoria), sin llamadas adicionales a la API por cada tecla.
- El header de navegación vive fuera de las `Routes` en `App.jsx`, por lo que es visible en todas las vistas.
- Antes de la entrega final: eliminar `console.log` de depuración, verificar que `.env` no esté versionado, y confirmar que todos los formularios validan campos requeridos.