# Usa una imagen de Node
FROM node:16

# Crea el directorio de trabajo
WORKDIR /app

# Copia el archivo de configuración de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código del backend a la imagen
COPY . .

# Expone el puerto de la API
EXPOSE 5000

# Comando para iniciar el servidor
CMD ["npm", "start"]
