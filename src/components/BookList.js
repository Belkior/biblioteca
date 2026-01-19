import React, { useState } from 'react';
import BookItem from './BookItem';

const BookList = ({ books, onEdit, onDelete, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Filtrar livros
  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.isbn && book.isbn.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = !filterCategory || book.categoria === filterCategory;
    
    const matchesStatus = 
      filterStatus === 'all' || 
      (filterStatus === 'disponivel' && book.disponivel) ||
      (filterStatus === 'indisponivel' && !book.disponivel);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Ordenar livros
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'titulo':
        return a.titulo.localeCompare(b.titulo);
      case 'autor':
        return a.autor.localeCompare(b.autor);
      case 'ano':
        return (b.anoPublicacao || 0) - (a.anoPublicacao || 0);
      case 'recent':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Categorias únicas dos livros
  const categories = [...new Set(books.map(book => book.categoria).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-primary-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-lg text-gray-600 font-medium">Carregando livros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com contador */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Acervo da Biblioteca
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {books.length} {books.length === 1 ? 'livro cadastrado' : 'livros cadastrados'}
              {filteredBooks.length !== books.length && (
                <span className="text-primary-600 font-medium"> • {filteredBooks.length} {filteredBooks.length === 1 ? 'resultado' : 'resultados'}</span>
              )}
            </p>
          </div>
          
          {/* Stats rápidos */}
          <div className="flex gap-4">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
              <p className="text-xs text-gray-500 font-medium">Disponíveis</p>
              <p className="text-xl font-bold text-green-600">{books.filter(b => b.disponivel).length}</p>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
              <p className="text-xs text-gray-500 font-medium">Emprestados</p>
              <p className="text-xl font-bold text-orange-600">{books.filter(b => !b.disponivel).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        {/* Busca */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar por título, autor ou ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-200 focus:outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Categoria</label>
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-200 focus:outline-none transition-all duration-200 bg-white cursor-pointer text-sm"
            >
              <option value="">Todas as categorias</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-200 focus:outline-none transition-all duration-200 bg-white cursor-pointer text-sm"
            >
              <option value="all">Todos os status</option>
              <option value="disponivel">✓ Disponíveis</option>
              <option value="indisponivel">✗ Indisponíveis</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Ordenar por</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-200 focus:outline-none transition-all duration-200 bg-white cursor-pointer text-sm"
            >
              <option value="recent">📅 Mais recentes</option>
              <option value="titulo">🔤 Título (A-Z)</option>
              <option value="autor">👤 Autor (A-Z)</option>
              <option value="ano">📆 Ano (mais recente)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resultados */}
      {sortedBooks.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
          <div className="max-w-md mx-auto">
            {books.length === 0 ? (
              <>
                <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum livro cadastrado</h3>
                <p className="text-gray-500 mb-6">Comece adicionando o primeiro livro ao acervo da biblioteca!</p>
                <div className="inline-flex items-center gap-2 text-sm text-primary-600 font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Clique em "Novo Livro" acima
                </div>
              </>
            ) : (
              <>
                <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum resultado encontrado</h3>
                <p className="text-gray-500 mb-4">Tente ajustar os filtros ou termos de busca</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterCategory('');
                    setFilterStatus('all');
                  }}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium underline"
                >
                  Limpar todos os filtros
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBooks.map(book => (
            <BookItem 
              key={book.id} 
              book={book} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
