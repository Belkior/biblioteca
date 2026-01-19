import { useState, useEffect, useCallback } from 'react';
import storageService from '../services/storageService';
// import supabaseService from '../services/supabaseService';

// Configuração: altere para 'supabase' quando estiver pronto
const USE_SUPABASE = false;
const dataService = USE_SUPABASE ? null : storageService; // supabaseService

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregar livros
  const loadBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getAll();
      setBooks(data);
    } catch (err) {
      setError('Erro ao carregar livros: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar livros ao montar o componente
  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  // Adicionar livro
  const addBook = async (bookData) => {
    setLoading(true);
    setError(null);
    try {
      const newBook = await dataService.create(bookData);
      setBooks(prevBooks => [newBook, ...prevBooks]);
      return { success: true, book: newBook };
    } catch (err) {
      const errorMsg = 'Erro ao adicionar livro: ' + err.message;
      setError(errorMsg);
      console.error(err);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Atualizar livro
  const updateBook = async (id, bookData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedBook = await dataService.update(id, bookData);
      setBooks(prevBooks => 
        prevBooks.map(book => book.id === id ? updatedBook : book)
      );
      return { success: true, book: updatedBook };
    } catch (err) {
      const errorMsg = 'Erro ao atualizar livro: ' + err.message;
      setError(errorMsg);
      console.error(err);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Deletar livro
  const deleteBook = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await dataService.delete(id);
      setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
      return { success: true };
    } catch (err) {
      const errorMsg = 'Erro ao deletar livro: ' + err.message;
      setError(errorMsg);
      console.error(err);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Buscar livros
  const searchBooks = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.search(query);
      setBooks(data);
      return { success: true, books: data };
    } catch (err) {
      const errorMsg = 'Erro ao buscar livros: ' + err.message;
      setError(errorMsg);
      console.error(err);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return {
    books,
    loading,
    error,
    addBook,
    updateBook,
    deleteBook,
    searchBooks,
    reloadBooks: loadBooks
  };
};

export default useBooks;
