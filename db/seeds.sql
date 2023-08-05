-- Employee names to add: Christy Lara, Annie McElroy, Valerie Rojas, Lekendrick McKeller, Micaella Villanueva, Paul Zuker, Ricardo Orellana, Collin Johnston, Jayvon Stevenson, Desera Ross

INSERT INTO department (name)
VALUES
    ('Human Resources'),
    ('Marketing'),
    ('Legal'),
    ('Engineering'),
    ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES 
    ('Software Engineer', 85000, 4),
    ('Human Resources Specialist', 65000, 1),
    ('Salesperson', 75000, 5),
    ('Lawyer', 200000, 3),
    ('Account Manager', 70000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Paul', 'Zuker', 2, NULL),
    ('Annie', 'McElroy', 1, 1),
    ('Valerie', 'Rojas', 4, NULL),
    ('Lekendrick', 'McKeller', 1, 3),
    ('Micaella', 'Villaneauva', 4, 3),
    ('Jayvon', 'Stevenson', 3, NULL),
    ('Ricardo', 'Orellana', 3, 6),
    ('Desera', 'Ross', 5, NULL),
    ('Collin', 'Johnston', 5, 8);


