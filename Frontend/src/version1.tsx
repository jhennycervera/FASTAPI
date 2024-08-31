import React, { useEffect, useState } from 'react'
import './App.css'

//define la interfaz para los autores
export interface Books {
  title: string
  foundation_date: string
  id: number
  author: string
}

const Version1: React.FC = () => {   //React.FC es el tipo funcional component

  const [books, setBooks] = useState<Books[]>([])   //variable books (estado de los libros) es una lista de libros que inicialmente esta vacia.
  const [newBook, setNewBook] = useState(   //un nuevo libro
    {
      title: "",
      author: "", 
      foundation_date: "",
    }
  );
  const [editingBook, setEditingBook] = useState<Books | null>(null); // Estado para manejar el libro que se está editando

  //funcion para cargar los libros al inicio
  useEffect(
    ()=>{
      fetch("http://localhost:8081/books")
      .then(response=> response.json())
      .then(data=> {
        setBooks(data)
      })
    },
    []
  );
  //eliminar un libro
  const deleteBook = (id:number) => {
    fetch(`http://localhost:8081/books/${id}`, 
    {
      method: "DELETE"
    })
    .then(response => {
      if(response.ok) {
        setBooks(books.filter(book => book.id!= id)); //actualizo el estado del libro sin el libro eliminado
      } else {
        alert("No se pudo eliminar el libro")
      }
    })
  }

  //funcion para manejar el cambio de input del formulario
  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingBook) {
      setEditingBook({ ...editingBook, [e.target.name]: e.target.value });
    } else {
      setNewBook({ ...newBook, [e.target.name]: e.target.value });
    }
  }

  //formulario para agregar un nuevo libro
  const addBook = (e: React.FormEvent) => {
    e.preventDefault(); // Evita la recarga de la página al enviar el formulario
    fetch('http://localhost:8081/books', {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(newBook),
    })
      .then( response => response.json())
      .then( data => {
        setBooks( [...books, data] ); //agrega el nuevo libro 
        setNewBook({title: "", author: "", foundation_date: ""}); //limpia el formulario
      })
  }

  // Función para manejar la actualización de un libro
  const updateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook) return;

    fetch(`http://localhost:8081/books/${editingBook.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingBook),
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualiza la lista de libros con los datos actualizados
        setBooks(books.map((book) => (book.id === data.id ? data : book)));
        setEditingBook(null); // Limpiamos el estado de edición
      });
  }

  // Función para manejar el inicio de la edición de un libro
  const startEditing = (book: Books) => {
    setEditingBook(book);
  };

  return (
    <div>
      {/* Formulario para agregar un libro */}
      <form onSubmit={ addBook}>
      <input
          type="text"
          name="title"
          placeholder="Título"
          value={newBook.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Autor"
          value={newBook.author}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="foundation_date"
          placeholder="Fecha de publicacion"
          value={newBook.foundation_date}
          onChange={handleInputChange}
          required
        />
        <button type="submit"> Agregar Libro </button>
      </form>


      {/* Formulario para actualizar un libro */}
      {editingBook && (
        <form onSubmit={updateBook}>
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={editingBook.title}
            onChange={(e) =>
              setEditingBook({ ...editingBook, title: e.target.value })
            }
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Autor"
            value={editingBook.author}
            onChange={(e) =>
              setEditingBook({ ...editingBook, author: e.target.value })
            }
            required
          />
          <input
            type="date"
            name="foundation_date"
            placeholder="Fecha de publicación"
            value={editingBook.foundation_date}
            onChange={(e) =>
              setEditingBook({ ...editingBook, foundation_date: e.target.value })
            }
            required
          />
          <button type="submit">Actualizar Libro</button>
        </form>
      )}
      
      {/* Lista de libros con opciones para eliminar o editar */}
      <h1>Lista de Libros</h1>
      <table border={1} className='author-table' >
        <thead>   {/* encabezados */}
          <tr>      {/* fila */}
            <th>Id</th>   {/* encabezado */}
            <th>Autor</th>  {/* encabezado */}
            <th>Título</th>  {/* encabezado */}
            <th>Fecha de Fundación</th>  {/* encabezado */}
            <th> Acciones </th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.author}</td>
              <td>{book.title}</td>
              <td>{book.foundation_date}</td>
              <td> 
                <button onClick={() => deleteBook(book.id)}> Eliminar </button>
                <button onClick={() => startEditing(book)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>      
    </div>
  )
};

export default Version1;