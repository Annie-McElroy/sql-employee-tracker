// Import all necessary modules
const db = require('./db/connection.js');
const inquirer = require('inquirer');
// const mysql = require('mysql2');

// Inquirer prompts with switch case call functions from db/index.js

const promptQuestions = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Exit'
            ]
        }
    ])
    .then(answer => {
        switch (answer.options) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployRole();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewAllDept();
                break;
            case 'Add Department':
                addNewDept();
                break;
            default:
                db.end();
        }
    })
    .catch(err => {
        console.error(err);
    });
};

promptQuestions();

// View All Department
const viewAllDept = () => {
    console.log('Below is all departments...\n');
    const query = `SELECT department.id AS id, department.name AS departments FROM department`;

    db.query(query, (err, result) => {
        if (err) throw err;
        console.table(result);

        promptQuestions();
    })
};

// Add Department
const addNewDept = () => {
    console.log("Please answer the following question.");

    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the new department to add? (Input Answer)"
        }
    ])
    .then(answer => {
        const query = `INSERT INTO department (name)
        VALUES (?)`;
        
        db.query(query, answer.name, (err, result) => {
            if (err) throw err;
            console.log(`Department ${answer.name} successfully added with id ${result.insertId}.`);

            promptQuestions();
        });
    })
};

// View All Roles
const viewAllRoles = () => {
    console.log('Below is all roles...\n');
    const query = `SELECT role.id AS id, role.title AS title, salary, department.name as department
    FROM role
    JOIN department ON role.department_id = department.id`;

    db.query(query, (err, result) => {
        if (err) throw err;
        console.table(result);

        promptQuestions();
    })
};

// Add Role
const addRole = () => {
    // List of all departments to make choice for dept 
    db.query("SELECT * FROM department", (err, deptResult) => {
        if (err) throw err;

        const departments = deptResult.map(({ name, id }) => ({ name: name, value: id }));

        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What is the name of the new role you wish to add?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of this new role?"
            },
            {
                type: "list",
                name: "dept",
                message: "Which department is this new role in?",
                choices: departments
            }
        ])
        .then(answer => {
            const query = `INSERT INTO role (title, salary, department_id)
            VALUES (?, ?, ?)`;
            
            db.query(query, [answer.title, answer.salary, answer.dept], (err, result) => {
                if (err) throw err;
                console.log(`Department ${answer.name} successfully added with id ${result.insertId}.`);
    
                promptQuestions();
            });
        })
    })
};

// View All Employees
const viewAllEmployees = () => {
    console.log('Below is all employees...\n');
    const query = `SELECT employee.id AS id, first_name, last_name, role.title AS title, department.name AS department, manager_id
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department on role.department_id = department.id`;

    db.query(query, (err, result) => {
        if (err) throw err;
        console.table(result);

        promptQuestions();
    })
};

// Add Employee
const addEmployee = () => {

    db.query("SELECT * FROM employee", (err, employRes) => {
        if (err) throw err;

        const managers = employRes.map(({ first_name, last_name, id }) => ({ name: first_name + " " + last_name, value: id }))

        db.query("SELECT * FROM role", (err, roleRes) => {
            if (err) throw err;
    
            const roles = roleRes.map(({ id, title }) => ({ name: title, value: id }))

            let questions = [
                {
                    type: "input",
                    name: "first_name",
                    message: "What is the first name of the new employee?"
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "What is the last name of the new employee?"
                },
                {
                    type: "list",
                    name: "role",
                    message: "What is the employee's role?",
                    choices: roles
                },
                {
                    type: "list",
                    name: "manager",
                    messages: "Who is the employee's manager?",
                    choices: managers
                }
        
            ];
        
            inquirer.prompt(questions)
                .then(answer => {
                    const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`

                    db.query(query, [answer.first_name, answer.last_name, answer.role, answer.manager], (err, res) => {
                        if (err) throw err;
                        console.log(`Employee ${answer.first_name} ${answer.last_name} successfully added!`)

                        promptQuestions();
                    })
                })
        })
    })
};


// Update Employee Role
const updateEmployRole = () => {

    db.query("SELECT * FROM employee", (err, employRes) => {
        if (err) throw err;

        const employees = employRes.map(({ first_name, last_name, id }) => ({ name: first_name + " " + last_name, value: id }))

        db.query("SELECT * FROM role", (err, roleRes) => {
            if (err) throw err;
    
            const roles = roleRes.map(({ title, id }) => ({ name: title, value: id }))

            let questions = [
                {
                    type: "list",
                    name: "employee",
                    message: "Which employee would you like to update?",
                    choices: employees
                },
                {
                    type: "list",
                    name: "role",
                    message: "What is the employee's new role?",
                    choices: roles
                }
            ]
            inquirer.prompt(questions)
                .then(answer => {
                    const query = `UPDATE employee SET role_id = ? WHERE id = ?`;

                    db.query(query, [answer.role, answer.employee], (err, result) => {
                        if (err) throw err;
                        console.log("Employee has been updated!")

                        promptQuestions();
                    })
                })
        })
    })
};