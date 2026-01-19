// Serviço de armazenamento usando Local Storage
// Preparado para fácil migração para Supabase

const STORAGE_KEY = 'biblioteca_livros';

// Gera UUID simples
const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
};

const storageService = {
  // Buscar todos os livros
  getAll: async () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      return [];
    }
  },

  // Buscar livro por ID
  getById: async (id) => {
    try {
      const books = await storageService.getAll();
      return books.find(book => book.id === id) || null;
    } catch (error) {
      console.error('Erro ao buscar livro:', error);
      return null;
    }
  },

  // Criar novo livro
  create: async (bookData) => {
    try {
      const books = await storageService.getAll();
      const newBook = {
        id: generateId(),
        ...bookData,
        disponivel: bookData.disponivel !== undefined ? bookData.disponivel : true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      books.push(newBook);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
      return newBook;
    } catch (error) {
      console.error('Erro ao criar livro:', error);
      throw error;
    }
  },

  // Atualizar livro existente
  update: async (id, bookData) => {
    try {
      const books = await storageService.getAll();
      const index = books.findIndex(book => book.id === id);
      
      if (index === -1) {
        throw new Error('Livro não encontrado');
      }

      const updatedBook = {
        ...books[index],
        ...bookData,
        id: books[index].id, // Mantém o ID original
        createdAt: books[index].createdAt, // Mantém data de criação
        updatedAt: new Date().toISOString()
      };

      books[index] = updatedBook;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
      return updatedBook;
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
      throw error;
    }
  },

  // Deletar livro
  delete: async (id) => {
    try {
      const books = await storageService.getAll();
      const filteredBooks = books.filter(book => book.id !== id);
      
      if (books.length === filteredBooks.length) {
        throw new Error('Livro não encontrado');
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredBooks));
      return true;
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
      throw error;
    }
  },

  // Buscar livros por termo
  search: async (query) => {
    try {
      const books = await storageService.getAll();
      
      if (!query) return books;

      const lowerQuery = query.toLowerCase();
      return books.filter(book => 
        book.titulo?.toLowerCase().includes(lowerQuery) ||
        book.autor?.toLowerCase().includes(lowerQuery) ||
        book.isbn?.toLowerCase().includes(lowerQuery) ||
        book.editora?.toLowerCase().includes(lowerQuery) ||
        book.categoria?.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      return [];
    }
  },

  // Limpar todos os dados (útil para testes)
  clearAll: async () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
      throw error;
    }
  }
};

export default storageService;
