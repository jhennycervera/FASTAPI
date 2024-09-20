
#se usa la imagen de Node para construir el contenedor y la define como la etapa "base"
FROM node:20.11.1 AS base

#establece el directorio de trabajo dentro del contenedor. Cualquier comando se ejecutara en este directorio
WORKDIR /code

#copia los archivos para definir las dependencias
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

#instala todas las dependencias listadas en package.json y creael node_modules dentro de /code
RUN npm install

#----------------------------
#Define una nueva etapa de construcción llamada "development", que se basa en la etapa "base" creada anteriormente.
#Esta estrategia de construcción en múltiples etapas permite reutilizar el trabajo de la primera etapa (base)
FROM base as development

COPY ./. /code/.

#ejecuta el servidor de desarrollo
#ejecuta el script dev definido en package.json. Este comando es utilizado  
#para iniciar un servidor de desarrollo (por ejemplo, usando herramientas como Vite, Next.js, o cualquier otra que hayas configurado).
#se debe tener el script dev en el package.json
CMD ["npm", "run", "dev"]
