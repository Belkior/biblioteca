# 📚 Sistema de Biblioteca - CRUD de Livros

Sistema completo de gerenciamento de biblioteca com funcionalidades CRUD (Create, Read, Update, Delete) para cadastro de livros. Atualmente utiliza Local Storage e está preparado para migração futura para Supabase.

## ✨ Funcionalidades

- ✅ Cadastrar novos livros
- ✅ Editar informações de livros existentes
- ✅ Excluir livros do acervo
- ✅ Buscar livros por título, autor ou ISBN
- ✅ Filtrar por categoria e disponibilidade
- ✅ Ordenar livros (mais recentes, título, autor, ano)
- ✅ Interface responsiva e moderna
- ✅ Validação de formulários
- ✅ Notificações de sucesso/erro
- ✅ Persistência de dados no Local Storage

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado (versão 14 ou superior)
- npm ou yarn

### Instalação e Execução

1. **Instale as dependências:**
```bash
npm install
```

2. **Inicie o servidor de desenvolvimento:**
```bash
npm start
```

3. **Abra o navegador em:**
```
http://localhost:3000
```

## 📋 Estrutura do Projeto

```
src/
├── components/
│   ├── BookForm.js          # Formulário de cadastro/edição
│   ├── BookList.js          # Lista de livros com filtros
│   └── BookItem.js          # Card individual de livro
├── services/
│   ├── storageService.js    # Serviço de Local Storage (ativo)
│   └── supabaseService.js   # Preparado para Supabase (futuro)
├── hooks/
│   └── useBooks.js          # Hook customizado para gerenciar livros
├── App.js                   # Componente principal
└── App.css                  # Estilos do sistema
```

## 📖 Como Usar

### Adicionar um Livro

1. Clique no botão "➕ Novo Livro"
2. Preencha o formulário com as informações:
   - **Título** (obrigatório)
   - **Autor** (obrigatório)
   - ISBN
   - Editora
   - Ano de Publicação
   - Categoria
   - Disponibilidade
3. Clique em "Cadastrar"

### Editar um Livro

1. Clique no botão "✎ Editar" no card do livro
2. Modifique as informações desejadas
3. Clique em "Atualizar" ou "Cancelar"

### Excluir um Livro

1. Clique no botão "🗑 Excluir" no card do livro
2. Confirme a exclusão no diálogo

### Buscar e Filtrar

- **Busca:** Digite no campo de busca para encontrar livros por título, autor ou ISBN
- **Categoria:** Selecione uma categoria específica
- **Status:** Filtre por livros disponíveis ou indisponíveis
- **Ordenação:** Ordene por data, título, autor ou ano

## 🔄 Migração para Supabase (Futuro)

O sistema está preparado para migração para Supabase. Siga estes passos quando estiver pronto:

### 1. Instalar Supabase Client

```bash
npm install @supabase/supabase-js
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_SUPABASE_URL=your-project-url
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Criar Tabela no Supabase

Execute o seguinte SQL no Supabase:

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

### 4. Ativar Supabase no Código

No arquivo `src/services/supabaseService.js`:
- Descomente todo o código
- Importe e configure o cliente do Supabase

No arquivo `src/hooks/useBooks.js`:
- Altere `USE_SUPABASE` para `true`
- Importe o `supabaseService`

```javascript
import supabaseService from '../services/supabaseService';
const USE_SUPABASE = true;
const dataService = USE_SUPABASE ? supabaseService : storageService;
```

## 🎨 Categorias Disponíveis

- Ficção
- Não-Ficção
- Romance
- Suspense
- Fantasia
- Científico
- Biografia
- História
- Técnico
- Infantil
- Poesia
- Outro

## 💾 Armazenamento de Dados

### Local Storage (Atual)

Os dados são armazenados localmente no navegador. Importante:
- Dados persistem apenas no navegador atual
- Limpar cache/dados do navegador apaga os livros
- Não há sincronização entre dispositivos

### Supabase (Futuro)

Quando migrar para Supabase:
- Dados armazenados na nuvem
- Acesso de qualquer dispositivo
- Sincronização em tempo real
- Backup automático
- Segurança RLS (Row Level Security)

## 🛠️ Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para interfaces
- **React Hooks** - useState, useEffect, useCallback
- **Local Storage API** - Armazenamento local de dados
- **CSS3** - Estilização e responsividade
- **Supabase** (preparado) - Banco de dados PostgreSQL

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- 💻 Desktop
- 📱 Tablets
- 📱 Smartphones

## 🐛 Tratamento de Erros

- Validação de formulários em tempo real
- Mensagens de erro descritivas
- Notificações de sucesso/erro
- Confirmação antes de excluir

## 📝 Modelo de Dados

```javascript
{
  id: "uuid",
  titulo: "string",
  autor: "string",
  isbn: "string",
  editora: "string",
  anoPublicacao: number,
  categoria: "string",
  disponivel: boolean,
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

## 🔜 Melhorias Futuras

- [ ] Sistema de empréstimo de livros
- [ ] Controle de usuários/leitores
- [ ] Histórico de empréstimos
- [ ] Notificações de devolução
- [ ] Relatórios e estatísticas
- [ ] Upload de capas de livros
- [ ] Export para PDF/Excel
- [ ] Busca avançada
- [ ] Tags personalizadas
- [ ] Sistema de avaliações

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

## 👨‍💻 Desenvolvimento

Desenvolvido com React utilizando boas práticas de:
- Componentização
- Separação de responsabilidades
- Hooks customizados
- Serviços abstratos
- Design responsivo
- Clean Code

---

**Desenvolvido com ❤️ usando React**
