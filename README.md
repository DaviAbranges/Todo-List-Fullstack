
# Task Management System

Este é um sistema simples de gerenciamento de tarefas, desenvolvido com **Next.js**, **Tailwind CSS** no frontend e um backend construído com **Node.js**, **Express**, **Sequelize** e **MySQL**.

## Funcionalidades

- Autenticação de usuário com armazenamento de token.
- Criação, listagem e gerenciamento de tarefas.
- Alternância entre temas claro e escuro.
- Logout de usuário.
- Páginas de registro e login separadas.
- Integração com API para recuperação e gerenciamento das tarefas.
- Design minimalista e responsivo.

## Tecnologias Utilizadas

### Frontend

- **Next.js**: Framework React para renderização no lado do servidor.
- **Tailwind CSS**: Framework CSS utilitário para estilização.
- **Context API**: Para gerenciamento de estado global da aplicação.

### Backend

- **Node.js**: Plataforma de backend.
- **Express**: Framework web para criar rotas e APIs.
- **Sequelize**: ORM para integração com o banco de dados MySQL.
- **MySQL**: Banco de dados relacional utilizado para persistência de dados.
- **Docker**: Para virtualização e gerenciamento do ambiente de desenvolvimento.

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### Backend

2. Configure as variáveis de ambiente no arquivo `.env`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
PORT=3001
```

3. Instale as dependências do backend:

```bash
cd backend
npm install
```

### Frontend

6. Instale as dependências do frontend:

```bash
cd frontend
npm install
```

3. Suba o ambiente Docker (para MySQL):

```bash
docker-compose up -d
```


8. Acesse a aplicação no navegador:

```
http://localhost:3000
```

## Como Usar

### Registro e Login

- Registre-se na aplicação e faça login.
- O token de autenticação será armazenado localmente para gerenciar o acesso.

### Gerenciamento de Tarefas

- Após o login, você poderá visualizar suas tarefas e criar novas.
- As tarefas serão listadas em uma tabela com opções de ações.
- Um formulário para criação de novas tarefas será renderizado na mesma página.

### Alternância de Tema

- Use o botão no canto superior direito para alternar entre os temas claro e escuro.

### Logout

- Clique no botão "Sair" para fazer logout e limpar o token da sessão.

## Estrutura de Pastas

```
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   └── app.ts
│   └── ...
├── frontend
│   ├── components
│   ├── context
│   ├── pages
│   ├── styles
│   └── ...
└── README.md
```

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir um issue ou enviar um pull request.
