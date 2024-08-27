from pydantic import BaseModel
from datetime import date

# Esquema para crear un libro
class BookBase(BaseModel):
    title: str
    author: str
    foundation_date: date
