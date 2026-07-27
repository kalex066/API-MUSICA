# 🎵 Music App — MERN Stack

Aplicación web para explorar canciones, crear listas de reproducción (playlists) y gestionar una biblioteca musical personal, con autenticación de usuarios mediante JWT. Construida con el stack **MERN** (MongoDB, Express, React, Node.js).

---

## 📋 Tabla de contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Requisitos previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Variables de entorno](#-variables-de-entorno)
- [Ejecución](#-ejecución)
- [Autenticación](#-autenticación)
- [Documentación de la API](#-documentación-de-la-api)
- [Rutas del frontend](#-rutas-del-frontend)
- [Modelos de datos](#-modelos-de-datos)
- [Estilos (CSS)](#-estilos-css)
- [Solución de problemas comunes](#-solución-de-problemas-comunes)
- [Notas y decisiones de diseño](#-notas-y-decisiones-de-diseño)

---

## ✨ Características

- Registro e inicio de sesión de usuarios con contraseña encriptada (bcrypt).
- Autenticación basada en JSON Web Tokens (JWT), con expiración de 10 minutos.
- Rutas protegidas: canciones y playlists solo son accesibles con sesión iniciada.
- Cierre de sesión desde el encabezado, con limpieza del token guardado.
- Saludo personalizado en el encabezado (`Hola, nombre apellido`) al iniciar sesión.
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
- dotenv, cors, cookie-parser
- bcrypt (encriptación de contraseñas)
- jsonwebtoken (JWT)

**Frontend**
- React (Vite)
- React Router DOM
- Axios

---

## 📁 Estructura del proyecto

```
music-app/
├── server/
│   ├── config/                      # Conexión a la base de datos
│   ├── controllers/
│   │   ├── cancion.controller.js
│   │   ├── listaCanciones.controller.js
│   │   └── usuario.controller.js
│   ├── middlewares/
│   │   ├── manejadorErrores.js
│   │   ├── rutaNoEncontrada.js
│   │   └── jwt.config.js            # Middleware de autenticación (verificación de token)
│   ├── modelos/
│   │   ├── cancion.model.js
│   │   ├── listaCanciones.model.js
│   │   └── usuario.model.js         # Modelo de usuario (con hash de contraseña)
│   ├── routes/
│   │   ├── cancion.router.js
│   │   ├── listaCanciones.router.js
│   │   └── usuario.router.js        # Rutas /registro y /login
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── musica-cliente/
│   ├── src/
│   │   ├── componentes/
│   │   │   ├── encabezado.jsx       # Incluye saludo de usuario y botón de sesión
│   │   │   ├── Registro.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── RutaProtegida.jsx    # Bloquea el acceso sin token válido
│   │   │   ├── CancionItem.jsx
│   │   │   └── ListaItem.jsx
│   │   ├── css/
│   │   │   ├── canciones.css
│   │   │   ├── detalleCancion.css
│   │   │   ├── encabezado.css
│   │   │   ├── forms.css            # Incluye estilos de Login/Registro (.auth-container)
│   │   │   └── playlist.css
│   │   ├── paginas/
│   │   │   ├── agregarCancion.jsx
│   │   │   ├── cancionDetalle.jsx
│   │   │   ├── canciones.jsx
│   │   │   ├── editarCancion.jsx
│   │   │   ├── editarLista.jsx
│   │   │   ├── listaDetalle.jsx
│   │   │   └── listas.jsx
│   │   ├── servicios/
│   │   │   ├── api.js               # Cliente axios con interceptors de auth
│   │   │   └── auth.js              # Decodifica el JWT para leer datos del usuario
│   │   ├── App.css
│   │   ├── App.jsx                  # Define rutas públicas y protegidas
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

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

Dependencias de autenticación (si no vinieran incluidas en el `package.json`):

```bash
npm install bcrypt jsonwebtoken cookie-parser
```

### Frontend

```bash
cd musica-cliente
npm install
```

---

## 🔐 Variables de entorno

Crea un archivo `.env` dentro de la carpeta `server/` con el siguiente contenido:

```env
PUERTO=8080
MONGODB_URI=mongodb+srv://usuario:<password>@cluster.mongodb.net/musicapp?retryWrites=true&w=majority
SECRET_KEY=una_clave_secreta_larga_y_dificil_de_adivinar
```

> ⚠️ `SECRET_KEY` se usa para firmar y verificar los JWT. Debe ser la misma en todo el backend y no debe compartirse ni subirse a un repositorio público.

---

## ▶️ Ejecución

Se necesitan **dos terminales** corriendo en simultáneo (una para el backend y otra para el frontend).

**Terminal 1 — Backend**

```bash
cd server
npm run dev
```

El servidor quedará disponible en `http://localhost:8080`.

**Terminal 2 — Frontend**

```bash
cd musica-cliente
npm run dev
```

El cliente quedará disponible en `http://localhost:5173`.

---

## 🔑 Autenticación

La aplicación utiliza **JWT (JSON Web Tokens)** para proteger las rutas de canciones y playlists.

### Flujo general

1. El usuario se registra (`/registro`) o inicia sesión (`/login`).
2. El backend valida los datos, verifica/encripta la contraseña con **bcrypt**, y genera un token JWT que incluye `id`, `correo`, `nombre` y `apellido`, con una expiración de **10 minutos**.
3. El token se envía al frontend en el cuerpo de la respuesta (y también como cookie `httpOnly`).
4. El frontend guarda el token en `localStorage` bajo la clave `token_usuario`.
5. Cada petición posterior a rutas protegidas (`/canciones`, `/listas`) incluye automáticamente el token en el header `token_usuario`, gracias a un interceptor de axios configurado en `servicios/api.js`.
6. El backend valida el token con el middleware `jwt.config.js` antes de permitir el acceso a esas rutas.
7. Si el token es inválido o expiró, el backend responde `403` y el frontend limpia la sesión, redirigiendo automáticamente a `/login`.

### Rutas de autenticación

| Método | Endpoint | Descripción | Protegida |
|---|---|---|---|
| POST | `/api/registro` | Registra un nuevo usuario | No |
| POST | `/api/login` | Inicia sesión y devuelve un token | No |

### Validaciones del usuario

| Campo | Validación |
|---|---|
| `nombre` | Obligatorio |
| `apellido` | Obligatorio |
| `correo` | Obligatorio, único, se normaliza a minúsculas |
| `contrasena` | Obligatoria, mínimo 8 caracteres, se guarda encriptada (bcrypt) |

### Componentes del frontend relacionados

| Archivo | Función |
|---|---|
| `componentes/Registro.jsx` | Formulario de registro, guarda el token recibido en `localStorage` |
| `componentes/Login.jsx` | Formulario de inicio de sesión, guarda el token recibido en `localStorage` |
| `componentes/RutaProtegida.jsx` | Envuelve rutas privadas; redirige a `/login` si no hay token |
| `servicios/api.js` | Instancia de axios con interceptors: agrega el token a cada request y redirige a `/login` ante un `401`/`403` |
| `servicios/auth.js` | Decodifica el payload del JWT para mostrar el nombre del usuario en el encabezado |
| `componentes/encabezado.jsx` | Muestra el saludo del usuario y el botón de "Cerrar sesión" / enlace "Iniciar sesión" |

### Cerrar sesión

El botón "Cerrar sesión" en el encabezado elimina el token de `localStorage` y redirige a `/login`. No requiere una petición al backend, ya que el JWT no se invalida del lado del servidor (expira automáticamente a los 10 minutos).

---

## 📡 Documentación de la API

### Autenticación

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/registro` | Crea un nuevo usuario y devuelve un token JWT |
| POST | `/api/login` | Verifica credenciales y devuelve un token JWT |

### Canciones 🔒 *(requieren token válido)*

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/canciones` | Obtiene todas las canciones |
| GET | `/api/canciones/:id` | Obtiene una canción por id |
| POST | `/api/canciones` | Crea una nueva canción |
| PUT | `/api/canciones/:id` | Actualiza una canción existente |
| DELETE | `/api/canciones/:id` | Elimina una canción |

### Listas (playlists) 🔒 *(requieren token válido)*

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/listas` | Obtiene todas las playlists |
| GET | `/api/listas/:id` | Obtiene una playlist por id (con canciones populadas) |
| POST | `/api/listas` | Crea una nueva playlist |
| PUT | `/api/listas/:id` | Actualiza nombre y/o canciones de una playlist |
| DELETE | `/api/listas/:id` | Elimina una playlist |

> 🔒 Las rutas protegidas requieren el header `token_usuario` con un JWT válido, o la cookie equivalente. Sin un token válido, el backend responde `403 Forbidden`.

---

## 🧭 Rutas del frontend

| Ruta | Componente | Protegida | Descripción |
|---|---|---|---|
| `/registro` | `Registro` | No | Formulario de registro de usuario |
| `/login` | `Login` | No | Formulario de inicio de sesión |
| `/` , `/canciones` | `Canciones` | Sí | Biblioteca de música completa |
| `/canciones/:id` | `CancionDetalle` | Sí | Detalle de una canción |
| `/canciones/new` | `AgregarCancion` | Sí | Formulario para agregar canción |
| `/canciones/:id/edit` | `EditarCancion` | Sí | Editar una canción existente |
| `/listas` | `Playlists` | Sí | Listado de playlists |
| `/listas/:id` | `PlaylistDetalle` | Sí | Detalle de una playlist |
| `/listas/new` | `EditarPlaylist` | Sí | Crear nueva playlist |
| `/listas/:id/edit` | `EditarPlaylist` | Sí | Editar playlist existente |

Las rutas marcadas como protegidas están envueltas por el componente `RutaProtegida`, que redirige a `/login` si no existe un token válido en `localStorage`.

---

## 🗄️ Modelos de datos

### Usuario

| Campo | Tipo | Descripción |
|---|---|---|
| `nombre` | String | Nombre del usuario (obligatorio) |
| `apellido` | String | Apellido del usuario (obligatorio) |
| `correo` | String | Correo electrónico (obligatorio, único) |
| `contrasena` | String | Contraseña encriptada con bcrypt (mínimo 8 caracteres) |

### Cancion

| Campo | Tipo | Descripción |
|---|---|---|
| `titulo` | String | Nombre de la canción |
| `artista` | String | Nombre del artista |
| `anioLanzamiento` | Number | Año de lanzamiento |
| `genero` | String | Género musical |
| `album` | String | Nombre del álbum al que pertenece la canción |

### Lista

| Campo | Tipo | Descripción |
|---|---|---|
| `nombre` | String | Nombre de la playlist |
| `canciones` | [ObjectId] | Referencias a documentos de `Cancion` |


---

## 📝 Notas y decisiones de diseño

- El token JWT expira a los **10 minutos** por diseño; al expirar, cualquier petición protegida devuelve `403` y el frontend redirige automáticamente a `/login`.
- El token se almacena en `localStorage` (no solo en cookie) para simplificar la verificación de sesión del lado del cliente en `RutaProtegida`.
- Las contraseñas nunca se almacenan en texto plano: se encriptan con `bcrypt` antes de guardarse en la base de datos.
- El correo es único a nivel de base de datos (índice `unique` en Mongoose); intentar registrar un correo duplicado devuelve un mensaje de error amigable en español.

---

Autor: Karen Herrera
Realizado con fines educativos