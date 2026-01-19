# Plano de Desenvolvimento - Sistema de Biblioteca

## Visão Geral
Sistema CRUD para gerenciamento de livros de uma biblioteca, inicialmente usando Local Storage e preparado para migração futura para Supabase.

---

## Etapa 1: Estruturação do Projeto ✓

### 1.1 Arquitetura de Pastas
```
src/
├── components/
│   ├── BookForm.js          # Formulário de cadastro/edição
│   ├── BookList.js          # Lista de livros
│   └── BookItem.js          # Item individual da lista
├── services/
│   ├── storageService.js    # Abstração do armazenamento
│   └── supabaseService.js   # Preparado para Supabase (futuro)
├── hooks/
│   └── useBooks.js          # Hook customizado para gerenciar livros
├── styles/
│   └── biblioteca.css       # Estilos do sistema
└── App.js                   # Componente principal
```

### 1.2 Modelo de Dados - Livro
```javascript
{
  id: string (UUID),
  titulo: string,
  autor: string,
  isbn: string,
  editora: string,
  anoPublicacao: number,
  categoria: string,
  disponivel: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

## Etapa 2: Camada de Serviço (Abstração de Dados)

### 2.1 StorageService (Local Storage)
- **Objetivo**: Implementar operações CRUD usando Local Storage
- **Funções**:
  - `getAll()` - Buscar todos os livros
  - `getById(id)` - Buscar livro por ID
  - `create(book)` - Criar novo livro
  - `update(id, book)` - Atualizar livro existente
  - `delete(id)` - Remover livro
  - `search(query)` - Buscar livros por termo

### 2.2 SupabaseService (Preparação Futura)
- **Objetivo**: Interface pronta para conexão com Supabase
- **Estrutura**: Mesmas funções do StorageService
- **Status**: Comentado/desabilitado até configuração do Supabase

---

## Etapa 3: Hooks Customizados

### 3.1 useBooks
- **Objetivo**: Gerenciar estado e operações dos livros
- **Estado**:
  - `books` - Array de livros
  - `loading` - Status de carregamento
  - `error` - Mensagens de erro
- **Métodos**:
  - `addBook(book)` - Adicionar livro
  - `updateBook(id, book)` - Atualizar livro
  - `deleteBook(id)` - Remover livro
  - `searchBooks(query)` - Buscar livros

---

## Etapa 4: Componentes React

### 4.1 BookForm
- Formulário para adicionar/editar livros
- Validação de campos
- Modo de criação e edição
- Feedback visual de operações

### 4.2 BookList
- Listagem de todos os livros
- Opções de filtro e busca
- Paginação (opcional)
- Ordenação por campos

### 4.3 BookItem
- Exibição individual de cada livro
- Botões de ação (editar, deletar)
- Status de disponibilidade
- Modal de confirmação para exclusão

---

## Etapa 5: Interface do Usuário

### 5.1 Layout Principal
- Header com título e busca
- Botão "Novo Livro"
- Grid/Lista de livros
- Modal para formulário

### 5.2 Funcionalidades UX
- Feedback de sucesso/erro em operações
- Confirmação antes de deletar
- Loading states
- Validação de formulário em tempo real
- Responsividade mobile

---

## Etapa 6: Preparação para Supabase

### 6.1 Configuração
```javascript
// Arquivo de configuração
const config = {
  storage: 'local', // 'local' ou 'supabase'
  supabase: {
    url: process.env.REACT_APP_SUPABASE_URL,
    anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY
  }
}
```

### 6.2 Estrutura da Tabela Supabase
```sql
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
```

### 6.3 Política de Migração
- Switch entre Local Storage e Supabase via configuração
- Função de exportação/importação de dados
- Sincronização inicial

---

## Etapa 7: Melhorias Futuras

### 7.1 Funcionalidades Avançadas
- [ ] Sistema de empréstimo de livros
- [ ] Controle de usuários/leitores
- [ ] Histórico de empréstimos
- [ ] Notificações de devolução
- [ ] Relatórios e estatísticas

### 7.2 Otimizações
- [ ] Cache de dados
- [ ] Paginação server-side (Supabase)
- [ ] Busca full-text
- [ ] Upload de capas de livros
- [ ] Export para PDF/Excel

---

## Checklist de Implementação

- [ ] Etapa 1: Criar estrutura de pastas
- [ ] Etapa 2: Implementar storageService
- [ ] Etapa 3: Criar hook useBooks
- [ ] Etapa 4: Desenvolver componentes
- [ ] Etapa 5: Estilizar interface
- [ ] Etapa 6: Configurar switch para Supabase
- [ ] Etapa 7: Testes e ajustes finais

---

## Tecnologias Utilizadas

- **Frontend**: React.js
- **Armazenamento**: Local Storage (atual)
- **Banco de Dados**: Supabase (futuro)
- **Estilos**: CSS3
- **Gerenciamento de Estado**: React Hooks
- **Validação**: Validação customizada

---

## Próximos Passos

1. Revisar e aprovar o plano
2. Implementar Etapa 2 (Serviços)
3. Implementar Etapa 3 (Hooks)
4. Implementar Etapa 4 (Componentes)
5. Testar funcionalidades
6. Documentar uso do sistema
