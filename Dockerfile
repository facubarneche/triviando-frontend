# Usamos una imagen de Node como base
FROM node:23-slim

# Copiamos el package.json y package-lock.json
COPY package*.json ./

# Creamos un directorio dentro del contenedor para la app
WORKDIR /app

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto 3000
EXPOSE 3000

# Comando para levantar la app
CMD ["npm", "run", "dev"]
