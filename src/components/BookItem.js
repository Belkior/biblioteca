import React from 'react';

const BookItem = ({ book, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja excluir "${book.titulo}"?`)) {
      onDelete(book.id);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="group bg-white rounded-xl border-2 border-gray-200 hover:border-primary-400 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden animate-fade-in">
      {/* Status Badge */}
      <div className={`px-6 py-3 border-b-2 ${
        book.disponivel 
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
          : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center gap-2 text-sm font-semibold ${
            book.disponivel ? 'text-green-700' : 'text-red-700'
          }`}>
            {book.disponivel ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Disponível
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Indisponível
              </>
            )}
          </span>
          {book.categoria && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
              {book.categoria}
            </span>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        {/* Título */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {book.titulo}
        </h3>

        {/* Informações */}
        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-700">{book.autor}</span>
            </p>
          </div>
          
          {book.isbn && (
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              <p className="text-sm text-gray-600 font-mono">{book.isbn}</p>
            </div>
          )}
          
          {book.editora && (
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="text-sm text-gray-600">{book.editora}</p>
            </div>
          )}
          
          {book.anoPublicacao && (
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-gray-600">{book.anoPublicacao}</p>
            </div>
          )}
        </div>

        {/* Data de cadastro */}
        {book.createdAt && (
          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Cadastrado em {formatDate(book.createdAt)}
            </p>
          </div>
        )}

        {/* Ações */}
        <div className="flex gap-3 mt-6">
          <button 
            onClick={() => onEdit(book)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            title="Editar livro"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar
          </button>
          <button 
            onClick={handleDelete}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            title="Excluir livro"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
