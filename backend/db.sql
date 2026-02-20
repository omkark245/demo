CREATE DATABASE IF NOT EXISTS employee_management;
USE employee_management;

CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    position VARCHAR(100),
    salary DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a default admin (password: admin123)
-- Note: In a real app, you should hash this password. I will provide a way to seed it in Node.
INSERT INTO admin (username, password) VALUES ('admin', '$2b$10$EPf9WwvW6.m6WpU9Z2gW6O1X.W.X.W.X.W.X.W.X.W.X.W.X.W.X.'); -- This is just a placeholder hash
