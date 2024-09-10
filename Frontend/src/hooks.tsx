
//import './App.css'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // Importa los hooks de React Query

//define la interfaz para los autores
export interface Books {
    title: string;
    foundation_date: string;
    id: number;
    author: string;
  }
  
  // Hook para obtener libros
  export const useBooks = () => {
    return useQuery<Books[], Error>({
      queryKey: ["books"],
      queryFn: async () => {
        const response = await fetch("http://localhost:8081/books");
        if (!response.ok) throw new Error("Error al cargar los libros");
        return response.json();
      },
    });
  };
  
  // Hook para agregar un libro
  export const useAddBook = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (newBook: Omit<Books, "id">) => {
        const response = await fetch("http://localhost:8081/books", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBook),
        });
        if (!response.ok) throw new Error("Error al agregar el libro");
        return response.json();
      },
      onSuccess: (newBook: Books) => {
        queryClient.setQueryData(["books"], (oldBooks: Books[] = []) => {
          return [...oldBooks, newBook].sort((a, b) => a.id - b.id);
        });
      },
    });
  };
  
  
  
  // Hook para eliminar un libro
  export const useDeleteBook = () => {
    const queryClient = useQueryClient();
  
    return useMutation<void, Error, number>({
      mutationFn: async (id: number) => {
        const response = await fetch(`http://localhost:8081/books/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Error al eliminar el libro");
      },
      onSuccess: (_, id) => {
        queryClient.setQueryData(["books"], (oldBooks: Books[] = []) => {
          return oldBooks.filter((book) => book.id !== id);
        });
      },
    });
  };
  // Hook para actualizar un libro
  export const useUpdateBook = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (updatedBook: Books) => {
        const response = await fetch(
          `http://localhost:8081/books/${updatedBook.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedBook),
          },
        );
        if (!response.ok) throw new Error("Error al actualizar el libro");
        return response.json();
      },
      onSuccess: (response: Books) => {
        queryClient.setQueryData(["books"], (allBooks: Books[]) => {
          const otherBooks = allBooks.filter((book) => book.id !== response.id);
          return [...otherBooks, response].sort((a, b) => a.id - b.id);
        });
      },
    });
  };
  