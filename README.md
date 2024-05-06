# Nanoly API

## :bookmark: **Sumário**
- [Sobre o Projeto](#link-sobre-o-projeto)
- [Rotas do Projeto](#file_folder-rotas-do-projeto)
- [Tecnologias](#wrench-tecnologias)
   - [Construção da API](#construção-da-api)
   - [Testes](#testes)
   - [IDE, Versionamento e Deploy](#ide-versionamento-e-deploy)
- [Configurações e Instalação](#rocket-configurações-e-instalação)
     - [Requisitos](#requisitos)
- [Licença](#balance_scale-licença)

## :link: **Sobre o Projeto**

O Nanoly é um projeto de um sistema de encurtar url's, onde o usuário pode encurtar uma url e compartilhar com outras pessoas.

## :file_folder: Rotas do Projeto

> - **`GET` /{:restaurant}** _Obtém o cardápio do dia do restaurante pesquisado._
> - **`GET` /{:restaurant}/{:date}** _Obtém o cardápio da data especificada do restaurante pesquisado._

## :wrench: **Tecnologias**

Tecnologias utilizadas no projeto.

### **Construção da API**

- [TypeScript](https://www.typescriptlang.org)
- [Fastify](https://fastify.dev)
- [@fastify/jwt](https://github.com/fastify/fastify-jwt)
- [@fastify/cookie](https://github.com/fastify/fastify-cookie)
- [@fastify/swagger](https://github.com/fastify/fastify-swagger)
- [@fastify/swagger-ui](https://github.com/fastify/fastify-swagger-ui)
- [Node.js](https://nodejs.org/en)
- [Zod](https://zod.dev)
- [BCrypt](https://www.npmjs.com/package/bcrypt)

### **Banco de Dados**

- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

### **Testes**

- [Vitest](https://vitest.dev)
- [Supertest](https://www.npmjs.com/package/supertest)

### **IDE, Versionamento e Deploy**

- [Visual Studio Code](https://code.visualstudio.com)
- [Git](https://git-scm.com)
- [GitHub](https://github.com)

## :rocket: **Configurações e Instalação**

### Requisitos

- [Node](https://nodejs.org/) e [pnpm](https://pnpm.io/pt/).
- [Docker](https://www.docker.com/).
- Teste das chamadas realizados com [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

```sh
# Caso não tenha o pnpm, execute:
npm install -g pnpm
```

Recomendo que veja a [documentação de configuração do Fastify](https://fastify.dev/docs/latest/Reference/).

```sh
# Clonando o projeto
git clone https://github.com/davsilvam/nanoly-api.git

# Instalando as dependências
pnpm install

# Criando o container do banco de dados:
docker compose up

# Criar arquivo .env com base no .env.example e preencher os campos necessários
NODE_ENV=<dev|test|prod>
JWT_SECRET=<secret>
DATABASE_URL=<url>

# Rodar o servidor em desenvolvimento
pnpm start:dev

# Iniciar testes gerais
pnpm test

# Iniciar testes unitários
pnpm test:unit

# Iniciar testes E2E
pnpm test:e2e

# Compilar e minificar para produção
pnpm build

# Rodar o servidor em produção
pnpm start
```

## :balance_scale: **Licença**

Esse projeto está sob a [licença MIT](https://github.com/davsilvam/nanoly-api/blob/main/LICENSE.md).

---

Feito com 🤍 e ☕ por <a href="https://www.linkedin.com/in/davsilvam/">David Silva</a>.

> [Portfólio](https://davidsilvam.vercel.app) &nbsp;&middot;&nbsp;
> GitHub [@davsilvam](https://github.com/davsilvam) &nbsp;&middot;&nbsp;
> Instagram [@davsilvam_](https://www.instagram.com/davsilvam_/)
