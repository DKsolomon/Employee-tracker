INSERT INTO departments (department_name)
VALUES ('Sales'),
       ('Marketing'),
       ('Production'),
       ('Human Resources');

INSERT INTO roles (job_title, salary, department_id)
VALUES ('Sales Manager', 125000, 1),
       ('Sales Representative', 75000, 1),
       ('Marketing Manager', 115000, 2),
       ('Marketing Intern', 76000, 2),
       ('Production Manager', 130000, 3),
       ('Software Engineer', 95000, 3),
       ('Network Engineer', 86000, 3),
       ('HR Supervisor', 100000, 4),
       ('HR Representative', 80000, 4);
      
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Smith', 1, NULL),
       ('Tom', 'Wilson', 2, 1),
       ('Serena', 'Williams', 2, 1),
       ('Arya', 'Stark', 3, NULL),
       ('Bospharamus', 'Hyrule', 4, 3),
       ('Samus', 'Aran', 4, 3),
       ('Nelson', 'Reed', 5, NULL),
       ('Laura', 'Croft', 6, 5),
       ('Solid', 'Snake', 6, 5),
       ('Cloud', 'Strife', 7, 5),
       ('Nicki', 'Manaj', 7, 5),
       ('Megan', 'Thee Stallion', 8, NULL),
       ('Jimmy', 'Hendrix', 9, 8),
       ('Joe', 'Goldberg', 9, 8);

       