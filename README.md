# 📚 Sistema de Biblioteca

Sistema completo de gerenciamento de biblioteca desenvolvido com React e Tailwind CSS, preparado para migração futura para Supabase.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Supabase Ready](https://img.shields.io/badge/Supabase-Ready-3ECF8E?style=flat&logo=supabase&logoColor=white)

## ✨ Funcionalidades

- ✅ **CRUD Completo** - Criar, listar, editar e excluir livros
- 🔍 **Busca Inteligente** - Pesquise por título, autor ou ISBN
- 🏷️ **Filtros Avançados** - Por categoria, disponibilidade e ordenação
- 📊 **Estatísticas** - Visualize total de livros e disponíveis
- 💾 **Local Storage** - Dados persistentes sem necessidade de backend
- 🎨 **Interface Moderna** - Design responsivo com Tailwind CSS
- 🚀 **Supabase Ready** - Preparado para migração para nuvem

## 🎯 Demonstração

### Principais Telas

- **Lista de Livros** - Grid responsivo com cards modernos
- **Formulário** - Validação completa e feedback visual
- **Busca e Filtros** - Interface intuitiva e rápida
- **Estatísticas** - Badges com informações em tempo real

## 🛠️ Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **Tailwind CSS 3.3** - Framework CSS utility-first
- **Local Storage API** - Persistência de dados local
- **Supabase Client** - Preparado para backend em nuvem
- **Custom Hooks** - Gerenciamento de estado otimizado
- **Service Layer** - Arquitetura escalável e modular

## 📦 Instalação

### Pré-requisitos

- Node.js 14 ou superior
- npm ou yarn

### Passo a Passo

```bash
# Clone o repositório
git clone https://github.com/Belkior/biblioteca.git

# Entre na pasta
cd biblioteca

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

O aplicativo abrirá em [http://localhost:3000](http://localhost:3000)

## 🚀 Como Usar

### Adicionar Livro

1. Clique no botão **"+ Novo Livro"**
2. Preencha os campos obrigatórios (Título e Autor)
3. Adicione informações opcionais (ISBN, Editora, etc.)
4. Clique em **"Cadastrar Livro"**

### Buscar Livros

1. Use a barra de busca no topo
2. Digite título, autor ou ISBN
3. Os resultados aparecem instantaneamente

### Filtrar Livros

1. **Por Categoria** - Selecione no dropdown
2. **Por Disponibilidade** - Todos, Disponíveis ou Emprestados
3. **Ordenação** - Mais recentes, Título ou Autor

### Editar Livro

1. Clique no botão **"Editar"** do livro desejado
2. Modifique os campos necessários
3. Clique em **"Atualizar Livro"**

### Excluir Livro

1. Clique no botão **"Excluir"**
2. Confirme a exclusão
3. O livro será removido permanentemente

## 📖 Documentação

O projeto inclui documentação completa em português:

- **[PLANO_DESENVOLVIMENTO.md](PLANO_DESENVOLVIMENTO.md)** - Plano de desenvolvimento em 7 etapas
- **[README_BIBLIOTECA.md](README_BIBLIOTECA.md)** - Documentação técnica completa
- **[GUIA_RAPIDO.md](GUIA_RAPIDO.md)** - Guia rápido de uso com exemplos
- **[ATUALIZACAO_TAILWIND.md](ATUALIZACAO_TAILWIND.md)** - Documentação da implementação Tailwind
- **[GUIA_SUPABASE.md](GUIA_SUPABASE.md)** - Guia passo a passo para migração Supabase

## 🗄️ Estrutura do Projeto

```
biblioteca-sistema/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── BookForm.js      # Formulário de livros
│   │   ├── BookList.js      # Lista de livros
│   │   └── BookItem.js      # Card individual
│   ├── hooks/
│   │   └── useBooks.js      # Hook customizado
│   ├── services/
│   │   ├── storageService.js   # Serviço Local Storage
│   │   └── supabaseService.js  # Serviço Supabase
│   ├── App.js               # Componente principal
│   ├── index.js             # Entry point
│   └── index.css            # Estilos globais
├── tailwind.config.js       # Configuração Tailwind
├── postcss.config.js        # Configuração PostCSS
└── package.json             # Dependências
```

## 🎨 Customização

### Cores

Edite `tailwind.config.js` para personalizar as cores:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* suas cores */ },
      secondary: { /* suas cores */ }
    }
  }
}
```

### Animações

O projeto inclui animações customizadas:
- `fade-in` - Fade suave
- `slide-in` - Deslize de cima
- `bounce-soft` - Bounce suave

## 🔄 Migração para Supabase

O projeto está **100% preparado** para migração para Supabase:

1. Siga o [GUIA_SUPABASE.md](GUIA_SUPABASE.md)
2. Configure as variáveis de ambiente
3. Ative o `supabaseService`
4. Migre os dados

**Sem necessidade de reescrever código!** A arquitetura de serviços permite trocar o backend com apenas uma flag.

## 📊 Modelo de Dados

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

## 🧪 Testes

```bash
# Executar testes
npm test

# Testes com coverage
npm test -- --coverage
```

## 📦 Build para Produção

```bash
# Criar build otimizado
npm run build

# Os arquivos estarão em /build
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

Desenvolvido com ❤️ usando React e Tailwind CSS

## 🙏 Agradecimentos

- React Team pela incrível biblioteca
- Tailwind Labs pelo framework CSS
- Supabase pela plataforma backend
- Comunidade open source

---

**Nota**: Este projeto foi desenvolvido com foco em boas práticas, código limpo e arquitetura escalável. Perfeito para aprendizado e uso em produção!

## 📞 Suporte

Se encontrar algum problema ou tiver sugestões:

- Abra uma [Issue](https://github.com/Belkior/biblioteca/issues)
- Consulte a [Documentação](README_BIBLIOTECA.md)
- Verifique os [Guias](GUIA_RAPIDO.md)

---

⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!
