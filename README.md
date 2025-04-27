# Task Manager

Task Manager is a full-stack web application that allows users to manage their tasks efficiently by creating, editing, and organizing tasks into categories.

You can try the live demo here:  
[Task Manager - Live Demo](https://thiagomota456.github.io/TaskManager/FrontEnd/pages/index.html)

> **Important:**  
> The application might experience slow performance or occasional issues, mainly due to the limitations of free hosting services.

## Features

- **User Authentication:** Sign up, login, and manage user settings securely.
- **Task Management:** Create, update, and delete tasks.
- **Category Management:** Organize tasks into custom categories.
- **Dashboard:** View and manage all tasks in a single place.
- **Responsive Frontend:** Works across different devices and screen sizes.

## Technologies Used

### Backend
- ASP.NET Core
- Entity Framework Core (with Code-First Migrations)
- AutoMapper
- JWT (JSON Web Token) Authentication
- SQL Server (for local development)

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

## Project Structure

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

## How It Works

- **Authentication:** Users must create an account and login to access task management features.
- **Backend API:** Handles requests for user management, task creation, category assignment, and authentication.
- **Frontend Interface:** Communicates with the backend API using HTTP requests (fetch API).

## Other Languages
- [Descrição em Português](./README_PT.md)
