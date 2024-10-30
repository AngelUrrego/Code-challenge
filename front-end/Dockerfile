# Usa una imagen de Node
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código del frontend a la imagen
COPY . .

# Construye la aplicación de producción
RUN npm run build

# Usa una imagen de servidor web para servir el frontend
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Expone el puerto en el que se ejecuta Nginx
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
