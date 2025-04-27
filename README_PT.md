
# Task Manager

O Task Manager é uma aplicação web full-stack que permite aos usuários gerenciar suas tarefas de forma eficiente, criando, editando e organizando tarefas em categorias.

Você pode acessar a versão publicada aqui:  
[Task Manager - Demonstração Ao Vivo](https://thiagomota456.github.io/TaskManager/FrontEnd/pages/index.html)

> **Importante:**  
> A aplicação pode apresentar lentidão ou instabilidades ocasionais, principalmente devido às limitações dos serviços gratuitos de hospedagem.

## Funcionalidades

- **Autenticação de Usuário:** Cadastro, login e gerenciamento seguro das configurações do usuário.
- **Gerenciamento de Tarefas:** Criar, atualizar e deletar tarefas.
- **Gerenciamento de Categorias:** Organizar tarefas em categorias personalizadas.
- **Painel de Controle:** Visualizar e gerenciar todas as tarefas em um único local.
- **Frontend Responsivo:** Compatível com diferentes dispositivos e tamanhos de tela.

## Tecnologias Utilizadas

### Backend
- ASP.NET Core
- Entity Framework Core (com Migrations Code-First)
- AutoMapper
- Autenticação com JWT (JSON Web Token)
- SQL Server (para desenvolvimento local)

### Frontend
- HTML5
- CSS3
- JavaScript Puro

## Estrutura do Projeto

```
/BackEnd/ToDoListAPI
    Controllers/
    DTOs/
    Model/
    Services/
    Migrations/
    Program.cs
    appsettings.json

/FrontEnd/
    pages/
    js/
    assets/
```

## Como Funciona

- **Autenticação:** Os usuários precisam criar uma conta e fazer login para acessar as funcionalidades de gerenciamento de tarefas.
- **API Backend:** Gerencia requisições para usuários, tarefas, categorias e autenticação.
- **Interface Frontend:** Se comunica com a API backend utilizando requisições HTTP (fetch API).

## Outros Idiomas
- [English Version](https://thiagomota456.github.io/TaskManager/FrontEnd/pages/index.html)
