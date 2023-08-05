-- View All Departments
SELECT department.id AS id, department.name AS departments FROM department;


-- Add Department
INSERT INTO department (name)
VALUES ('Finance');


-- View All Roles
SELECT role.id AS id, role.title AS title, salary, department.name as department
FROM role
JOIN department ON role.department_id = department.id;

-- Add Role
INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 80000, 5);


-- View All Employees
SELECT employee.id AS id, first_name, last_name, role.title AS title, department.name AS department, manager_id
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department on role.department_id = department.id;

-- Add Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Joey', 'Lee', 6, 8);

-- Update Employee Role
UPDATE employee
SET role_id = ?
WHERE id = ?;

-- View All Managers
SELECT employee.id AS id, first_name, last_name, role.title AS title, department.name AS department
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
WHERE employee.manager_id IS NULL;

-- Update Employee Manager
UPDATE employee
SET manager_id = 1
WHERE manager_id IS NULL AND role_id = 4;

-- View Employees by Manager
SELECT employee.id AS id, first_name, last_name, role.title AS title, salary, department.name AS name
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
WHERE employee.manager_id = 1;

-- View Employee by Department
SELECT employee.id AS id, first_name, last_name, role.title AS title, department.name AS department
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
WHERE department.id = 4;

-- Delete Employee
DELETE FROM employee
WHERE id = 7;

-- Delete Role
DELETE FROM role
WHERE id = 5;

-- Delete Department
DELETE FROM department
WHERE id = 5;

-- Utilized Budget
SELECT department.name AS name, SUM(salary) AS budget
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
WHERE department.id = 4;