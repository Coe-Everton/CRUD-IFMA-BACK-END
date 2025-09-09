Aqui está a versão toda transformada em **Markdown organizado e formatado** do seu texto:

# CRUD IFMA - API Backend

Uma API backend robusta e escalável desenvolvida em Node.js para gerenciar as operações fundamentais de um sistema acadêmico.  
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

---

## 📌 Visão Geral

Este projeto consiste em uma API backend projetada para executar as operações essenciais de **CRUD (Create, Read, Update, Delete)**, base para a manipulação de dados em aplicações modernas.

O sistema foi concebido no contexto do **IFMA (Instituto Federal do Maranhão)**, servindo como uma base para um sistema de gerenciamento acadêmico.

A funcionalidade principal gira em torno da **gestão de registros de alunos**, permitindo:

- Registrar novos estudantes
- Consultar dados de alunos existentes
- Atualizar informações cadastrais
- Remover registros

---

## 🏗️ Arquitetura do Projeto

```
/
├── src/
│ ├── config/
│ │ │ └── db.ts
│ │ ├── utils/
│ │ │ └── checkingCursoID.ts
│ │ │ └── checkPersonInDB.ts
│ │ │ └── generatorCodigoSuap.ts
│ │ │ └── generatorID.ts
│ │ │ └── getFormattedDate.ts
│ ├── .env
│ ├── README.md
│ ├── .gitignore
│ ├── package.json
│ ├── server.ts
│ └── tscondfig.json
└──/

```

### Descrição dos Componentes

- **`/src/config/`** → Configurações de conexão do banco de dados.
- **`/src/server.ts`** → Toda parte de criação de rotas e de regra de negócio
- **`/src/util/checkingCursoID`** → Verifica se há tal curso existente no banco de dados.
- **`/src/util/checkPersonInDB`** → Verificar se tal pessoa já não é cadastrada no banco de dados.
- **`/src/util/generatorCodigoSuap`** → Gerador de codigo de acesso ao sistema, utiliza de algumas informações do user como Nome do user.
- **`/src/util/generatorID`** → Um gerador de ID para os users
- **`/src/util/getFormattedDate`** → Formatador de data para ANO/MÊS/DIA para ficar mais fácil a leitura

---

## ⚙️ Tecnologias Utilizadas

| Tecnologia       | Versão Sugerida | Propósito                                              |
| ---------------- | --------------- | ------------------------------------------------------ |
| Node.js          | 20.x+           | Ambiente de execução JavaScript                        |
| Express.js       | 5.x             | Framework web minimalista para Node.js                 |
| Nodemon          | 3.x             | Reinicia o servidor automaticamente no desenvolvimento |
| Dotenv           | 16.x            | Gerencia variáveis de ambiente                         |
| Railway          |                 | Deploy do banco de dados em MySql                      |
| Beekeeper Studio | 5.2.5           | ORM para visualização e alterações do banco de dados   |
| MySql2           | 3.x             | Confingurações para o MySql                            |
| typescript       | 5.x             | Liguagem de desenvolvimento                            |

---

## 🚀 Guia de Instalação e Execução

### ✅ Pré-requisitos

- Node.js (20.x ou superior)
- NPM ou Yarn
- Git

---

### 1. Clonando o Repositório

```sh
git clone https://github.com/Coe-Everton/CRUD-IFMA-BACK-END.git
cd CRUD-IFMA-BACK-END
```

### 2. Instalando Dependências

```sh
npm install
# ou
yarn install
```

### 3. Configuração do Ambiente

Copie o arquivo `.env.example` e configure seu `.env`:

```sh
cp .env.example .env
```

**Exemplo de variáveis:**

```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=
DB_PORT=
```

### 4. Executando a Aplicação

- **Modo dev**:

```sh
npm run dev
```

- **Produção**:

```sh
npm start
```

---

Com certeza\! Abaixo está uma documentação detalhada e bem estruturada para as rotas da sua API, criada com base no código fornecido e formatada em Markdown.

---

# 📖 Documentação da API

## Visão Geral

A API gerencia três recursos principais:

- **Cursos**: Cursos oferecidos pela instituição.
- **Docentes**: Professores cadastrados no sistema.
- **Discentes**: Alunos matriculados nos cursos.

## Endpoints Gerais

### 1\. Verificar Status e Tabelas do Banco

