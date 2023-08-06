// Import db/index.js and db/connection.js
// const { xx } = require('./db/index.js');
// const mysql = require('mysql2');
const db = require('./db/connection.js');
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect function


// Inquirer prompts with switch case call functions from db/index.js

const promptQuestions = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Managers',
                'View Employees by Manager',
                'View Employees by Department',
                'Add Employee',
                'Delete Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'View All Roles',
                'Add Role',
                'Delete Role',
                'View All Departments',
                'Add Department',
                'Delete Department',
                'View Department Budgets',
                'None'
            ]
        }
    ])
    .then(answer => {
        switch (answer.options) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'View All Managers':
                viewAllManagers();
                break;
            case 'View Employees by Manager':
                viewEmployByManager();
                break;
            case 'View Employees by Department':
                viewEmploybyDept();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Delete Employee':
                deleteEmployee();
                break;
            case 'Update Employee Role':
                updateEmployRole();
                break;
            case 'Update Employee Manager':
                updateEmployManager();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Delete Role':
                deleteRole();
                break;
            case 'View All Departments':
                viewAllDept();
                break;
            case 'Add Department':
                addNewDept();
                break;
            case 'Delete Department':
                deleteDept();
                break;
            case 'View Department Budgets':
                viewBudget();
                break;
            default:
                db.end();
        }
    })
};

promptQuestions();