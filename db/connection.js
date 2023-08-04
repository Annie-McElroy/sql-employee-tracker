// Import mysql
const mysql = require('mysql2')
require('dotenv').config();

// Connection to SQL database
const db = mysql.createConnection(
    // Database to connect (hidden by dotenv)
    process.env.DB_NAME,
    // MySQL username (hidden by dotenv)
    process.env.DB_USER,
    // MySQL password (hidden by dotenv)
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
    },
    console.log(`Connected to the employee database.`)
);

module.exports = db;
