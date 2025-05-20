# Task Manager Frontend

A React-based frontend for the Task Manager application, built as part of the MERN Stack Intern Screening Assignment.

## 📋 Overview

This Task Manager application allows users to register, log in, and manage their tasks with full CRUD operations. The frontend is built with React and integrates with a RESTful API backend.

## ✨ Features

- User registration and authentication system
- Protected routes with JWT authentication
- Task management dashboard
- Create, read, update, and delete tasks
- Responsive design for all device sizes

## 🛠️ Technologies Used

- **React**: UI library for building the user interface
- **React Router v7**: For handling routes and navigation
- **Context API**: For state management and authentication context
- **TailwindCSS**: For styling components
- **React Hook Form**: Form validation

## 📁 Project Structure

```
src/
├── public/            # Static assets and images
├── components/        # Reusable UI components
├── context/           # React Context for state management
│   └── AuthContext.js # Authentication context
├── pages/             # Route components/pages
│   ├── Auth/          # Login and Register pages
│   ├── Dashboard/     # Task dashboard page
│   └── Tasks/         # Task create/edit pages
├── lib/             # Utility functions and helpers
├── index.js           # Entry point
└── routes.js          # Route definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or later)
- pnpm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone
   cd into the directory
   ```

2. Install dependencies:

   ```bash
   pnpm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   # or
   yarn start
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🌐 Routes

- `/register` - User registration form
- `/login` - User login form
- `/dashboard` - View all tasks (protected route)
- `/add-task` - Form to add a new task (protected route)
- `/edit-task/:id` - Form to edit an existing task (protected route)

## 🔒 Authentication

This application uses JWT (JSON Web Tokens) for authentication. The token is stored in local storage and included in the headers of API requests.

The `AuthContext` provides:

- User authentication state
- Login and logout functionality
- Protection for routes that require authentication

```

```
