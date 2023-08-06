// ALL my functions for query

// Import connection to database
const inquirer = require('inquirer');
const db = require('./connection.js');
const mysql = require('mysql2');


// View All Department
const viewAllDept = () => {
    console.log('Below is all departments...\n');
    const query = `SELECT department.id AS id, department.name AS departments FROM department`;

    db.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);

        promptQuestions();
    })
};


// Add Department
const addNewDept = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the new department to add?"
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
}

// Delete Department
const deleteDept = () => {
    const deptQuery = `SELECT * FROM department`;
    
    db.query(deptQuery, (err, result) => {
        if (err) throw err;
        const departments = result.map(({ name, id }) => ({ name: name, value: id }));

        inquirer.prompt([
                {
                    type: "list",
                    name: "option",
                    message: "Which department do you wish to delete?",
                    choices: departments
                }
            ])
    })


    .then(answer => {
        const query = `DELETE FROM department
        WHERE id = ?`;
        
        db.query(query, answer.option, (err, result) => {
            if (err) throw err;
            console.log(`${result.affectedRow} successfully deleted!`);

            promptQuestions();
        })
    })
}

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

// Delete Role
const deleteRole = () => {
    const roleQuery = `SELECT * FROM role`;
    
    db.query(roleQuery, (err, result) => {
        if (err) throw err;
        const roles = result.map(({ title, id }) => ({ name: title, value: id }));

        inquirer.prompt([
                {
                    type: "list",
                    name: "option",
                    message: "Which role do you wish to delete?",
                    choices: roles
                }
            ])
    })


    .then(answer => {
        const query = `DELETE FROM role
        WHERE id = ?`;
        
        db.query(query, answer.option, (err, result) => {
            if (err) throw err;
            console.log(`${result.affectedRow} successfully deleted!`);

            promptQuestions();
        })
    })
}



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

// View All Managers
const viewAllManagers = () => {
    console.log('Below is all managers...\n');
    const query = `SELECT employee.id AS id, first_name, last_name, role.title AS title, department.name AS department
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    WHERE employee.manager_id IS NULL`;

    db.query(query, (err, result) => {
        if (err) throw err;
        console.table(result);

        promptQuestions();
    })
};

// View Employees by Manager
const viewEmployByManager = () => {
    const employQuery = `SELECT * FROM employee`;
    
    db.query(employQuery, (err, result) => {
        if (err) throw err;
        const employees = result.map(({ first_name, last_name, id }) => ({ name: first_name + " " + last_name, value: id }));

        inquirer.prompt([
            {
                type: "list",
                name: "option",
                message: "Which department do you wish to delete?",
                choices: employees
            }
        ])
    })

    
    .then(answer => {
        console.log('Below is all employees under selected manager...\n');
        const query = `SELECT employee.id AS id, first_name, last_name, role.title AS title, salary, department.name AS name
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        WHERE employee.manager_id = ?`;
        
        db.query(query, answer.option, (err, result) => {
            if (err) throw err;
            console.log(result);

            promptQuestions();
        })
    })

};

// View Employees by Department
const viewEmploybyDept = () => {
    const deptQuery = `SELECT * FROM department`;
    
    db.query(deptQuery, (err, result) => {
        if (err) throw err;
        const departments = result.map(({ name, id }) => ({ name: name, value: id }));

        inquirer.prompt([
            {
                type: "list",
                name: "option",
                message: "Which department do you wish to search by?",
                choices: departments
            }
        ])
    })

    
    .then(answer => {
        console.log('Below is all employees under selected department...\n');
        const query = `SELECT employee.id AS id, first_name, last_name, role.title AS title, department.name AS department
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        WHERE department.id = ?`;
        
        db.query(query, answer.option, (err, result) => {
            if (err) throw err;
            console.log(result);

            promptQuestions();
        })
    })
}

// Add Employee
const addEmployee = () => {
    // Get a list of employees for manager pick
    const employQuery = `SELECT * FROM employee`;
    
    db.query(employQuery, (err, result) => {
        if (err) throw err;
        const managers = result.map(({ first_name, last_name, id }) => ({ name: first_name + " " + last_name, value: id }));

    // TODO: Get list of roles

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
        {
            // ROLE Question
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
}

// Delete Employee


// Update Employee Role


// Update Employee Manager