Rota para um diagnóstico rápido, que verifica a conexão com o banco de dados e lista as tabelas existentes.

- **Endpoint**: `GET /`
- **Método**: `GET`
- **Descrição**: Retorna uma lista de todas as tabelas presentes no banco de dados.
- **Resposta de Sucesso (200)**:
  ```json
  [
    {
      "Tables_in_database": "cursos"
    },
    {
      "Tables_in_database": "docentes"
    },
    {
      "Tables_in_database": "dicentes"
    }
  ]
  ```

---

## 📚 Endpoints de Cursos

### 1\. Listar todos os Cursos

- **Endpoint**: `GET /cursos`
- **Método**: `GET`
- **Descrição**: Retorna uma lista com todos os cursos cadastrados.
- **Resposta de Sucesso (200)**:
  ```json
  [
    {
      "id": "uuid-gerado-aqui",
      "nome_do_curso": "Análise e Desenvolvimento de Sistemas",
      "data_de_criacao": "2025-09-09 10:00:00"
    }
  ]
  ```

### 2\. Criar um novo Curso

- **Endpoint**: `POST /cursos`
- **Método**: `POST`
- **Descrição**: Cadastra um novo curso no sistema. O `id` e a `data_de_criacao` são gerados automaticamente.
- **Corpo da Requisição (Body)**:
  ```json
  {
    "nameCurso": "Engenharia de Software"
  }
  ```
- **Resposta de Sucesso (200)**:
  ```json
  {
    "message": "Novo curso criado com suceso!"
  }
  ```
- **Resposta de Erro (500)**:
  ```json
  {
    "error": "Erro interno ao criar curso, error: [detalhes do erro]"
  }
  ```

---

## 🧑‍🏫 Endpoints de Docentes

### 1\. Listar todos os Docentes

- **Endpoint**: `GET /docentes`
- **Método**: `GET`
- **Descrição**: Retorna uma lista com todos os docentes (professores) cadastrados.
- **Resposta de Sucesso (200)**:
  ```json
  [
    {
      "id": "uuid-gerado-aqui",
      "nome": "Fulano de Tal",
      "cpf": "123.456.789-00",
      "nivel_de_graduacao": "Doutorado",
      "codigo_do_suap": "20251Tal",
      "senha_do_suap": "senha_criptografada_aqui",
      "data_de_criacao": "2025-09-09 10:05:00"
    }
  ]
  ```

### 2\. Criar um novo Docente

- **Endpoint**: `POST /docentes`
- **Método**: `POST`
- **Descrição**: Cadastra um novo docente. O `id`, `data_de_criacao` e `codigo_do_suap` são gerados automaticamente.
- **Corpo da Requisição (Body)**:
  ```json
  {
    "nameDocente": "Ciclano de Oliveira",
    "CPF": "111.222.333-44",
    "nivelDeGraduacao": "Mestrado",
    "senhaDoSuap": "umaSenhaBemForte123"
  }
  ```
- **Resposta de Sucesso (200)**:
  ```json
  {
    "message": "Novo docente criado com suceso!",
    "data": { ... }
  }
  ```
- **Resposta de Erro (500)**:
  ```json
  {
    "error": "Erro interno ao criar docente, error: [detalhes do erro]"
  }
  ```

---

## 🎓 Endpoints de Discentes (Alunos)

### 1\. Listar todos os Discentes

- **Endpoint**: `GET /dicentes`
- **Método**: `GET`
- **Descrição**: Retorna uma lista com todos os discentes (alunos) cadastrados.
- **Resposta de Sucesso (200)**:
  ```json
  [
    {
      "id": "uuid-gerado-aqui",
      "nome": "Beltrana da Silva",
      "cpf": "555.666.777-88",
      "curso_id": "uuid-do-curso-aqui",
      "codigo_do_suap": "20251Silva",
      "senha_do_suap": "outraSenhaSuperSegura",
      "data_de_criacao": "2025-09-09 10:10:00"
    }
  ]
  ```

### 2\. Criar um novo Discente

- **Endpoint**: `POST /dicentes`
- **Método**: `POST`
- **Descrição**: Cadastra um novo discente. O sistema valida se o curso informado existe e se o CPF já não está cadastrado.
- **Corpo da Requisição (Body)**:
  ```json
  {
    "nameDicente": "Maria Souza",
    "CPF": "999.888.777-66",
    "senhaDoSuap": "senhaDaMaria#2025",
    "curso": "Análise e Desenvolvimento de Sistemas"
  }
  ```
