# Proyecto de API con Caché y Almacenamiento de Datos en MongoDB y Redis

Este proyecto es una API para gestionar perfiles de usuario con almacenamiento en caché en Redis y almacenamiento principal en MongoDB. Incluye rutas para registro, inicio de sesión, visualización y actualización de perfiles de usuario, así como gestión de puntuaciones de usuario. La aplicación está desarrollada con Node.js para el backend y React para el frontend.

## Características del Proyecto
- **Autenticación de Usuarios**: Permite registro e inicio de sesión.
- **Visualización de Perfiles**: Los datos de perfil se obtienen con caché en Redis para reducir la carga en MongoDB.
- **Actualización de Puntuaciones**: Los usuarios pueden actualizar su puntaje, sincronizando los datos de forma segura y coherente.
- **Interfaz de Usuario en React**: Vistas para registro, inicio de sesión, visualización y actualización de perfil, accesibles solo para usuarios autenticados.
  
## Estructura del Proyecto
- **Backend (Node.js)**: Contiene las rutas y la lógica del servidor, configurado para conectarse con MongoDB y Redis.
- **Frontend (React + Vite)**: Permite a los usuarios interactuar con la API mediante vistas y formularios.
- **Caché en Redis**: Los datos de perfil se almacenan en Redis para mejorar el tiempo de respuesta.
  
## Puntos Finales de la API

| Ruta               | Método | Descripción                                 |
|--------------------|--------|---------------------------------------------|
| `/api/register`    | POST   | Registro de un nuevo usuario                |
| `/api/login`       | POST   | Inicio de sesión de usuario                 |
| `/api/profile`     | GET    | Obtención de perfil de usuario con caché    |
| `/api/updateScore` | POST   | Actualización de puntaje del usuario        |

## Requisitos
- Node.js 
- MongoDB
- Redis
- Docker (opcional para ejecución con contenedores)

## Configuración del Proyecto
1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd <directorio-del-proyecto>

2. Configure las variables de entorno en el archivo .env
MONGODB_URI=mongodb://localhost:27017/tu_basedatos
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=tu_clave_secreta

3. configure el frontend para redirigir correctamente las solicitudes al backend: En el archivo vite.config.js del frontend:
server: {
  proxy: {
    '/api': 'http://localhost:5000'
  },
},

## EJECUCION DE LA APLICACION
1. Iniciar MongoDB y Redis (asegúrese de que estén en ejecución).

2. Iniciar el BackEnd: 
cd backend
npm install
npm start

3. Iniciar el FrontEnd:
cd frontend
npm install
npm run dev

## EJECUCION CON DOCKER

1. Nota : Se intentó ejecutar la aplicación en Docker, pero surgieron inconvenientes técnicos. El proyecto se ejecuta perfectamente en local.

Para una implementación en Docker (si decide investigar más), los archivos Dockerfiley docker-compose.yml están configurados como se explica en la sección de configuración avanzada.

## ALMACENAMIENTO CACHE EN REDIS 

Redis se utiliza para almacenar en caché los datos de perfil de usuario, optimizando el tiempo de respuesta de la API. Cuando un perfil de usuario se solicita por primera vez, se verifica en Redis; Si no existe, se obtiene de MongoDB y se guarda en Redis con un tiempo de vencimiento predefinido. Esto reduce la carga de consultas a MongoDB y mejora el rendimiento en múltiples solicitudes al mismo perfil.

## ESTRATEGIAS DE ESCALABILIDAD
Este proyecto implementa las siguientes estrategias de escalabilidad:

1. Caché Distribuida con Redis : Mejora el tiempo de respuesta y reduce la carga de la base de datos.

2. Separación de Servicios en Contenedores : Aunque la implementación de Docker presenta actualmente errores, el uso de contenedores permite escalar y desplegar cada servicio de manera independiente.

3. JWT para Autenticación : Facilita la escalabilidad de autenticación y seguridad sin requerir almacenamiento de sesiones en el servidor.

## GESTION SEGURA DE ACTUALIZACION DE PUNTUACIONES
Para actualizar el puntaje de un usuario de forma segura y sincronizada, se implementa un mecanismo que valida la autenticidad y los permisos del usuario antes de cualquier modificación. La actualización del puntaje realiza los siguientes pasos:

1. Verifica el usuario autenticado mediante JWT.
2. Consulta el perfil de usuario desde Redis o MongoDB según corresponda.
3. Realice la actualización en MongoDB y almacene el nuevo valor en Redis, asegurando consistencia entre caché y base de datos.
