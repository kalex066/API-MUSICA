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

- Ver todas las canciones de la biblioteca.
- Agregar nuevas canciones mediante un formulario con validaciones en tiempo real.
- Editar canciones existentes con precarga de datos.
- Crear y editar listas de reproducción, seleccionando canciones mediante un checklist.
- Manejo centralizado de errores con respuestas claras y amigables en español.
- Navegación fluida mediante React Router.
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
│   │   └── listaCanciones.controller.js
    ├── middlewares/
│   │   ├── manejadorErrores.js
│   │   └── rutaNoEncontrada.js
│   ├── modelos/
│   │   ├── cancion.model.js
│   │   └── listaCanciones.model.js
│   ├── routes/
│   │   ├── cancion.router.js
│   │   └── listaCanciones.router.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── musica-cliente/
│   ├── src/
│   │   ├── components/
│   │   │   ├── encabezado.jsx
│   │   │   ├── CancionItem.jsx
│   │   │   └── ListaItem.jsx
        ├── css/
│   │   │   ├── canciones.css
│   │   │   ├── detalleCancion.css
│   │   │   └── encabezado.css
            ├── forms.css
│   │   │   └── playlist.css
│   │   ├── paginas/
│   │   │   ├── agregarCancion.jsx
│   │   │   ├── cancionDetalle.jsx
│   │   │   ├── canciones.jsx
│   │   │   ├── editarCancion.jsx
│   │   │   ├── editarLista.jsx
│   │   │   ├── listaDetalle.jsx
│   │   │   ├── listas.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

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
PUERTO=8080
MONGODB_URI=mongodb+srv://usuario:<password>@cluster.mongodb.net/musicapp?retryWrites=true&w=majority
```

---

## ▶️ Ejecución

Se necesitan **dos terminales** corriendo en simultáneo (una para el backend y otra para el frontend).

**Terminal 1 — Backend**

```bash
cd music-server
npm run dev
```

El servidor quedará disponible en `http://localhost:8080`.

**Terminal 2 — Frontend**

```bash
cd music-cliente
npm run dev
```

El cliente quedará disponible en `http://localhost:5173`. Las peticiones a `/canciones` y `/listas` se redirigen automáticamente al backend gracias al proxy configurado en `vite.config.js`.

---

## 📡 Documentación de la API

### Canciones

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/canciones` | Obtiene todas las canciones |
| GET | `/api/canciones/:id` | Obtiene una canción por id |
| POST | `/api/canciones` | Crea una nueva canción |
| PUT | `/api/canciones/:id` | Actualiza una canción existente |
| DELETE | `/api/canciones/:id` | Elimina una canción |

### Listas (playlists)

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/listas` | Obtiene todas las playlists |
| GET | `/api/listas/:id` | Obtiene una playlist por id (con canciones populadas) |
| POST | `/api/listas` | Crea una nueva playlist |
| PUT | `/api/listas/:id` | Actualiza nombre y/o canciones de una playlist |
| DELETE | `/api/listas/:id` | Elimina una playlist |

---

## 🧭 Rutas del frontend

| Ruta | Componente | Descripción |
|---|---|---|
| `/` , `/canciones` | `canciones` | Biblioteca de música completa |
| `/canciones/:id` | `DetalleCancion` | Detalle de una canción |
| `/canciones/nuevo` | `AgregarCancion` | Formulario para agregar canción |
| `/lista` | `Playlists` | Listado de playlists |
| `/lista/:id` | `PlaylistDetalle` | Detalle de una playlist |
| `/lista/nueva` | `EditarPlaylist` | Crear nueva playlist |
| `/lista/:id/editar` | `EditarPlaylist` | Editar playlist existente |

---

## 🗄️ Modelos de datos

### Cancion

| Campo | Tipo | Descripción |
|---|---|---|
| `titulo` | String | Nombre de la canción |
| `artista` | String | Nombre del artista |
| `anioLanzamiento` | Number | Año de lanzamiento |
| `genero` | String | Género musical |
| `album` | String | Nombre del album al que pertenece la cancion |

### Lista

| Campo | Tipo | Descripción |
|---|---|---|
| `nombre` | String | Nombre de la playlist |
| `canciones` | [ObjectId] | Referencias a documentos de `Cancion` |

---

Autor: Karen Herrera
Realizado con fines educativos

---