import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Books, useUpdateBook } from "./hooks";
import { Grid } from "@mui/system";

interface EditBookFormProps {
  book: Books;
  onClearEdit: () => void;
  isOpen: boolean;  // Nueva prop para controlar si el modal está abierto
  onClose: () => void;  // Nueva prop para cerrar el modal
}

const EditBookForm: React.FC<EditBookFormProps> = ({ book, onClearEdit, isOpen, onClose }) => {
  const [bookData, setBookData] = useState(
    { title: book.title, author: book.author, foundation_date: book.foundation_date });

  const updateBookMutation = useUpdateBook();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBookMutation.mutate(
      { ...book, ...bookData },
      {
        onSuccess: () => {
          onClearEdit();
          onClose(); 
        } // Cierra el modal después de una actualización exitosa
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={isOpen} onClose= {onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Libro</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" type="submit">
              Actualizar Libro
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditBookForm;