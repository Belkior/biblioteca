import React, { useState, useEffect } from 'react';

const BookForm = ({ onSubmit, editingBook, onCancel }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    isbn: '',
    editora: '',
    anoPublicacao: '',
    categoria: '',
    disponivel: true
  });

  const [errors, setErrors] = useState({});

  // Preencher formulário quando estiver editando
  useEffect(() => {
    if (editingBook) {
      setFormData({
        titulo: editingBook.titulo || '',
        autor: editingBook.autor || '',
        isbn: editingBook.isbn || '',
        editora: editingBook.editora || '',
        anoPublicacao: editingBook.anoPublicacao || '',
        categoria: editingBook.categoria || '',
        disponivel: editingBook.disponivel !== undefined ? editingBook.disponivel : true
      });
    } else {
      resetForm();
    }
  }, [editingBook]);

  const resetForm = () => {
    setFormData({
      titulo: '',
      autor: '',
      isbn: '',
      editora: '',
      anoPublicacao: '',
      categoria: '',
      disponivel: true
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'Título é obrigatório';
    }

    if (!formData.autor.trim()) {
      newErrors.autor = 'Autor é obrigatório';
    }

    if (formData.anoPublicacao && (formData.anoPublicacao < 1000 || formData.anoPublicacao > new Date().getFullYear())) {
      newErrors.anoPublicacao = 'Ano inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpar erro do campo ao digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const bookData = {
      ...formData,
      anoPublicacao: formData.anoPublicacao ? parseInt(formData.anoPublicacao) : null
    };

    onSubmit(bookData);
    
    if (!editingBook) {
      resetForm();
    }
  };

  const handleCancel = () => {
    resetForm();
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          {editingBook ? (
            <>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar Livro
            </>
          ) : (
            <>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Novo Livro
            </>
          )}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Título */}
          <div className="md:col-span-2">
            <label htmlFor="titulo" className="block text-sm font-semibold text-gray-700 mb-2">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                errors.titulo 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-primary-500 focus:ring-primary-200'
              } focus:outline-none focus:ring-4`}
              placeholder="Digite o título do livro"
            />
            {errors.titulo && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-slide-in">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.titulo}
              </p>
            )}
          </div>

          {/* Autor */}
          <div className="md:col-span-2">
            <label htmlFor="autor" className="block text-sm font-semibold text-gray-700 mb-2">
              Autor <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="autor"
              name="autor"
              value={formData.autor}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                errors.autor 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-primary-500 focus:ring-primary-200'
              } focus:outline-none focus:ring-4`}
              placeholder="Digite o nome do autor"
            />
            {errors.autor && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-slide-in">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.autor}
              </p>
            )}
          </div>

          {/* ISBN */}
          <div>
            <label htmlFor="isbn" className="block text-sm font-semibold text-gray-700 mb-2">
              ISBN
            </label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 focus:outline-none transition-all duration-200"
              placeholder="ISBN do livro"
            />
          </div>

          {/* Ano */}
          <div>
            <label htmlFor="anoPublicacao" className="block text-sm font-semibold text-gray-700 mb-2">
              Ano de Publicação
            </label>
            <input
              type="number"
              id="anoPublicacao"
              name="anoPublicacao"
              value={formData.anoPublicacao}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                errors.anoPublicacao 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-primary-500 focus:ring-primary-200'
              } focus:outline-none focus:ring-4`}
              placeholder="2024"
              min="1000"
              max={new Date().getFullYear()}
            />
            {errors.anoPublicacao && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-slide-in">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.anoPublicacao}
              </p>
            )}
          </div>

          {/* Editora */}
          <div>
            <label htmlFor="editora" className="block text-sm font-semibold text-gray-700 mb-2">
              Editora
            </label>
            <input
              type="text"
              id="editora"
              name="editora"
              value={formData.editora}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 focus:outline-none transition-all duration-200"
              placeholder="Nome da editora"
            />
          </div>

          {/* Categoria */}
          <div>
            <label htmlFor="categoria" className="block text-sm font-semibold text-gray-700 mb-2">
              Categoria
            </label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 focus:outline-none transition-all duration-200 bg-white cursor-pointer"
            >
              <option value="">Selecione uma categoria</option>
              <option value="Ficção">Ficção</option>
              <option value="Não-Ficção">Não-Ficção</option>
              <option value="Romance">Romance</option>
              <option value="Suspense">Suspense</option>
              <option value="Fantasia">Fantasia</option>
              <option value="Científico">Científico</option>
              <option value="Biografia">Biografia</option>
              <option value="História">História</option>
              <option value="Técnico">Técnico</option>
              <option value="Infantil">Infantil</option>
              <option value="Poesia">Poesia</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          {/* Disponibilidade */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-primary-300 transition-all duration-200 cursor-pointer group">
              <input
                type="checkbox"
                name="disponivel"
                checked={formData.disponivel}
                onChange={handleChange}
                className="w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500 focus:ring-2 cursor-pointer"
              />
              <div className="flex-1">
                <span className="text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">
                  Disponível para empréstimo
                </span>
                <p className="text-xs text-gray-500 mt-0.5">Marque se o livro está disponível no acervo</p>
              </div>
            </label>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {editingBook ? 'Atualizar Livro' : 'Cadastrar Livro'}
          </button>
          
          {editingBook && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg shadow hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookForm;
