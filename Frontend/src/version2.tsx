import React, { useState } from "react";
import { Container } from "@mui/system";
import { Books, useBooks } from "./hooks";
import EditBookForm from "./EditBookForm";
import BookList from "./BookList";
import AddBookForm from "./AddBookForm";

const Version2: React.FC = () => {
  const { data: books, isLoading, error } = useBooks();
  const [editingBook, setEditingBook] = useState<Books | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container sx={{ padding: 4 }}>
      <AddBookForm />
      {editingBook && (
        <EditBookForm book={editingBook} onClearEdit={() => setEditingBook(null)} />
      ) }
      <BookList books={books || []} onEdit={setEditingBook} />
    </Container>
  );
};

export default Version2;