// Import mysql
const mysql = require('mysql2')
require('dotenv').config();

// Connection to SQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username
        user: process.env.DB_USER,
        // MySQL password
        password: process.env.DB_PASSWORD,
        // Database to connect
        database: process.env.DB_NAME,
    },
);
    
db.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    
    console.log(`Connected to the employee_db database.`)
})

module.exports = db;
