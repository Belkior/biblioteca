// Serviço preparado para integração futura com Supabase
// Mantém a mesma interface do storageService para facilitar a migração

/* 
CONFIGURAÇÃO FUTURA:
1. Instalar: npm install @supabase/supabase-js
2. Criar arquivo .env com:
   REACT_APP_SUPABASE_URL=your-project-url
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key
3. Criar tabela no Supabase:

CREATE TABLE livros (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  autor TEXT NOT NULL,
  isbn TEXT UNIQUE,
  editora TEXT,
  ano_publicacao INTEGER,
  categoria TEXT,
  disponivel BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

4. Habilitar RLS (Row Level Security) e criar políticas
5. Descomentar o código abaixo
*/

// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// const supabase = createClient(supabaseUrl, supabaseAnonKey);

const supabaseService = {
  // Buscar todos os livros
  getAll: async () => {
    // const { data, error } = await supabase
    //   .from('livros')
    //   .select('*')
    //   .order('created_at', { ascending: false });
    
    // if (error) throw error;
    // return data || [];
    
    console.warn('Supabase não configurado. Use storageService.');
    return [];
  },

  // Buscar livro por ID
  getById: async (id) => {
    // const { data, error } = await supabase
    //   .from('livros')
    //   .select('*')
    //   .eq('id', id)
    //   .single();
    
    // if (error) throw error;
    // return data;
    
    console.warn('Supabase não configurado. Use storageService.');
    return null;
  },

  // Criar novo livro
  create: async (bookData) => {
    // const { data, error } = await supabase
    //   .from('livros')
    //   .insert([{
    //     titulo: bookData.titulo,
    //     autor: bookData.autor,
    //     isbn: bookData.isbn,
    //     editora: bookData.editora,
    //     ano_publicacao: bookData.anoPublicacao,
    //     categoria: bookData.categoria,
    //     disponivel: bookData.disponivel !== undefined ? bookData.disponivel : true
    //   }])
    //   .select()
    //   .single();
    
    // if (error) throw error;
    // return data;
    
    console.warn('Supabase não configurado. Use storageService.');
    return null;
  },

  // Atualizar livro existente
  update: async (id, bookData) => {
    // const { data, error } = await supabase
    //   .from('livros')
    //   .update({
    //     titulo: bookData.titulo,
    //     autor: bookData.autor,
    //     isbn: bookData.isbn,
    //     editora: bookData.editora,
    //     ano_publicacao: bookData.anoPublicacao,
    //     categoria: bookData.categoria,
    //     disponivel: bookData.disponivel,
    //     updated_at: new Date().toISOString()
    //   })
    //   .eq('id', id)
    //   .select()
    //   .single();
    
    // if (error) throw error;
    // return data;
    
    console.warn('Supabase não configurado. Use storageService.');
    return null;
  },

  // Deletar livro
  delete: async (id) => {
    // const { error } = await supabase
    //   .from('livros')
    //   .delete()
    //   .eq('id', id);
    
    // if (error) throw error;
    // return true;
    
    console.warn('Supabase não configurado. Use storageService.');
    return false;
  },

  // Buscar livros por termo
  search: async (query) => {
    // const { data, error } = await supabase
    //   .from('livros')
    //   .select('*')
    //   .or(`titulo.ilike.%${query}%,autor.ilike.%${query}%,isbn.ilike.%${query}%`)
    //   .order('created_at', { ascending: false });
    
    // if (error) throw error;
    // return data || [];
    
    console.warn('Supabase não configurado. Use storageService.');
    return [];
  }
};

export default supabaseService;
