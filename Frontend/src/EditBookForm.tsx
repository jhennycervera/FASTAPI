import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Books, useUpdateBook } from "./hooks";
import { Grid } from "@mui/system";

interface EditBookFormProps {
  book: Books;
  onClearEdit: () => void;
}

const EditBookForm: React.FC<EditBookFormProps> = ({ book, onClearEdit }) => {
  const [bookData, setBookData] = useState({ title: book.title, author: book.author, foundation_date: book.foundation_date });

  const updateBookMutation = useUpdateBook();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBookMutation.mutate(
      { ...book, ...bookData },
      {
        onSuccess: () => onClearEdit(),
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
          <TextField
            label="Título"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
          <TextField
            label="Autor"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
          />
          <TextField
            label="Fecha de Publicación"
            type="date"
            name="foundation_date"
            value={bookData.foundation_date}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant="contained" color="secondary" type="submit">
            Actualizar Libro
          </Button>
      </Grid>
    </form>
  );
};

export default EditBookForm;