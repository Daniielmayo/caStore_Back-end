FROM node:22-alpine

# Definir el directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto
EXPOSE 4000

# Usar el script de desarrollo para soportar hot-reload
CMD ["npm", "run", "dev"]
