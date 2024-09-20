
import { Grid } from "@mui/system";
import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useAddBook } from "./hooks";

const AddBookForm: React.FC = () => {
  const [open, setOpen] = useState(false) /// Estado para controlar el diálogo

  const [bookData, setBookData] = useState({ title: "", author: "", foundation_date: "" });

  const addBookMutation = useAddBook();

  //funcion para abrir y cerrar el modal
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBookMutation.mutate(bookData, {
      onSuccess: () => {
        setBookData({ title: "", author: "", foundation_date: "" });
        handleClose();  //cierra el modal despues de registrar
      }
    });
  };

  //manejo de los cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* Botón para abrir el diálogo */}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Crear Nuevo Libro
      </Button>

      {/* Diálogo (modal) que contiene el formulario */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Registrar Nuevo Libro</DialogTitle>

        <DialogContent>

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

                <DialogActions>
                  <Button onClick= {handleClose} variant="contained" color="secondary" >
                    Cancelar
                  </Button>
                  
                  <Button type= "submit" variant="contained" color="primary" >
                    Guardar
                  </Button>

                </DialogActions>
            </Grid>
          </form>

        </DialogContent>
      </Dialog>
    </div>

  );
};

export default AddBookForm;