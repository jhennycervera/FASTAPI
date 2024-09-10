import React from "react";
import { Books, useDeleteBook } from "./hooks";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

interface BookListProps {
  books: Books[];
  onEdit: (book: Books) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit }) => {
  const deleteBookMutation = useDeleteBook();

  return (
    <>
      <h1>Lista de Libros</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Fecha de Fundación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.foundation_date}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteBookMutation.mutate(book.id)}>Eliminar</Button>
                  <Button onClick={() => onEdit(book)}>Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BookList;