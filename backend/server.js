const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'employee_management'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

const verifyUser = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ Error: "Token is missing" });
    } else {
        jwt.verify(token, process.env.JWT_SECRET || "jwt_secret_key", (err, decoded) => {
            if (err) {
                return res.status(401).json({ Error: "Token is invalid" });
            } else {
                req.role = decoded.role;
                next();
            }
        });
    }
}

// Admin Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM admin WHERE username = ?";
    db.query(sql, [username], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, response) => {
                if (err) return res.status(500).json({ error: "Bcrypt error" });
                if (response) {
                    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET || "jwt_secret_key", { expiresIn: "1d" });
                    return res.json({ login: true, token: token });
                } else {
                    return res.status(401).json({ login: false, message: "Wrong password" });
                }
            });
        } else {
            return res.status(401).json({ login: false, message: "Admin not found" });
        }
    });
});

// Add Employee Route
app.post('/add_employee', verifyUser, (req, res) => {
    const { name, email, position, salary } = req.body;
    const sql = "INSERT INTO employees (name, email, position, salary) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, position, salary], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to add employee" });
        }
        return res.json({ Status: "Success" });
    });
});

// Get all employees
app.get('/employees', verifyUser, (req, res) => {
    const sql = "SELECT * FROM employees";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        return res.json(result);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
