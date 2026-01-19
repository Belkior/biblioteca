# 🚀 Guia Rápido - Sistema de Biblioteca

## ⚡ Início Rápido

### Para Executar o Sistema AGORA:

1. **Abra o terminal no diretório do projeto** e execute:
   ```bash
   npm start
   ```

2. **Aguarde** o navegador abrir automaticamente em `http://localhost:3000`

3. **Comece a usar!** Clique em "➕ Novo Livro" para adicionar seu primeiro livro

---

## 📚 Exemplos de Livros para Testar

Copie e cole estes dados para testar rapidamente:

### Livro 1
- **Título:** 1984
- **Autor:** George Orwell
- **ISBN:** 978-0451524935
- **Editora:** Companhia das Letras
- **Ano:** 1949
- **Categoria:** Ficção

### Livro 2
- **Título:** Sapiens - Uma Breve História da Humanidade
- **Autor:** Yuval Noah Harari
- **ISBN:** 978-8525432612
- **Editora:** L&PM
- **Ano:** 2015
- **Categoria:** Não-Ficção

### Livro 3
- **Título:** Clean Code
- **Autor:** Robert C. Martin
- **ISBN:** 978-0132350884
- **Editora:** Prentice Hall
- **Ano:** 2008
- **Categoria:** Técnico

---

## 🎯 Funcionalidades Principais

### 1️⃣ Adicionar Livro
```
Botão "➕ Novo Livro" → Preencher formulário → "Cadastrar"
```

### 2️⃣ Buscar Livro
```
Digite no campo de busca → Resultados aparecem automaticamente
```

### 3️⃣ Filtrar por Categoria
```
Selecione categoria no dropdown → Lista é filtrada
```

### 4️⃣ Editar Livro
```
Clique em "✎ Editar" no card → Modifique → "Atualizar"
```

### 5️⃣ Excluir Livro
```
Clique em "🗑 Excluir" → Confirme → Livro removido
```

---

## 🔍 Recursos de Busca e Filtros

### Busca Inteligente
A busca funciona nos seguintes campos:
- Título do livro
- Nome do autor
- ISBN
- Editora
- Categoria

### Filtros Disponíveis
1. **Por Categoria:** Filtre por tipo de livro
2. **Por Status:** Disponível ou Indisponível
3. **Por Ordenação:** 
   - Mais recentes primeiro
   - Alfabética por título (A-Z)
   - Alfabética por autor (A-Z)
   - Por ano de publicação (mais recente)

### Combinar Filtros
Você pode usar busca + categoria + status simultaneamente!

---

## 💡 Dicas de Uso

### ✅ Boas Práticas

1. **Sempre preencha Título e Autor** - são obrigatórios
2. **Use ISBN quando disponível** - facilita identificação única
3. **Categorize corretamente** - ajuda na organização
4. **Marque disponibilidade** - controle de empréstimos

### ⚠️ Importante Saber

- **Dados no navegador:** Os livros são salvos no Local Storage do navegador
- **Não perca dados:** Não limpe o cache do navegador sem backup
- **Por navegador:** Dados não sincronizam entre navegadores diferentes
- **Exportar dados:** Use `localStorage.getItem('biblioteca_livros')` no console para backup

### 🔧 Backup Manual (Console do Navegador)

```javascript
// Fazer backup
const backup = localStorage.getItem('biblioteca_livros');
console.log(backup);
// Copie e salve em um arquivo .txt

// Restaurar backup
localStorage.setItem('biblioteca_livros', 'seu_backup_aqui');
// Recarregue a página
```

---

## 🎨 Interface

### Layout Responsivo
- **Desktop:** Grid com 3 colunas de livros
- **Tablet:** Grid com 2 colunas
- **Mobile:** Lista com 1 coluna

### Cores dos Status
- 🟢 **Verde:** Livro disponível
- 🔴 **Vermelho:** Livro indisponível

### Ações Rápidas
- **Hover nos cards:** Animação de elevação
- **Botões coloridos:** Verde (editar) e Vermelho (excluir)
- **Notificações:** Aparecem no topo por 3 segundos

---

## 🔄 Fluxo de Trabalho Típico

### Cenário 1: Nova Biblioteca
```
1. Adicione vários livros iniciais
2. Configure categorias
3. Marque disponibilidade
4. Use busca para testar
```

### Cenário 2: Gerenciamento Diário
```
1. Busque o livro
2. Edite disponibilidade (emprestado/devolvido)
3. Atualize informações se necessário
```

### Cenário 3: Organização
```
1. Use filtro de categoria
2. Revise livros de cada categoria
3. Atualize informações desatualizadas
```

---

## 🚨 Solução de Problemas

### Livros não aparecem após recarregar?
- Verifique se está no mesmo navegador
- Verifique se o cache não foi limpo
- Verifique o console (F12) por erros

### Formulário não salva?
- Preencha campos obrigatórios (Título e Autor)
- Verifique o ano (deve ser entre 1000 e ano atual)
- Veja notificações de erro no topo

### Busca não funciona?
- Digite pelo menos 1 caractere
- Verifique se há livros cadastrados
- Tente limpar todos os filtros

---

## 📊 Estatísticas Úteis

Para ver estatísticas no console do navegador:

```javascript
// Total de livros
const livros = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
console.log('Total de livros:', livros.length);

// Livros disponíveis
const disponiveis = livros.filter(l => l.disponivel);
console.log('Livros disponíveis:', disponiveis.length);

// Por categoria
const categorias = {};
livros.forEach(l => {
  categorias[l.categoria] = (categorias[l.categoria] || 0) + 1;
});
console.table(categorias);
```

---

## 🎓 Próximos Passos

### Aprendendo React
Este projeto demonstra:
- ✅ Componentes funcionais
- ✅ React Hooks (useState, useEffect, useCallback)
- ✅ Props e comunicação entre componentes
- ✅ Hooks customizados
- ✅ Gerenciamento de estado
- ✅ Formulários controlados
- ✅ Conditional rendering
- ✅ Listas e keys

### Evoluindo o Projeto
1. Migre para Supabase (ver PLANO_DESENVOLVIMENTO.md)
2. Adicione autenticação
3. Implemente sistema de empréstimos
4. Crie dashboards de estatísticas
5. Adicione upload de imagens de capas

---

## 📞 Comandos Úteis

```bash
# Iniciar desenvolvimento
npm start

# Criar build de produção
npm run build

# Executar testes
npm test

# Instalar dependências
npm install
```

---

## 🎉 Divirta-se!

O sistema está pronto para uso. Comece adicionando livros e explore todas as funcionalidades!

**Dúvidas?** Consulte:
- [README_BIBLIOTECA.md](README_BIBLIOTECA.md) - Documentação completa
- [PLANO_DESENVOLVIMENTO.md](PLANO_DESENVOLVIMENTO.md) - Plano de desenvolvimento detalhado
