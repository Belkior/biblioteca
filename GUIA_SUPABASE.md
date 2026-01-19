# 🚀 Guia Completo - Migração para Supabase

## 📋 Índice
1. [Introdução](#introdução)
2. [Pré-requisitos](#pré-requisitos)
3. [Criar Conta no Supabase](#criar-conta-no-supabase)
4. [Configurar Projeto no Supabase](#configurar-projeto-no-supabase)
5. [Criar Banco de Dados](#criar-banco-de-dados)
6. [Configurar RLS (Segurança)](#configurar-rls-segurança)
7. [Instalar Dependências](#instalar-dependências)
8. [Configurar Variáveis de Ambiente](#configurar-variáveis-de-ambiente)
9. [Ativar Supabase no Código](#ativar-supabase-no-código)
10. [Migrar Dados Existentes](#migrar-dados-existentes)
11. [Testar Conexão](#testar-conexão)
12. [Troubleshooting](#troubleshooting)

---

## 📖 Introdução

Este guia vai te ajudar a migrar seu Sistema de Biblioteca do **Local Storage** para o **Supabase**, um backend completo com PostgreSQL, autenticação, storage e muito mais!

### Por que migrar para Supabase?

✅ **Dados na nuvem** - Acesse de qualquer dispositivo  
✅ **Sincronização automática** - Mudanças em tempo real  
✅ **Backup automático** - Nunca perca seus dados  
✅ **Segurança** - Row Level Security integrado  
✅ **Escalabilidade** - Cresce com seu projeto  
✅ **Gratuito para começar** - Plano free generoso  

---

## 🔧 Pré-requisitos

Antes de começar, certifique-se de ter:

- ✅ Node.js instalado (versão 14 ou superior)
- ✅ Projeto React funcionando
- ✅ Conexão com internet
- ✅ Email válido para criar conta
- ✅ Navegador moderno (Chrome, Firefox, Edge)

---

## 🎯 Criar Conta no Supabase

### Passo 1: Acessar o Site

1. Abra seu navegador
2. Acesse: https://supabase.com
3. Clique em **"Start your project"** ou **"Sign Up"**

### Passo 2: Criar Conta

Você pode criar conta de 3 formas:

**Opção 1 - GitHub (Recomendado):**
1. Clique em "Continue with GitHub"
2. Autorize o Supabase
3. Pronto!

**Opção 2 - Email:**
1. Digite seu email
2. Crie uma senha forte
3. Confirme o email (cheque sua caixa de entrada)

**Opção 3 - Google:**
1. Clique em "Continue with Google"
2. Escolha sua conta Google
3. Autorize o acesso

### Passo 3: Verificar Email

Se usou email, você receberá uma mensagem de confirmação:
1. Abra seu email
2. Procure por "Supabase - Confirm your email"
3. Clique no link de confirmação
4. Volte para o site do Supabase

---

## 🏗️ Configurar Projeto no Supabase

### Passo 1: Criar Novo Projeto

Após fazer login, você verá o Dashboard:

1. Clique em **"New Project"** (botão verde)
2. Escolha uma organização (ou crie uma nova)

### Passo 2: Configurar Projeto

Preencha as informações:

```
Nome do Projeto: biblioteca-sistema
(Escolha um nome único)

Database Password: [Crie uma senha FORTE e GUARDE]
⚠️ IMPORTANTE: Anote essa senha! Você vai precisar dela!

Region: South America (São Paulo)
(Escolha a região mais próxima de você)

Pricing Plan: Free
(Perfeito para começar)
```

3. Clique em **"Create new project"**
4. Aguarde 1-2 minutos (o Supabase está criando seu banco de dados)

### Passo 3: Anotar Credenciais

Quando o projeto estiver pronto:

1. Vá para **Settings** (⚙️ no menu lateral)
2. Clique em **API**
3. Você verá:

```
Project URL: https://seu-projeto.supabase.co
(Anote isso!)

anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
(Anote isso também!)
```

**⚠️ GUARDE ESSAS INFORMAÇÕES COM SEGURANÇA!**

---

## 🗄️ Criar Banco de Dados

### Passo 1: Acessar SQL Editor

1. No menu lateral, clique em **"SQL Editor"**
2. Clique em **"New query"**

### Passo 2: Criar Tabela de Livros

Cole o seguinte SQL no editor:

```sql
-- Criar tabela de livros
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

-- Criar índices para melhor performance
CREATE INDEX idx_livros_titulo ON livros(titulo);
CREATE INDEX idx_livros_autor ON livros(autor);
CREATE INDEX idx_livros_categoria ON livros(categoria);
CREATE INDEX idx_livros_disponivel ON livros(disponivel);

-- Criar trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_livros_updated_at
    BEFORE UPDATE ON livros
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Comentários nas colunas (documentação)
COMMENT ON TABLE livros IS 'Tabela principal de livros da biblioteca';
COMMENT ON COLUMN livros.id IS 'Identificador único do livro';
COMMENT ON COLUMN livros.titulo IS 'Título do livro';
COMMENT ON COLUMN livros.autor IS 'Nome do autor';
COMMENT ON COLUMN livros.isbn IS 'ISBN do livro (único)';
COMMENT ON COLUMN livros.editora IS 'Nome da editora';
COMMENT ON COLUMN livros.ano_publicacao IS 'Ano de publicação';
COMMENT ON COLUMN livros.categoria IS 'Categoria do livro';
COMMENT ON COLUMN livros.disponivel IS 'Se o livro está disponível para empréstimo';
```

3. Clique em **"RUN"** (ou pressione Ctrl+Enter)
4. Você deve ver: **"Success. No rows returned"**

### Passo 3: Verificar Tabela

1. No menu lateral, clique em **"Table Editor"**
2. Você deve ver a tabela **"livros"** listada
3. Clique nela para visualizar (estará vazia por enquanto)

---

## 🔒 Configurar RLS (Segurança)

RLS = Row Level Security (Segurança em Nível de Linha)

### O que é RLS?

É uma camada de segurança que controla quem pode ler/escrever dados.

### Passo 1: Habilitar RLS

1. Vá para **Authentication** > **Policies**
2. Encontre a tabela **"livros"**
3. Clique em **"Enable RLS"**

### Passo 2: Criar Políticas

**IMPORTANTE:** Para desenvolvimento, vamos permitir acesso público. Em produção, você deve adicionar autenticação!

Cole este SQL no SQL Editor:

```sql
-- Política para permitir leitura pública
CREATE POLICY "Permitir leitura pública de livros"
ON livros FOR SELECT
USING (true);

-- Política para permitir inserção pública
CREATE POLICY "Permitir inserção pública de livros"
ON livros FOR INSERT
WITH CHECK (true);

-- Política para permitir atualização pública
CREATE POLICY "Permitir atualização pública de livros"
ON livros FOR UPDATE
USING (true)
WITH CHECK (true);

-- Política para permitir exclusão pública
CREATE POLICY "Permitir exclusão pública de livros"
ON livros FOR DELETE
USING (true);
```

Execute o SQL (Clique em **RUN**)

### 📌 Nota de Segurança

⚠️ **IMPORTANTE**: As políticas acima permitem acesso público para facilitar o desenvolvimento.

**Para produção**, substitua por políticas que:
- Exigem autenticação
- Permitem apenas usuários logados
- Controlam quem pode editar/deletar

Exemplo para produção:
```sql
-- Somente usuários autenticados podem ler
CREATE POLICY "Usuários autenticados podem ler livros"
ON livros FOR SELECT
USING (auth.role() = 'authenticated');

-- Somente usuários autenticados podem inserir
CREATE POLICY "Usuários autenticados podem adicionar livros"
ON livros FOR INSERT
WITH CHECK (auth.role() = 'authenticated');
```

---

## 📦 Instalar Dependências

### Passo 1: Abrir Terminal

1. Abra o terminal no diretório do seu projeto
2. Certifique-se de estar na pasta raiz (`d:\react\teste`)

### Passo 2: Instalar Supabase Client

Execute o comando:

```bash
npm install @supabase/supabase-js
```

Aguarde a instalação concluir. Você verá algo como:

```
added 1 package, and audited 1329 packages in 3s
```

### Passo 3: Verificar Instalação

Confira se foi instalado corretamente:

```bash
npm list @supabase/supabase-js
```

Deve mostrar a versão instalada.

---

## 🔐 Configurar Variáveis de Ambiente

### Passo 1: Criar Arquivo .env

1. Na **raiz do projeto** (pasta `d:\react\teste`), crie um arquivo chamado `.env`
2. **IMPORTANTE**: O arquivo deve se chamar exatamente `.env` (com o ponto na frente)

### Passo 2: Adicionar Credenciais

Abra o arquivo `.env` e adicione:

```env
# Configurações do Supabase
REACT_APP_SUPABASE_URL=https://seu-projeto.supabase.co
REACT_APP_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

**IMPORTANTE**: Substitua pelos valores reais que você anotou anteriormente!

### Exemplo Real:

```env
REACT_APP_SUPABASE_URL=https://xyzabcdefghij.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiY2RlZmdoaWoiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDk5NTIwMCwiZXhwIjoxOTU2NTcxMjAwfQ.8VHnHQq_qkL8m6iBWweT_RqDqVSYILqU_Z_PxRqFdCo
```

### Passo 3: Adicionar .env ao .gitignore

**MUITO IMPORTANTE**: Nunca compartilhe suas credenciais!

1. Abra o arquivo `.gitignore` na raiz do projeto
2. Verifique se já tem a linha `.env`
3. Se não tiver, adicione:

```gitignore
# Variáveis de ambiente
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

---

## ⚙️ Ativar Supabase no Código

### Passo 1: Configurar supabaseService.js

1. Abra o arquivo `src/services/supabaseService.js`
2. **Descomente TODO o código** (remova os `//` e `/* */`)

O arquivo deve ficar assim:

```javascript
// Serviço para integração com Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const supabaseService = {
  // Buscar todos os livros
  getAll: async () => {
    const { data, error } = await supabase
      .from('livros')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Converter nomes de colunas do PostgreSQL para camelCase
    return data.map(book => ({
      id: book.id,
      titulo: book.titulo,
      autor: book.autor,
      isbn: book.isbn,
      editora: book.editora,
      anoPublicacao: book.ano_publicacao,
      categoria: book.categoria,
      disponivel: book.disponivel,
      createdAt: book.created_at,
      updatedAt: book.updated_at
    }));
  },

  // Buscar livro por ID
  getById: async (id) => {
    const { data, error } = await supabase
      .from('livros')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      titulo: data.titulo,
      autor: data.autor,
      isbn: data.isbn,
      editora: data.editora,
      anoPublicacao: data.ano_publicacao,
      categoria: data.categoria,
      disponivel: data.disponivel,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  },

  // Criar novo livro
  create: async (bookData) => {
    const { data, error } = await supabase
      .from('livros')
      .insert([{
        titulo: bookData.titulo,
        autor: bookData.autor,
        isbn: bookData.isbn,
        editora: bookData.editora,
        ano_publicacao: bookData.anoPublicacao,
        categoria: bookData.categoria,
        disponivel: bookData.disponivel !== undefined ? bookData.disponivel : true
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      titulo: data.titulo,
      autor: data.autor,
      isbn: data.isbn,
      editora: data.editora,
      anoPublicacao: data.ano_publicacao,
      categoria: data.categoria,
      disponivel: data.disponivel,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  },

  // Atualizar livro existente
  update: async (id, bookData) => {
    const { data, error } = await supabase
      .from('livros')
      .update({
        titulo: bookData.titulo,
        autor: bookData.autor,
        isbn: bookData.isbn,
        editora: bookData.editora,
        ano_publicacao: bookData.anoPublicacao,
        categoria: bookData.categoria,
        disponivel: bookData.disponivel
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      titulo: data.titulo,
      autor: data.autor,
      isbn: data.isbn,
      editora: data.editora,
      anoPublicacao: data.ano_publicacao,
      categoria: data.categoria,
      disponivel: data.disponivel,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  },

  // Deletar livro
  delete: async (id) => {
    const { error } = await supabase
      .from('livros')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // Buscar livros por termo
  search: async (query) => {
    const { data, error } = await supabase
      .from('livros')
      .select('*')
      .or(`titulo.ilike.%${query}%,autor.ilike.%${query}%,isbn.ilike.%${query}%`)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data.map(book => ({
      id: book.id,
      titulo: book.titulo,
      autor: book.autor,
      isbn: book.isbn,
      editora: book.editora,
      anoPublicacao: book.ano_publicacao,
      categoria: book.categoria,
      disponivel: book.disponivel,
      createdAt: book.created_at,
      updatedAt: book.updated_at
    }));
  }
};

export default supabaseService;
```

### Passo 2: Atualizar useBooks.js

1. Abra o arquivo `src/hooks/useBooks.js`
2. Encontre estas linhas no início:

```javascript
// import supabaseService from '../services/supabaseService';

// Configuração: altere para 'supabase' quando estiver pronto
const USE_SUPABASE = false;
const dataService = USE_SUPABASE ? null : storageService;
```

3. **Substitua** por:

```javascript
import supabaseService from '../services/supabaseService';

// Configuração: altere para 'supabase' quando estiver pronto
const USE_SUPABASE = true;
const dataService = USE_SUPABASE ? supabaseService : storageService;
```

**O que mudou?**
- ✅ Descomentou o import do supabaseService
- ✅ Mudou `USE_SUPABASE` de `false` para `true`
- ✅ Mudou `null` para `supabaseService`

---

## 📊 Migrar Dados Existentes

Se você já tem livros no Local Storage e quer levá-los para o Supabase:

### Passo 1: Exportar Dados do Local Storage

1. Abra o navegador (com o sistema rodando)
2. Pressione **F12** para abrir DevTools
3. Vá na aba **Console**
4. Cole e execute:

```javascript
// Exportar dados do Local Storage
const livros = localStorage.getItem('biblioteca_livros');
console.log(livros);
```

5. Copie o JSON que apareceu (é uma string longa)
6. Cole em um arquivo temporário `backup_livros.json`

### Passo 2: Importar para Supabase

**Opção A - Via Interface (Mais fácil):**

1. Vá no Supabase Dashboard
2. **Table Editor** > **livros**
3. Clique em **Insert** > **Import from CSV/JSON**
4. Cole o JSON
5. Clique em **Import**

**Opção B - Via Código:**

Crie um arquivo temporário `migrar.js` na raiz:

```javascript
// migrar.js - Script temporário
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'SUA_URL_AQUI';
const supabaseKey = 'SUA_KEY_AQUI';
const supabase = createClient(supabaseUrl, supabaseKey);

async function migrar() {
  // Cole seu JSON do localStorage aqui
  const livrosLocal = JSON.parse(`[...]`);
  
  for (const livro of livrosLocal) {
    await supabase.from('livros').insert({
      titulo: livro.titulo,
      autor: livro.autor,
      isbn: livro.isbn,
      editora: livro.editora,
      ano_publicacao: livro.anoPublicacao,
      categoria: livro.categoria,
      disponivel: livro.disponivel
    });
    console.log(`✓ Migrado: ${livro.titulo}`);
  }
  
  console.log('Migração concluída!');
}

migrar();
```

Execute:
```bash
node migrar.js
```

---

## ✅ Testar Conexão

### Teste 1: Verificar Conexão

1. Pare o servidor (Ctrl+C no terminal)
2. Reinicie: `npm start`
3. Abra o navegador em `http://localhost:3000`
4. Abra o DevTools (F12) > Console

Você deve ver no console:
- ✅ Sem erros de conexão
- ✅ Logs normais do React

### Teste 2: Adicionar Livro

1. Clique em **"Novo Livro"**
2. Preencha os campos:
   - **Título**: Teste Supabase
   - **Autor**: Sistema
3. Clique em **"Cadastrar"**

4. Verifique no Supabase:
   - Vá no Dashboard > **Table Editor** > **livros**
   - O livro deve aparecer lá!

### Teste 3: Editar Livro

1. Clique em **"Editar"** no livro de teste
2. Mude o título para "Teste Atualizado"
3. Clique em **"Atualizar"**
4. Verifique no Supabase se atualizou

### Teste 4: Deletar Livro

1. Clique em **"Excluir"**
2. Confirme a exclusão
3. Verifique no Supabase se foi removido

### Teste 5: Buscar Livros

1. Use a barra de busca
2. Digite parte de um título
3. Deve filtrar em tempo real

**✅ Se todos os testes passaram, parabéns! Está tudo funcionando!**

---

## 🔍 Troubleshooting

### Problema 1: Erro "Invalid API key"

**Sintoma**: Erro ao carregar livros

**Solução**:
1. Verifique se copiou a chave correta do Supabase
2. Confirme que está usando a **anon/public key**
3. Certifique-se que o `.env` tem o prefixo `REACT_APP_`
4. Reinicie o servidor (`npm start`)

### Problema 2: Erro "relation livros does not exist"

**Sintoma**: Erro dizendo que a tabela não existe

**Solução**:
1. Vá no Supabase > SQL Editor
2. Execute novamente o SQL de criação da tabela
3. Verifique no Table Editor se a tabela aparece

### Problema 3: Erro "RLS policy violation"

**Sintoma**: Não consegue ler/escrever dados

**Solução**:
1. Vá no Supabase > Authentication > Policies
2. Verifique se RLS está habilitado
3. Verifique se as políticas foram criadas
4. Execute novamente o SQL das políticas

### Problema 4: Dados não aparecem

**Sintoma**: Livros não carregam

**Solução**:
1. Abra DevTools (F12) > Console
2. Procure por erros
3. Verifique se `USE_SUPABASE = true`
4. Verifique se importou `supabaseService`
5. Confirme que o `.env` está correto

### Problema 5: Variáveis de ambiente não funcionam

**Sintoma**: `undefined` nas URLs/keys

**Solução**:
1. O arquivo `.env` DEVE estar na **raiz** do projeto
2. O nome deve ser exatamente `.env`
3. As variáveis DEVEM começar com `REACT_APP_`
4. **REINICIE** o servidor após criar/editar `.env`

### Problema 6: CORS Error

**Sintoma**: Erro de CORS no navegador

**Solução**:
1. Vá no Supabase > Settings > API
2. Verifique a URL do projeto
3. Use a URL completa (com https://)
4. Não precisa configurar CORS no Supabase (já vem pronto)

---

## 🎉 Próximos Passos

Agora que está conectado ao Supabase, você pode:

### 1. Adicionar Autenticação
```javascript
// Login com email
const { user, error } = await supabase.auth.signIn({
  email: 'user@email.com',
  password: 'senha123'
});
```

### 2. Implementar Real-time
```javascript
// Ouvir mudanças em tempo real
supabase
  .from('livros')
  .on('INSERT', payload => {
    console.log('Novo livro!', payload.new);
  })
  .subscribe();
```

### 3. Adicionar Storage (Upload de Imagens)
```javascript
// Upload de capa do livro
const { data, error } = await supabase.storage
  .from('capas')
  .upload('livro-123.jpg', file);
```

### 4. Criar Relacionamentos
- Tabela de autores
- Tabela de categorias
- Tabela de empréstimos
- Tabela de usuários

### 5. Adicionar Funções Avançadas
- Busca full-text
- Estatísticas (livros mais emprestados)
- Relatórios
- Notificações

---

## 📚 Recursos Úteis

### Documentação Oficial
- **Supabase Docs**: https://supabase.com/docs
- **JavaScript Client**: https://supabase.com/docs/reference/javascript
- **SQL Reference**: https://supabase.com/docs/guides/database

### Tutoriais
- **Quick Start**: https://supabase.com/docs/guides/getting-started
- **Auth Guide**: https://supabase.com/docs/guides/auth
- **Database Guide**: https://supabase.com/docs/guides/database

### Comunidade
- **Discord**: https://discord.supabase.com
- **GitHub**: https://github.com/supabase/supabase
- **Twitter**: @supabase

### Vídeos (YouTube)
- "Supabase in 100 Seconds"
- "Full Stack React + Supabase Tutorial"
- "Supabase Crash Course"

---

## 🎯 Checklist Final

Antes de considerar a migração completa, verifique:

- [ ] Conta criada no Supabase
- [ ] Projeto configurado
- [ ] Credenciais anotadas com segurança
- [ ] Tabela `livros` criada
- [ ] Índices criados
- [ ] RLS habilitado
- [ ] Políticas configuradas
- [ ] Dependência `@supabase/supabase-js` instalada
- [ ] Arquivo `.env` criado
- [ ] `.env` no `.gitignore`
- [ ] `supabaseService.js` descomentado
- [ ] `useBooks.js` atualizado
- [ ] `USE_SUPABASE = true`
- [ ] Servidor reiniciado
- [ ] Teste de adicionar funcionou
- [ ] Teste de editar funcionou
- [ ] Teste de deletar funcionou
- [ ] Teste de buscar funcionou
- [ ] Dados migrados (se necessário)

---

## 💡 Dicas Importantes

### Segurança
1. **NUNCA** compartilhe suas credenciais
2. **SEMPRE** use `.env` para chaves
3. **SEMPRE** adicione `.env` ao `.gitignore`
4. Use RLS em produção
5. Implemente autenticação

### Performance
1. Use índices nas colunas mais buscadas
2. Limite resultados com `.limit()`
3. Use paginação para muitos dados
4. Cache resultados quando possível

### Backup
1. Supabase faz backup automático
2. Exporte dados regularmente
3. Teste a restauração

### Desenvolvimento
1. Use o plano Free para desenvolvimento
2. Upgrade quando for para produção
3. Monitore uso no Dashboard

---

## 🆘 Precisa de Ajuda?

Se tiver problemas:

1. **Revise este guia** - Siga passo a passo
2. **Verifique o console** - F12 > Console
3. **Leia os erros** - Eles geralmente dizem o problema
4. **Consulte a documentação** - Supabase tem docs excelentes
5. **Busque na comunidade** - Discord do Supabase
6. **Verifique GitHub Issues** - Pode ser um bug conhecido

---

## 🎊 Parabéns!

Se chegou até aqui e tudo está funcionando, você:

✅ Criou uma conta no Supabase  
✅ Configurou um projeto completo  
✅ Criou um banco de dados PostgreSQL  
✅ Configurou segurança (RLS)  
✅ Integrou o frontend com o backend  
✅ Migrou de Local Storage para Cloud  

**Seu sistema agora é profissional e escalável! 🚀**

---

**Desenvolvido com ❤️ para facilitar sua jornada com Supabase**

Última atualização: Janeiro 2026
