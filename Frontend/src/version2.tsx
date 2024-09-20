import React, { useState } from "react";
import { Container } from "@mui/system";
import { Books, useBooks } from "./hooks";
import EditBookForm from "./EditBookForm";
import BookList from "./BookList";
import AddBookForm from "./AddBookForm";
import { Box, CircularProgress } from "@mui/material";

const Version2: React.FC = () => {
  const { data: books, isLoading, error } = useBooks();
  const [editingBook, setEditingBook] = useState<Books | null>(null);
  const [isEditOpen, setEditOpen] = useState(false)

  const handleOpenEdit = (book: Books) => {
    setEditingBook(book);  // Establece el libro que se va a editar
    setEditOpen(true);     // Abre el modal de edición
  };

  const handleCloseEdit = () => {
    setEditingBook(null);  // Limpia el estado del libro en edición
    setEditOpen(false);    // Cierra el modal de edición
  };


  if (isLoading) 
    //return <div>Loading...</div>;
    return(
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container sx={{ padding: 4 }}>
      <AddBookForm />
      {editingBook && (<EditBookForm book={editingBook} isOpen= {isEditOpen} onClose={handleCloseEdit} onClearEdit={handleCloseEdit} />) }
      <BookList books={books || []} onEdit={handleOpenEdit} />
    </Container>
  );
};

export default Version2;