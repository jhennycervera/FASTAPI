
import { Grid } from "@mui/system";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useAddBook } from "./hooks";

const AddBookForm: React.FC = () => {
  const [bookData, setBookData] = useState({ title: "", author: "", foundation_date: "" });

  const addBookMutation = useAddBook();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBookMutation.mutate(bookData, {
      onSuccess: () => setBookData({ title: "", author: "", foundation_date: "" }),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={ {padding:2}} >
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
          <Button variant="contained" color="primary" type="submit">
            Agregar Libro
          </Button>
      </Grid>
    </form>
  );
};

export default AddBookForm;