- **Resposta de Sucesso (200)**:
  ```json
  {
    "message": "Novo dicente criado com suceso!",
    "data": { ... }
  }
  ```
- **Respostas de Erro (500)**:
  - Se o curso não for encontrado:
    ```json
    {
      "error": "Curso não existe no banco de dados"
    }
    ```
  - Se o CPF já estiver cadastrado:
    ```json
    {
      "error": "CPF já cadastrado"
    }
    ```

---

## 🗑️ Endpoint de Deleção Genérico

### 1\. Deletar um Registro por ID

- **Endpoint**: `DELETE /:fromPage/:id`
- **Método**: `DELETE`
- **Descrição**: Rota genérica para deletar um registro de uma tabela específica (`cursos`, `docentes` ou `dicentes`) usando seu ID.
- **Parâmetros da URL**:
  - `fromPage` (string, obrigatório): O nome da tabela. Ex: `cursos`, `docentes`, `dicentes`.
  - `id` (string, obrigatório): O ID único do registro a ser deletado.
- **Exemplos de Uso**:
  - `DELETE /docentes/uuid-do-docente-aqui`
  - `DELETE /cursos/uuid-do-curso-aqui`
- **Resposta de Sucesso (200)**:
  ```json
  {
    "message": "docentes - id:uuid-do-docente-aqui exlcuido com sucesso!",
    "data": { ... }
  }
  ```
- **Resposta de Erro (500)**:
  ```json
  {
    "error": "Erro interno ao deletar algo, error: [detalhes do erro]"
  }
  ```

## 🗂️ Modelos de Dados

### 📌 Tabela: alunos

---

### 📌 Tabela: `cursos`

| Campo           | Tipo         | Restrições   | Descrição                    |
| --------------- | ------------ | ------------ | ---------------------------- |
| id              | VARCHAR(36)  | PK, NOT NULL | Identificador único do curso |
| nome_do_curso   | VARCHAR(255) | NOT NULL     | Nome do curso                |
| data_de_criacao | DATETIME     | NOT NULL     | Data de criação do registro  |

---

### 📌 Tabela: `dicentes`

| Campo           | Tipo         | Restrições       | Descrição                                     |
| --------------- | ------------ | ---------------- | --------------------------------------------- |
| id              | VARCHAR(36)  | PK, NOT NULL     | Identificador único do discente               |
| nome            | VARCHAR(255) | NOT NULL         | Nome completo do discente                     |
| cpf             | VARCHAR(11)  | UNIQUE, NOT NULL | CPF do discente                               |
| curso_id        | VARCHAR(36)  | FK → cursos.id   | Curso ao qual o discente está vinculado       |
| codigo_do_suap  | VARCHAR(100) | NOT NULL         | Código de autenticação no SUAP                |
| senha_do_suap   | VARCHAR(255) | NOT NULL         | Senha de acesso ao SUAP (armazenada com hash) |
| data_de_criacao | DATETIME     | NOT NULL         | Data de criação do registro                   |

---

### 📌 Tabela: `docentes`

| Campo              | Tipo         | Restrições       | Descrição                                                     |
| ------------------ | ------------ | ---------------- | ------------------------------------------------------------- |
| id                 | VARCHAR(36)  | PK, NOT NULL     | Identificador único do docente                                |
| nome               | VARCHAR(255) | NOT NULL         | Nome completo do docente                                      |
| cpf                | VARCHAR(11)  | UNIQUE, NOT NULL | CPF do docente                                                |
| nivel_de_graduacao | VARCHAR(100) | NOT NULL         | Nível de graduação (ex.: Especialização, Mestrado, Doutorado) |
| codigo_do_suap     | VARCHAR(100) | NOT NULL         | Código de autenticação no SUAP                                |
| senha_do_suap      | VARCHAR(255) | NOT NULL         | Senha de acesso ao SUAP (armazenada com hash)                 |
| data_de_criacao    | DATETIME     | NOT NULL         | Data de criação do registro                                   |

---

## 👨‍💻 Autor

Desenvolvido por **Everton Caldeira Oliveira**

- GitHub: [Coe-Everton](https://github.com/Coe-Everton)
- LinkedIn: [linkedin.com/in/everton](https://www.linkedin.com/in/everton-caldeira-oliveira-ba26812ab/)

---
