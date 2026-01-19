import React, { useState } from 'react';
import './App.css';
import useBooks from './hooks/useBooks';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

function App() {
  const { books, loading, error, addBook, updateBook, deleteBook } = useBooks();
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddBook = async (bookData) => {
    const result = await addBook(bookData);
    if (result.success) {
      showNotification('Livro cadastrado com sucesso!');
      setShowForm(false);
    } else {
      showNotification(result.error, 'error');
    }
  };

  const handleUpdateBook = async (bookData) => {
    const result = await updateBook(editingBook.id, bookData);
    if (result.success) {
      showNotification('Livro atualizado com sucesso!');
      setEditingBook(null);
      setShowForm(false);
    } else {
      showNotification(result.error, 'error');
    }
  };

  const handleDeleteBook = async (id) => {
    const result = await deleteBook(id);
    if (result.success) {
      showNotification('Livro excluído com sucesso!');
    } else {
      showNotification(result.error, 'error');
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
    setShowForm(false);
  };

  const handleNewBook = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Logo e Título */}
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-3 rounded-xl shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Sistema de Biblioteca
                </h1>
                <p className="text-sm text-gray-600 mt-1">Gerenciamento de Acervo Literário</p>
              </div>
            </div>

            {/* Botão Novo Livro */}
            <button 
              onClick={handleNewBook}
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Novo Livro
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notifications */}
        {notification && (
          <div className={`mb-6 p-4 rounded-lg shadow-lg animate-slide-in flex items-center gap-3 ${
            notification.type === 'success' 
              ? 'bg-green-50 border-l-4 border-green-500 text-green-800'
              : 'bg-red-50 border-l-4 border-red-500 text-red-800'
          }`}>
            {notification.type === 'success' ? (
              <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <p className="font-semibold flex-1">{notification.message}</p>
            <button 
              onClick={() => setNotification(null)}
              className="text-current hover:opacity-70 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow animate-slide-in">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-yellow-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Form Container */}
        {showForm && (
          <div className="mb-8">
            <BookForm 
              onSubmit={editingBook ? handleUpdateBook : handleAddBook}
              editingBook={editingBook}
              onCancel={handleCancelEdit}
            />
          </div>
        )}

        {/* Book List */}
        <BookList 
          books={books}
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
          loading={loading}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm flex items-center justify-center gap-2 flex-wrap">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
                Sistema desenvolvido com
              </span>
              <span className="font-semibold text-primary-600">React + Tailwind CSS</span>
              <span>•</span>
              <span>Local Storage</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                </svg>
                Preparado para Supabase
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
