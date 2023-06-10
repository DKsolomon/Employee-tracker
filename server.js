const db = require ('./db/connection')
const inquirer = require('inquirer')
require('console.table')

function init() {
  inquirer
    .prompt({
      
        type: 'list',
        message: 'What would you like to do?',
        name: 'option',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add A department',
          'Add A role',
          'Add an employee',
          'Update an employee role',
          'Quit'
        ]  
      })
        .then(answer => {
          let option = answer.option
          switch(option) {
              case 'View all departments':
                  viewDepartments();
                  break;
                  
              case 'View all roles':
                  viewRoles();
                  break;
      
              case 'View all employees':
                  viewEmployees();
                  break;
      
              case 'Add A department':
                  addDepartment();
                  break;
      
              case 'Add A role':
                   addRole();
                   break;
      
              case 'Add an employee':
                  addEmployee();
                  break;
      
              case 'Update an employee role':
                  updateEmployeeRole();
                  break;
      
              case 'Quit':
                  quit() ;
                  break;
           }
      });
  };
  
  
function viewDepartments() {
  let query = 'SELECT * FROM departments';
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}

function viewRoles() {
  let query = `SELECT roles.id, roles.job_title, departments.department_name AS departments,
   roles.salary FROM roles JOIN departments ON roles.department_id = departments.id`;
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    init()
  });
}

function viewEmployees() {
  let query =  `SELECT employees.id, employees.first_name, employees.last_name, roles.job_title, departments.department_name AS department, 
  FORMAT(roles.salary, 0) AS salary,
  CONCAT_WS(" ", m.first_name, m.last_name) AS manager FROM employees 
  LEFT JOIN roles ON employees.role_id = roles.id 
  LEFT JOIN departments ON roles.department_id = departments.id 
  LEFT JOIN employees m ON employees.manager_id = m.id `;
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res)
    init()
  });
}

function addDepartment() {
  inquirer
    .prompt({
          name: 'name',
          type: 'input',
          message: 'Enter the name of the department:'
      })
      .then(answer => {
        let query = 'INSERT INTO departments SET ?';
          db.query(query, { department_name: answer.name }, function (err, res) {
                  if (err) throw err;
                  console.log(`\n${res.affectedRows}\n`);
                  init();
              }
          );
      }); 
}
  

async function addRole () {
   db.query('SELECT * FROM departments', function (departments) {
    inquirer
      .prompt([
        {
          name: 'title',
          type: 'input',
          message: 'Enter the title of the role:'
        },
        {
          name: 'salary',
          type: 'input',
          message: 'Enter the salary for the role:'
        },
        {
          name: 'department',
          type: 'list',
          message: 'Select the department for the role:',
          choices: departments.map(department => ({
            name: department.department_name,
            value: department.id
          }))
        }
      ])
      .then(function (answers) {
        db.query(
          'INSERT INTO roles SET ?',
          {
            job_title: answers.title,
            salary: answers.salary,
            department_id: answers.department
          },
          function (err) {
            if (err) throw err;
            init();
          }
        );
      });
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
          name: 'first_name',
          type: 'input',
          message: 'Enter the First Name:'
      },
      {
          name: 'last_name',
          type: 'input',
          message: 'Enter the Last Name:'
      },
      {
          name: 'role_id',
          type: 'input',
          message: 'Enter the role_ID for the Employee:'
      },
      {
          name: 'manager_id',
          type: 'input',
          message: 'Enter the Manager ID for the employee (NULL if no manager):'
      }
    ])
    .then(function(answer){
      db.query(
          'INSERT INTO employees SET ?',
          {
              first_name: answer.first_name,
              last_name: answer.last_name,
              role_id: answer.role_id,
              manager_id: answer.manager_id
          },
          function (err) {
              if (err) throw (err);
              console.log(`Added employee: ${answer.first_name} ${answer.last_name}`);
              init();
          }
      );
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: 'employee_id',
        type: 'input',
        message: 'Enter the id of the employee:'
      },
      {
        name: 'role_id',
        type: 'input',
        message: 'Enter the new role id for the employee:'
      }
    ])
    .then(function (answers) {
      db.query(
        'UPDATE employees SET role_id = ? WHERE id = ?',
        [answers.role_id, answers.employee_id],
        function (err) {
          if (err) throw err;
          console.log(`Updated employee role`);
          init();
        }
      );
    });
}


function quit() {
  console.log('goodbye')
  process.exit();
}

init();