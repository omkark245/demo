# Employee Management System

A full-stack web application for managing employees, built with React, Node.js, and MySQL.

## Features

- **Admin Authentication**: Secure login for administrators using JWT (JSON Web Tokens).
- **Employee Management**: Admins can add new employees and view the list of existing employees.
- **Secure Backend**: API endpoints protected by JWT middleware.
- **Responsive UI**: Professional interface built with React.

## Tech Stack

- **Frontend**: React.js (Vite), Axios, React Router.
- **Backend**: Node.js, Express.js.
- **Database**: MySQL (XAMPP).
- **Security**: JWT for authentication, Bcrypt for password hashing.

## Project Structure

```
├── backend/            # Express server and database logic
│   ├── db.sql          # Database schema
│   ├── server.js       # Main server file
│   └── seed.js         # Initial admin data seeding script
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # UI Components
│   │   └── App.jsx     # Main routing
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [XAMPP](https://www.apachefriends.org/index.html) (for MySQL)

### Database Setup (XAMPP)

1. Start **Apache** and **MySQL** in the XAMPP Control Panel.
2. Go to `http://localhost/phpmyadmin`.
3. Create a new database named `employee_management`.
4. Import the `backend/db.sql` file or copy its content into the SQL tab.

### Backend Setup

1. Open a terminal in the `backend/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and set your database credentials.
4. (Optional) Seed the admin user:
   ```bash
   node seed.js
   ```
   *Default Admin: username: `admin`, password: `admin123`*
5. Start the server:
   ```bash
   node server.js
   ```

### Frontend Setup

1. Open a terminal in the `frontend/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the app at `http://localhost:5173`.

## Usage

1. Log in using the admin credentials.
2. Use the dashboard to view the employee list.
3. Fill out the "Add Employee" form to register new staff.
4. Logout safely using the logout button.
