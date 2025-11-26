# ModernShop - E-commerce Page

Uma página de e-commerce moderna, responsiva e funcional, 100% compatível com GitHub Pages.

![ModernShop Preview](https://img.shields.io/badge/Status-Ready-brightgreen)

## 🚀 Funcionalidades

- ✅ Layout moderno e minimalista
- ✅ 100% responsivo (mobile-first)
- ✅ Carregamento de produtos via JSON
- ✅ Carrinho de compras com modal animado
- ✅ Persistência do carrinho com localStorage
- ✅ Adição e remoção de itens
- ✅ Atualização em tempo real do total
- ✅ Notificações toast
- ✅ Menu mobile hamburger
- ✅ Sem dependências externas (apenas JavaScript puro)

## 📁 Estrutura do Projeto

```
ecommerce/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── products.json       # Banco de dados de produtos
├── assets/             # Pasta para imagens (opcional)
└── README.md           # Este arquivo
```

## 🎨 Design

- **Paleta de Cores**: Tons neutros e profissionais
- **Fonte**: Inter (Google Fonts)
- **Layout**: Flexbox + CSS Grid
- **Animações**: Transições suaves em hover e interações

## 💻 Visualização Local

1. Clone ou baixe o repositório
2. Abra o arquivo `index.html` diretamente no navegador
3. **Importante**: Para que o carregamento dos produtos funcione localmente, você precisa servir os arquivos via um servidor HTTP simples:

### Opção 1: Usando Python
```bash
# Python 3
python -m http.server 8000

# Acesse: http://localhost:8000
```

### Opção 2: Usando Node.js (npx)
```bash
npx serve

# Acesse: http://localhost:3000
```

### Opção 3: Usando a extensão Live Server do VS Code
- Instale a extensão "Live Server"
- Clique com o botão direito em `index.html`
- Selecione "Open with Live Server"

## 🌐 Deploy no GitHub Pages

### Passo 1: Criar Repositório
1. Acesse [github.com](https://github.com) e faça login
2. Clique em "New repository"
3. Dê um nome ao repositório (ex: `minha-loja`)
4. Mantenha como público
5. Clique em "Create repository"

### Passo 2: Enviar Arquivos
```bash
git init
git add .
git commit -m "Primeira versão da loja"
git branch -M main
git remote add origin https://github.com/seu-usuario/minha-loja.git
git push -u origin main
```

### Passo 3: Ativar GitHub Pages
1. Vá para Settings do repositório
2. No menu lateral, clique em "Pages"
3. Em "Source", selecione "Deploy from a branch"
4. Em "Branch", selecione `main` e `/root`
5. Clique em "Save"
6. Aguarde alguns minutos e sua loja estará online em:
   `https://seu-usuario.github.io/minha-loja/`

## 🛠️ Personalização

### Alterar Produtos
Edite o arquivo `products.json` para adicionar, remover ou modificar produtos:

```json
{
    "id": 1,
    "name": "Nome do Produto",
    "description": "Descrição curta do produto",
    "price": 99.90,
    "image": "url-da-imagem.jpg"
}
```

### Alterar Cores
No arquivo `styles.css`, modifique as variáveis CSS no início:

```css
:root {
    --color-primary: #1a1a1a;
    --color-accent: #2563eb;
    /* ... outras cores */
}
```

### Alterar Logo e Textos
Edite o arquivo `index.html` para personalizar:
- Nome da loja
- Textos do hero
- Informações de contato no footer

## 📱 Compatibilidade

- ✅ Chrome (desktop e mobile)
- ✅ Firefox
- ✅ Safari (desktop e iOS)
- ✅ Edge
- ✅ Opera

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar e modificar como quiser.

---

Desenvolvido com ❤️ por ModernShop
