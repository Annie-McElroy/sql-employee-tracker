// Import mysql
const mysql = require('mysql2')
require('dotenv').config();

// Connection to SQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
    // MySQL username (hidden by dotenv)
    user: process.env.DB_USER,
    // MySQL password (hidden by dotenv)
    password: process.env.DB_PASSWORD,
    // Database to connect (hidden by dotenv)
    database: process.env.DB_NAME,
    },
    console.log(`Connected to the movies_db database.`)
);

module.exports = db;
