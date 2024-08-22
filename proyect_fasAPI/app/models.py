
from sqlalchemy import Column, Integer, String, Date
from .database import Base

#modelo de la bd, debe ser igual a lo que esta en la bd creado, su esquema, tablas, atributos.
class Book(Base):
    __tablename__ = "Books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    author = Column(String, index=True)
    foundation_date =  Column(Date)