from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


#'postgresql://<usuario>:<contraseña>@<host>:<puerto>/<nombre_bd>'
#en este caso no se conectara al <host> local, sino referencia al contenedor, cuyo nombre es database 
SQLALCHEMY_DATABASE_URL = 'postgresql://admin:admin@database:5432/test'

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
