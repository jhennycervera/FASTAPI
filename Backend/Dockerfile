# para crear imagenes y otras configuraciones:

# descragar y usar una imagen de python,  Usar la imagen oficial de Python 3.12 como base
FROM python:3.12

#establecer y crear el directorio de trabajo, donde estara la instancia de la aplicacion, el archivo main.py
WORKDIR /app

#copiar los requisitos y la aplicacion a la imagen
COPY requirements.txt /app/requirements.txt

# Actualizar pip a la última versión
RUN pip install --upgrade pip

# Instalar las dependencias listadas en requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

#copiar todos los archivos de la aplicacion (./src es el local) al contenedor en el directorio /src
COPY ./src /app/src
COPY alembic.ini /app/alembic.ini

#exponer el puerto en que la aplicacion estara escuchando
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]