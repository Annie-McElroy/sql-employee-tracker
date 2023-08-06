// Import all necessary modules
const db = require('./db/connection.js');
const inquirer = require('inquirer');
// const mysql = require('mysql2');

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
                // 'View All Managers',
                // 'View Employees by Manager',
                // 'View Employees by Department',
                'Add Employee',
                // 'Delete Employee',
                'Update Employee Role',
                // 'Update Employee Manager',
                'View All Roles',
                'Add Role',
                // 'Delete Role',
                'View All Departments',
                'Add Department',
                // 'Delete Department',
                // 'View Department Budgets',
                'Exit'
            ]
        }
    ])
    .then(answer => {
        switch (answer.options) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            // case 'View All Managers':
            //     viewAllManagers();
            //     break;
            // case 'View Employees by Manager':
            //     viewEmployByManager();
            //     break;
            // case 'View Employees by Department':
            //     viewEmploybyDept();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            // case 'Delete Employee':
            //     deleteEmployee();
            //     break;
            case 'Update Employee Role':
                updateEmployRole();
                break;
            // case 'Update Employee Manager':
            //     updateEmployManager();
            //     break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            // case 'Delete Role':
            //     deleteRole();
            //     break;
            case 'View All Departments':
                viewAllDept();
                break;
            case 'Add Department':
                addNewDept();
                break;
            // case 'Delete Department':
            //     deleteDept();
            //     break;
            // case 'View Department Budgets':
            //     viewBudget();
            //     break;
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
    const deptQuery = `SELECT * FROM department`;
    
    db.query(deptQuery, (err, result) => {
        if (err) throw err;
        const departments = result.map(({ name, id }) => ({ name: name, value: id }));

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
    })
    .then(answer => {
        const query = `INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?)`;
        
        db.query(query, answer.title, answer.salary, answer.dept, (err, result) => {
            if (err) throw err;
            console.log(`Department ${answer.name} successfully added with id ${result.insertId}.`);

            promptQuestions();
        });
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
    // Question for name first
    inquirer.prompt([
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
    ])
    .then(answer => {
        const params = [answer.first_name, answer.last_name]
        
        // Get a list of employees for manager pick
        const employQuery = `SELECT * FROM employee`;
        
        db.query(employQuery, (err, result) => {
            if (err) throw err;

            const managers = result.map(({ first_name, last_name, id }) => ({ name: first_name + " " + last_name, value: id }));

            inquirer.prompt([
                {
                    type: "list",
                    name: "manager",
                    messages: "Who is the employee's manager?",
                    choices: managers
                }
                
            ])
            .then(response => {
                const manager = response.managers;
                params.push(manager);

                // Get list of roles
                const roleQuery = `SELECT * FROM role`;
            
                db.query(roleQuery, (err, result) => {
                    if (err) throw err;

                    const roles = result.map(({ title, id }) => ({ name: title, value: id }));

                    inquirer.prompt([
                        {
                            type: "list",
                            name: "role",
                            message: "What is the employee's role?",
                            choices: roles
                        }
                    ])
                    .then(data => {
                        const role = data.roles;
                        params.push(role);

                        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES (?, ?, ?, ?)`;
                        
                        db.query(query, params, (err, result) => {
                            if (err) throw err;
                            console.log(`Employee has been added!`);
                    
                            promptQuestions();
                        })
                    })
                })
            })
        })
    })
};


// Update Employee Role
const updateEmployRole = () => {
    const employeeQuery = `SELECT * FROM employee`;

    db.query(employeeQuery, (err, result) => {
        if (err) throw err;

        const employees = result.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

        inquirer.prompt([
            {
                type: "list",
                name: "selected",
                message: "Which employee would you like to update?",
                choices: employees
            }
        ])
        .then(answer => {
            const employee = answer.selected;
            const params = [];
            params.push(employee);

            const roleQuery = `SELECT * FROM role`;

            db.query(roleQuery, (err, result) => {
                if (err) throw err;

                const roles = result.map(({ id, title }) => ({ name: title, value: id }))

                inquirer.prompt([
                    {
                        type: "list",
                        name: "role",
                        message: "What is the employee's new role?"
                    }
                ])
                .then(answer => {
                    const role = answer.role;
                    params.push(role);

                    let employee = params[0]
                    params[0] = role
                    params[1] = employee
                    
                    const query = `UPDATE employee
                    SET role_id = ?
                    WHERE id = ?`;

                    db.query(query, params, (err, result) => {
                        if (err) throw err;
                        console.log("Employee has been updated!")

                        promptQuestions();
                    })
                })
            })
        })
    })
};