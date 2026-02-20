const bcrypt = require('bcrypt');
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'employee_management'
});

const username = 'admin';
const password = 'admin123';

bcrypt.hash(password, 10, (err, hash) => {
    if (err) console.log(err);
    const sql = "INSERT INTO admin (username, password) VALUES (?, ?) ON DUPLICATE KEY UPDATE password = ?";
    db.query(sql, [username, hash, hash], (err, result) => {
        if (err) {
            console.error('Error seeding admin:', err);
        } else {
            console.log('Admin seeded successfully');
        }
        db.end();
    });
});
