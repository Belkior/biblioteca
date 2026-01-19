# Contribuindo para o Sistema de Biblioteca

Obrigado por considerar contribuir para este projeto! 🎉

## Como Contribuir

### Reportar Bugs

Se você encontrou um bug:

1. Verifique se o bug já foi reportado nas [Issues](https://github.com/Belkior/biblioteca/issues)
2. Se não existir, crie uma nova issue incluindo:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs. atual
   - Screenshots (se aplicável)
   - Versão do navegador e sistema operacional

### Sugerir Melhorias

Para sugerir novas funcionalidades:

1. Abra uma [Issue](https://github.com/Belkior/biblioteca/issues) com a tag `enhancement`
2. Descreva claramente a funcionalidade desejada
3. Explique por que seria útil para o projeto

### Processo de Pull Request

1. **Fork** o repositório
2. **Clone** seu fork localmente
   ```bash
   git clone https://github.com/seu-usuario/biblioteca.git
   cd biblioteca
   ```

3. **Crie uma branch** para sua feature
   ```bash
   git checkout -b feature/MinhaNovaFeature
   ```

4. **Faça suas alterações** seguindo as diretrizes de código
5. **Commit** suas mudanças
   ```bash
   git commit -m "feat: Adiciona MinhaNovaFeature"
   ```

6. **Push** para sua branch
   ```bash
   git push origin feature/MinhaNovaFeature
   ```

7. **Abra um Pull Request** para o branch `main`

## Diretrizes de Código

### JavaScript/React

- Use componentes funcionais com Hooks
- Siga o padrão de nomenclatura:
  - Componentes: `PascalCase` (ex: `BookForm.js`)
  - Funções/variáveis: `camelCase` (ex: `handleSubmit`)
  - Constantes: `UPPER_SNAKE_CASE` (ex: `MAX_BOOKS`)
- Mantenha componentes pequenos e reutilizáveis
- Adicione comentários para lógica complexa

### CSS/Tailwind

- Prefira classes do Tailwind sobre CSS customizado
- Use as classes utilitárias de forma consistente
- Mantenha responsividade (mobile-first)

### Commits

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Mudanças na documentação
- `style:` - Formatação, ponto e vírgula, etc.
- `refactor:` - Refatoração de código
- `test:` - Adição de testes
- `chore:` - Manutenção de código

Exemplos:
```
feat: Adiciona filtro por editora
fix: Corrige bug na edição de livros
docs: Atualiza README com novas instruções
```

## Estrutura do Projeto

```
biblioteca/
├── src/
│   ├── components/     # Componentes React
│   ├── hooks/          # Custom Hooks
│   ├── services/       # Camada de serviços
│   ├── App.js          # Componente principal
│   └── index.js        # Entry point
├── public/             # Arquivos públicos
└── docs/               # Documentação
```

## Testes

Antes de enviar seu PR:

1. Execute os testes:
   ```bash
   npm test
   ```

2. Verifique se o build funciona:
   ```bash
   npm run build
   ```

3. Teste manualmente no navegador

## Checklist do Pull Request

Antes de submeter, verifique se:

- [ ] O código segue as diretrizes do projeto
- [ ] Comentários foram adicionados onde necessário
- [ ] A documentação foi atualizada (se aplicável)
- [ ] Testes foram adicionados/atualizados
- [ ] Todos os testes passam
- [ ] O build está funcionando
- [ ] Commits seguem o padrão Conventional Commits

## Dúvidas?

Se tiver dúvidas sobre como contribuir:

- Abra uma [Issue](https://github.com/Belkior/biblioteca/issues) com a tag `question`
- Entre em contato através das Issues

## Código de Conduta

- Seja respeitoso e profissional
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Mostre empatia com outros membros

---

**Obrigado por contribuir! 🚀**
