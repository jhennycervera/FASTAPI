from fastapi import FastAPI, Depends, HTTPException
from .database import SessionLocal
from sqlalchemy.orm import  Session
from .models import Book
from .schemas import BookBase
from fastapi.middleware.cors import CORSMiddleware
from time import sleep


app = FastAPI()

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows any origin
    allow_credentials=True,  # Allow cookies to be sent with requests
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Dependencia para obtener la sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#leer libro
@app.get("/books")
async def read_all_books(db: Session = Depends(get_db)):
    books = db.query(Book).all()    
    sleep(3)
    return books


#crear libro
@app.post("/books")
async def create_book(book: BookBase, db: Session = Depends(get_db)):
    db_book = Book(**book.dict())
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

#actualizar libro
@app.put("/books/{book_id}")
async def update_book(book_id: int, book: BookBase, db: Session = Depends(get_db)): #id del libro a actualizar, book: los nuevos datos del libro que se escibiran
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    for key, value in book.dict().items():
        setattr(db_book, key, value)
    db.commit()
    db.refresh(db_book)
    return db_book


#eliminar libro
@app.delete("/books/{book_id}")
async def delete_book(book_id: int, db: Session = Depends(get_db)):
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    db.delete(db_book)
    db.commit()
    return db_book
